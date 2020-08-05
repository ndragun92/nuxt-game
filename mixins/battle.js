export default {
  data: () => ({
    battleStart: false, // Triggers if battle started
    battleLog: [], // Stores battle log
    characterTurn: false, // Triggers if character or monster has current turn
    lastDealtDamageByMonster: 0, // Last damage that monster did to character
    lastDealtDamageByCharacter: 0, // Last damage that character did to monster
    lastDealtDamageCriticalHit: false, // Triggers if last hit by character or monster was critical hit
    saveTempSpeed: null, // Save speed value for next turn
    autoAttack: false // State of character attack auto/manual
  }),
  computed: {
    returnBattleLog () {
      // Reverse battle log to show newest logs at top of list
      return [...this.battleLog].reverse()
    }
  },
  methods: {
    startBattle (characterSpeed = this.returnCharacter.speed, monsterSpeed = this.returnMonster.speed) {
      // Check if battle started. If not then set battleStart to true
      if (!this.battleStart) {
        this.battleStart = true
      }
      // Reset character turn and set it to false unless we trigger that character has a turn
      this.characterTurn = false
      // If character HP is equal or lower then 0 return GAME OVER
      if (this.returnCharacterHP <= 0) {
        return alert('Game over')
        // If monster HP is equal or lower then 0 return VICTORY
      } else if (this.returnMonsterHP <= 0) {
        return alert('Victory!')
        // If character speed or monster speed is equal or lower then 0 run start battle from beginning and reset speed to initial speed
      } else if (characterSpeed <= 0 && monsterSpeed <= 0) {
        return this.startBattle()
      } else {
        // Get minimum speed [Check if character or monster has lower speed and set as minSpeed]
        const minSpeed = this.returnCharacter.speed < this.returnMonster.speed ? this.returnCharacter.speed : this.returnMonster.speed
        // If character speed is greater then monster speed character is first to attack
        if (characterSpeed > monsterSpeed) {
          // Before attack reduce character speed by minimum speed
          characterSpeed -= minSpeed
          // If auto-attack is enabled automatically attack monster
          if (this.autoAttack) {
            // Deal damage to monster
            this.dealDamageToMonster(this.randomCharacterDamage())
            // Start next turn after 1 second
            setTimeout(() => {
              this.startBattle(characterSpeed, monsterSpeed)
            }, 1000)
          } else {
            // If auto-attack is disabled set character turn and manually select skill to attack monster
            this.saveTempSpeed = { characterSpeed, monsterSpeed }
            this.characterTurn = true
          }
          // If special skill was used. Reduce cool-down of special attack on each character turn
          if (this.specialAttackCooldown > 0) {
            this.specialAttackCooldown -= 1
          }
        } else {
          // If monster speed is greater then character speed monster will attack character
          // Deal damage to character
          this.dealDamageToCharacter(this.randomMonsterDamage())
          // Before attack reduce monster speed by minimum speed
          monsterSpeed -= minSpeed
          // Start next turn after 1 second
          setTimeout(() => {
            this.startBattle(characterSpeed, monsterSpeed)
          }, 1000)
        }
      }
    },
    dealDamageToMonster ({ damage, criticalHit }) {
      // When dealing damage to monster reset monster lastDealtDamage to 0
      this.lastDealtDamageByMonster = 0
      // Store criticalHit inside value to display criticalHit animation
      this.lastDealtDamageCriticalHit = criticalHit
      // Store last dealt damage by character so we can use in character component
      this.lastDealtDamageByCharacter = damage
      // Calculate experience that character can earn
      const experienceToEarn = this.lastDealtDamageByCharacter * (this.returnMonsterExperience / this.returnMonsterHPTotal)
      // If damage is greater then monster HP then set monster HP to 0
      if (this.lastDealtDamageByCharacter > this.returnMonsterHP) {
        this.monster.HP.current = 0
      } else {
        // If damage is lower then monster HP lower monster HP by damage he took
        this.monster.HP.current -= this.lastDealtDamageByCharacter
      }
      // If damage was equal to 0 show message that user did miss monster
      if (!this.lastDealtDamageByCharacter) {
        this.battleLog.push('<em>Missed monster while trying to hit</em>')
      } else {
        // If available exp that character can earn is greater then 0
        if (this.availableExperienceToEarn > 0) {
          // If experience that can be earned is greater then available experience
          if (experienceToEarn > this.availableExperienceToEarn) {
            // Set character experience by adding available experience he can earn
            this.character.experience += this.availableExperienceToEarn
          } else {
            // Set character experience by adding experience he can earn
            this.character.experience += experienceToEarn
          }
          // Reduce available experience that character can earn by points he did earn
          this.availableExperienceToEarn -= experienceToEarn
        }
        // Check if character made critical hit and display appropriate message based on condition
        if (criticalHit) {
          this.battleLog.push(`<strong>CHARACTER</strong>: <strong style="color: red">Critical HIT</strong> Damage dealt ${this.lastDealtDamageByCharacter.toFixed(2)}.`)
        } else {
          this.battleLog.push(`<strong>CHARACTER</strong>: Damage dealt ${this.lastDealtDamageByCharacter.toFixed(2)}.`)
        }
        this.battleLog.push(`<strong>CHARACTER</strong>: Earned ${experienceToEarn.toFixed(2)} experience by this hit!`)
      }
      // If monster doesn't have any HP left show message that character killed monster
      if (!this.returnMonsterHP) {
        this.battleLog.push('<strong>Successfully killed monster!</strong>')
      }
    },
    dealDamageToCharacter ({ damage, criticalHit }) {
      // When dealing damage to character reset character lastDealtDamage to 0
      this.lastDealtDamageByCharacter = 0
      // Store criticalHit inside value to display criticalHit animation
      this.lastDealtDamageCriticalHit = criticalHit
      // Store last dealt damage by monster so we can use it in monster component
      this.lastDealtDamageByMonster = damage
      // If damage is greater then character HP set character HP to 0
      if (this.lastDealtDamageByMonster > this.returnCharacterHP) {
        this.character.HP.current = 0
      } else {
        // If damage is lower then character HP lower character HP by damage he took
        this.character.HP.current -= this.lastDealtDamageByMonster
      }
      // If damage was equal to 0 show message that monster did miss character
      if (!this.lastDealtDamageByMonster) {
        this.battleLog.push('<em>Missed character while trying to hit</em>')
        // Check if monster made critical hit and display appropriate message based on condition
      } else if (criticalHit) {
        this.battleLog.push(`<strong>MONSTER</strong>: <strong style="color: red">Critical HIT</strong> Damage dealt ${this.lastDealtDamageByMonster.toFixed(2)}.`)
      } else {
        this.battleLog.push(`<strong>MONSTER</strong>: Damage dealt ${this.lastDealtDamageByMonster.toFixed(2)}.`)
      }
      // If character doesn't have any HP left show message that monster killed character
      if (!this.returnCharacterHP) {
        this.battleLog.push('<strong>Successfully killed character!</strong>')
      }
    },
    reviveMonster () {
      // Revive monster and set his HP to max
      this.monster.HP.current = this.monster.HP.total
    },
    randomCharacterDamage (skillDMG) {
      const minDmg = this.returnCharacterAttack / 1.5 // Set min DMG
      const maxDmg = this.returnCharacterAttack // Set max DMG
      // Calculate finalDMG based on min and max DMG
      let finalDmg = Math.floor(Math.random() * (minDmg - maxDmg)) + minDmg
      // Calculate if hit is criticalHIT based on critical Rate percentage
      const criticalHit = (Math.random() < this.returnCharacterCriticalRate / 100)
      // If hit is critical then increase finalDMG by critical dmg percent
      if (criticalHit) {
        finalDmg = finalDmg + (finalDmg * this.returnCharacterCriticalDMG / 100)
      }
      // If character used skill then increase final DMG by skill DMG
      if (skillDMG) {
        finalDmg += skillDMG
      }
      // Return damage and state of critical hit
      return {
        damage: finalDmg * (100 / (100 + this.returnMonsterDefense)),
        criticalHit
      }
    },
    randomMonsterDamage () {
      const minDmg = this.returnMonsterAttack / 1.5 // Set min DMG
      const maxDmg = this.returnMonsterAttack // Set max DMG
      // Calculate finalDMG based on min and max DMG
      let finalDmg = Math.floor(Math.random() * (minDmg - maxDmg)) + minDmg
      // Calculate if hit is criticalHIT based on critical Rate percentage
      const criticalHit = (Math.random() < this.returnMonsterCriticalRate / 100)
      // If hit is critical then increase finalDMG by critical dmg percent
      if (criticalHit) {
        finalDmg = finalDmg + (finalDmg * this.returnMonsterCriticalDMG / 100)
      }
      // Return damage and state of critical hit
      return {
        damage: finalDmg * (100 / (100 + this.returnCharacterDefense)),
        criticalHit
      }
    }
  }
}

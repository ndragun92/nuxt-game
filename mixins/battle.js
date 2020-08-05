export default {
  data: () => ({
    battleStart: false, // Triggers if battle started
    battleLog: [], // Stores battle log
    characterTurn: false, // Triggers if character or monster has current turn
    lastDealtDamageByMonster: 0, // Last damage that monster did to character
    lastDealtDamageByCharacter: 0, // Last damage that character did to monster
    lastDealtDamageCriticalHit: false, // Triggers if last hit by character or monster was critical hit
    saveTempSpeed: null, // Save speed value for next turn
    autoAttack: false, // State of character attack auto/manual
    battleSpeed: 1000, // Game speed 1 second/turn
    skillCooldown: {}
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
      const minSpeed = this.returnCharacter.speed <= this.returnMonster.speed ? this.returnCharacter.speed : this.returnMonster.speed
      console.log('DEBUG SPEED', { characterSpeed, monsterSpeed })
      // If character HP is equal or lower then 0 return GAME OVER
      if (this.returnCharacterHP <= 0) {
        this.battleStart = false
        return alert('Game over')
        // If monster HP is equal or lower then 0 return VICTORY
      } else if (this.returnMonsterHP <= 0) {
        this.battleStart = false
        return alert('Victory!')
        // If character speed or monster speed is equal or lower then 0 run start battle from beginning and reset speed to initial speed
      } else if ((characterSpeed <= 0 && monsterSpeed <= 0) || (characterSpeed < minSpeed && monsterSpeed < minSpeed)) {
        return this.startBattle()
        // Get minimum speed [Check if character or monster has lower speed and set as minSpeed]
        // If character speed is greater then monster speed character is first to attack
      } else if (characterSpeed > monsterSpeed) {
        // Before attack reduce character speed by minimum speed
        characterSpeed -= minSpeed
        // If auto-attack is enabled automatically attack monster
        if (this.autoAttack) {
          // Deal damage to monster
          const basicSkillAttack = this.skills.find(obj => obj.skill === 'basic_attack')
          this.dealDamageToMonster(this.randomCharacterDamage(basicSkillAttack))
          // Start next turn after 1 second
          setTimeout(() => {
            this.startBattle(characterSpeed, monsterSpeed)
          }, this.battleSpeed)
        } else {
          // If auto-attack is disabled set character turn and manually select skill to attack monster
          this.saveTempSpeed = { characterSpeed, monsterSpeed }
          this.characterTurn = true
        }
        // CHANGE COOLODOWN OF USED SKILLS
        for (const [key, value] of Object.entries(this.skillCooldown)) {
          if (value > 0) {
            this.skillCooldown[key] -= 1
          }
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
        }, this.battleSpeed)
      }
    },
    dealDamageToMonster ({ damage, criticalHit, skill }) {
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
          this.battleLog.push(`<strong class="character">${this.returnCharacterName}</strong>: <strong style="color: #ff3636">Critical HIT</strong> Damage dealt ${this.lastDealtDamageByCharacter.toFixed(2)} by skill: ${skill}.`)
        } else {
          this.battleLog.push(`<strong class="character">${this.returnCharacterName}</strong>: Damage dealt ${this.lastDealtDamageByCharacter.toFixed(2)} by skill: ${skill}.`)
        }
        this.battleLog.push(`<em>Earned ${experienceToEarn.toFixed(2)} experience by this hit!</em>`)
      }
      // If monster doesn't have any HP left show message that character killed monster
      if (!this.returnMonsterHP) {
        this.battleLog.push('<strong class="win">Successfully did kill monster. Congratz!</strong>')
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
        this.battleLog.push(`<strong class="monster">${this.returnMonsterName}</strong>: <strong style="color: #ff3636">Critical HIT</strong> Damage dealt ${this.lastDealtDamageByMonster.toFixed(2)}.`)
      } else {
        this.battleLog.push(`<strong class="monster">${this.returnMonsterName}</strong>: Damage dealt ${this.lastDealtDamageByMonster.toFixed(2)}.`)
      }
      // If character doesn't have any HP left show message that monster killed character
      if (!this.returnCharacterHP) {
        this.battleLog.push('<strong class="lose">You are dead. Get stronger before you come again!</strong>')
      }
    },
    reviveMonster () {
      // Revive monster and set his HP to max
      this.monster.HP.current = this.monster.HP.total
    },
    randomCharacterDamage (skill) {
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
      if (skill) {
        finalDmg += finalDmg + (finalDmg * skill.amp / 100)
        finalDmg += skill.attack
        Object.assign(this.skillCooldown, {
          [skill.skill]: skill.cooldown + 1
        })
      }
      // Return damage and state of critical hit
      return {
        damage: finalDmg * (100 / (100 + this.returnMonsterDefense)),
        criticalHit,
        skill: skill ? skill.name : 'Basic attack'
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

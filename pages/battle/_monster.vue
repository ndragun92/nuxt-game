<template>
  <div v-if="!$fetchState.pending">
    <el-monster
      :monster="returnMonster"
      :received-damage="lastDealtDamageByCharacter"
      :critical-hit="lastDealtDamageCriticalHit"
    />
    <el-character
      :character="returnCharacter"
      :experience-table="experienceTable"
      :received-damage="lastDealtDamageByMonster"
      :critical-hit="lastDealtDamageCriticalHit"
    />
    <hr>
    <button v-if="!returnMonsterHP" type="button" @click="revive()">
      Revive Boss
    </button>
    <button type="button" @click="autoAttack = !autoAttack">
      Auto-attack - {{ autoAttack ? 'on': 'off' }}
    </button>
    <button v-if="characterTurn" type="button" @click="basicAttack()">
      basicAttack
    </button>
    <button v-if="!battleStart" type="button" @click="startBattle()">
      Start battle
    </button>
    <div>
      <ul>
        <li v-for="(text, index) in returnBattleLog" :key="index">
          <span v-html="text" />
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import monsterMixin from '@/mixins/monster'
import characterMixin from '@/mixins/character'
export default {
  mixins: [monsterMixin, characterMixin],
  async fetch () {
    this.experienceTable = (await this.$content('settings/experience').fetch()).table
    this.character = await this.$content('character').fetch()
    this.monster = await this.$content(`monsters/${this.$route.params.monster}`).fetch()
    this.availableExperienceToEarn = this.returnMonsterExperience
  },
  data: () => ({
    battleStart: false,
    monster: {},
    character: {},
    lastDealtDamageByCharacter: 0,
    lastDealtDamageByMonster: 0,
    lastDealtDamageCriticalHit: false,
    battleLog: [],
    experienceTable: [],
    availableExperienceToEarn: 0,
    characterTurn: false,
    autoAttack: false,
    saveTempSpeed: null
  }),
  computed: {
    returnBattleLog () {
      return [...this.battleLog].reverse()
    }
  },
  methods: {
    dealDamageToMonster ({ damage, criticalHit }) {
      this.lastDealtDamageByMonster = 0
      this.lastDealtDamageCriticalHit = criticalHit
      this.lastDealtDamageByCharacter = damage
      const experienceToEarn = this.lastDealtDamageByCharacter * (this.returnMonsterExperience / this.returnMonsterHPTotal)
      if (this.lastDealtDamageByCharacter > this.returnMonsterHP) {
        this.monster.HP.current = 0
      } else {
        this.monster.HP.current -= this.lastDealtDamageByCharacter
      }
      if (!this.lastDealtDamageByCharacter) {
        this.battleLog.push('<em>Missed monster while trying to hit</em>')
      } else {
        if (this.availableExperienceToEarn > 0) {
          if (experienceToEarn > this.availableExperienceToEarn) {
            this.character.experience += this.availableExperienceToEarn
          } else {
            this.character.experience += experienceToEarn
          }
          this.availableExperienceToEarn -= experienceToEarn
        }
        if (criticalHit) {
          this.battleLog.push(`<strong>CHARACTER</strong>: <strong style="color: red">Critical HIT</strong> Damage dealt ${this.lastDealtDamageByCharacter.toFixed(2)}.`)
        } else {
          this.battleLog.push(`<strong>CHARACTER</strong>: Damage dealt ${this.lastDealtDamageByCharacter.toFixed(2)}.`)
        }
        this.battleLog.push(`<strong>CHARACTER</strong>: Earned ${experienceToEarn.toFixed(2)} experience by this hit!`)
      }
      if (!this.returnMonsterHP) {
        this.battleLog.push('<strong>Successfully killed monster!</strong>')
      }
    },
    dealDamageToCharacter ({ damage, criticalHit }) {
      this.lastDealtDamageByCharacter = 0
      this.lastDealtDamageCriticalHit = criticalHit
      this.lastDealtDamageByMonster = damage
      if (this.lastDealtDamageByMonster > this.returnCharacterHP) {
        this.character.HP.current = 0
      } else {
        this.character.HP.current -= this.lastDealtDamageByMonster
      }
      if (!this.lastDealtDamageByMonster) {
        this.battleLog.push('<em>Missed character while trying to hit</em>')
      } else if (criticalHit) {
        this.battleLog.push(`<strong>MONSTER</strong>: <strong style="color: red">Critical HIT</strong> Damage dealt ${this.lastDealtDamageByMonster.toFixed(2)}.`)
      } else {
        this.battleLog.push(`<strong>MONSTER</strong>: Damage dealt ${this.lastDealtDamageByMonster.toFixed(2)}.`)
      }
      if (!this.returnCharacterHP) {
        this.battleLog.push('<strong>Successfully killed character!</strong>')
      }
    },
    revive () {
      this.monster.HP.current = this.monster.HP.total
    },
    randomCharacterDamage () {
      // const minDmg = minAttack * this.returnCharacterLevel
      // const maxDmg = maxAttack * this.returnCharacterLevel
      const minDmg = this.returnCharacterAttack / 1.5
      const maxDmg = this.returnCharacterAttack
      let finalDmg = Math.floor(Math.random() * (minDmg - maxDmg)) + minDmg
      const criticalHit = (Math.random() < this.returnCharacterCriticalRate / 100)
      if (criticalHit) {
        finalDmg = finalDmg + (finalDmg * this.returnCharacterCriticalDMG / 100)
      }
      return {
        damage: finalDmg * (100 / (100 + this.returnMonsterDefense)),
        criticalHit
      }
    },
    randomMonsterDamage () {
      // const minDmg = minAttack * this.returnCharacterLevel
      // const maxDmg = maxAttack * this.returnCharacterLevel
      const minDmg = this.returnMonsterAttack / 1.5
      const maxDmg = this.returnMonsterAttack
      let finalDmg = Math.floor(Math.random() * (minDmg - maxDmg)) + minDmg
      const criticalHit = (Math.random() < this.returnMonsterCriticalRate / 100)
      if (criticalHit) {
        finalDmg = finalDmg + (finalDmg * this.returnMonsterCriticalDMG / 100)
      }
      return {
        damage: finalDmg * (100 / (100 + this.returnCharacterDefense)),
        criticalHit
      }
    },
    testDamage () {
      console.log('randomCharacterDamage', this.randomCharacterDamage())
    },
    basicAttack () {
      const { characterSpeed, monsterSpeed } = this.saveTempSpeed
      this.dealDamageToMonster(this.randomCharacterDamage())
      this.startBattle(characterSpeed, monsterSpeed)
    },
    startBattle (characterSpeed = this.returnCharacter.speed, monsterSpeed = this.returnMonster.speed) {
      if (!this.battleStart) {
        this.battleStart = true
      }
      this.characterTurn = false
      if (this.returnCharacterHP <= 0) {
        return alert('Game over')
      } else if (this.returnMonsterHP <= 0) {
        return alert('Victory!')
      } else if (characterSpeed <= 0 && monsterSpeed <= 0) {
        return this.startBattle()
      } else {
        const minSpeed = this.returnCharacter.speed < this.returnMonster.speed ? this.returnCharacter.speed : this.returnMonster.speed
        if (characterSpeed > monsterSpeed) {
          // this.dealDamageToMonster(this.randomCharacterDamage())
          characterSpeed -= minSpeed
          if (this.autoAttack) {
            this.dealDamageToMonster(this.randomCharacterDamage())
            setTimeout(() => {
              this.startBattle(characterSpeed, monsterSpeed)
            }, 1000)
          } else {
            this.saveTempSpeed = { characterSpeed, monsterSpeed }
            this.characterTurn = true
          }
        } else {
          this.dealDamageToCharacter(this.randomMonsterDamage())
          monsterSpeed -= minSpeed
          setTimeout(() => {
            this.startBattle(characterSpeed, monsterSpeed)
          }, 1000)
        }
      }
    }
  }
}
</script>

<style>
h3 {
  margin: 0;
}
</style>

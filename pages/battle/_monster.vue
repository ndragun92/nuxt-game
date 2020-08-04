<template>
  <div v-if="!$fetchState.pending">
    <el-monster :monster="returnMonster" />
    <el-character :character="returnCharacter" :experience-table="experienceTable" />
    <hr>
    <button v-if="returnMonsterHP" type="button" @click="dealDamageToMonster(randomCharacterDamage())">
      Did deal {{ lastDealtDamage.toFixed(2) }} damage
    </button>
    <button v-if="!returnMonsterHP" type="button" @click="revive()">
      Revive Boss
    </button>
    <button type="button" @click="testDamage()">
      testDamage
    </button>
    <button type="button" @click="startBattle()">
      battle
    </button>
    <div>
      <ul>
        <li v-for="(text, index) in battleLog" :key="index">
          {{ text }}
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
    monster: {},
    character: {},
    lastDealtDamage: 0,
    battleLog: [],
    experienceTable: [],
    availableExperienceToEarn: 0
  }),
  methods: {
    dealDamageToMonster (damage) {
      this.lastDealtDamage = damage
      const experienceToEarn = this.lastDealtDamage * (this.returnMonsterExperience / this.returnMonsterHPTotal)
      if (this.lastDealtDamage > this.returnMonsterHP) {
        this.monster.HP.current = 0
      } else {
        this.monster.HP.current -= this.lastDealtDamage
      }
      if (!this.lastDealtDamage) {
        this.battleLog.push('Missed monster while trying to hit')
      } else {
        console.log('availableExperienceToEarn', this.availableExperienceToEarn)
        if (this.availableExperienceToEarn > 0) {
          if (experienceToEarn > this.availableExperienceToEarn) {
            this.character.experience += this.availableExperienceToEarn
          } else {
            this.character.experience += experienceToEarn
          }
          this.availableExperienceToEarn -= experienceToEarn
        }
        this.battleLog.push(`Dealt ${this.lastDealtDamage.toFixed(2)} damage to monster + earned ${experienceToEarn.toFixed(2)} experience`)
      }
      if (!this.returnMonsterHP) {
        this.battleLog.push('Successfully killed monster!')
        // this.monster.level += 1
        this.battleLog.push('Moving to next monster!')
        // alert('You successfully killed monster')
        // this.$router.push('/')
        // return this.revive()
      }
    },
    dealDamageToCharacter (damage) {
      this.lastDealtDamage = damage
      if (this.lastDealtDamage > this.returnCharacterHP) {
        this.character.HP.current = 0
      } else {
        this.character.HP.current -= this.lastDealtDamage
      }
      if (!this.lastDealtDamage) {
        this.battleLog.push('Missed character while trying to hit')
      } else {
        this.battleLog.push(`Monster dealt ${this.lastDealtDamage.toFixed(2)} damage to character!`)
      }
      if (!this.returnCharacterHP) {
        this.battleLog.push('Successfully killed character!')
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
      const finalDmg = Math.floor(Math.random() * (minDmg - maxDmg)) + minDmg
      return finalDmg * (100 / (100 + this.returnMonsterDefense))
    },
    randomMonsterDamage () {
      // const minDmg = minAttack * this.returnCharacterLevel
      // const maxDmg = maxAttack * this.returnCharacterLevel
      const minDmg = this.returnMonsterAttack / 1.5
      const maxDmg = this.returnMonsterAttack
      const finalDmg = Math.floor(Math.random() * (minDmg - maxDmg)) + minDmg
      return finalDmg * (100 / (100 + this.returnCharacterDefense))
    },
    testDamage () {
      console.log('randomCharacterDamage', this.randomCharacterDamage())
    },
    startBattle (characterSpeed = this.returnCharacter.speed, monsterSpeed = this.returnMonster.speed) {
      if (this.returnCharacterHP <= 0 || this.returnMonsterHP <= 0) {
        console.log('One of characters got killed')
        if (this.returnCharacterHP <= 0) {
          alert('Game over')
        } else {
          alert('Victory!')
        }
        return false
      }
      if (characterSpeed <= 0 && monsterSpeed <= 0) {
        console.log('START OVER')
        this.startBattle()
        return false
      } else {
        const minSpeed = this.returnCharacter.speed < this.returnMonster.speed ? this.returnCharacter.speed : this.returnMonster.speed
        if (characterSpeed > monsterSpeed) {
          console.log('character turn')
          this.dealDamageToMonster(this.randomCharacterDamage())
          characterSpeed -= minSpeed
        } else {
          console.log('monster turn')
          this.dealDamageToCharacter(this.randomMonsterDamage())
          monsterSpeed -= minSpeed
        }
        console.log('startBattle', { characterSpeed, monsterSpeed, minSpeed, old: this.returnCharacter.speed })
        setTimeout(() => {
          this.startBattle(characterSpeed, monsterSpeed)
        }, 100)
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

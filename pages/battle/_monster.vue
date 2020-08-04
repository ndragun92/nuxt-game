<template>
  <div v-if="!$fetchState.pending">
    <el-monster :monster="returnMonster" />
    <el-character :character="returnCharacter" :experience-table="experienceTable" />
    <hr>
    <button v-if="returnMonsterHP" type="button" @click="dealDamage(100)">
      Hit by 100 damage
    </button>
    <button v-if="returnMonsterHP" type="button" @click="dealDamage(randomDamage(145, 253))">
      Did deal {{ lastDealtDamage.toFixed(2) }} damage
    </button>
    <button v-if="!returnMonsterHP" type="button" @click="revive()">
      Revive Boss
    </button>
    <button type="button" @click="testDamage()">
      testDamage
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
    this.monster = await this.$content(`monsters/${this.$route.params.monster}`).fetch()
    this.availableExperienceToEarn = this.returnMonsterExperience
  },
  data: () => ({
    monster: {},
    character: {
      experience: 0,
      stats: {
        STR: 3000,
        DEX: 7,
        INT: 4,
        points: 0
      }
    },
    lastDealtDamage: 0,
    battleLog: [],
    experienceTable: [],
    availableExperienceToEarn: 0
  }),
  methods: {
    dealDamage (damage) {
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
        alert('You successfully killed monster')
        return this.revive()
      }
    },
    revive () {
      this.monster.HP.current = this.monster.HP.total
    },
    randomDamage () {
      // const minDmg = minAttack * this.returnCharacterLevel
      // const maxDmg = maxAttack * this.returnCharacterLevel
      const minDmg = this.returnCharacterAttack / 1.5
      const maxDmg = this.returnCharacterAttack
      const finalDmg = Math.floor(Math.random() * (minDmg - maxDmg)) + minDmg
      return finalDmg * (100 / (100 + this.returnMonsterDefense))
    },
    testDamage () {
      console.log('randomDamage', this.randomDamage())
    }
  }
}
</script>

<style>
h3 {
  margin: 0;
}
</style>

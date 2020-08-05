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
    <button v-if="!returnMonsterHP" type="button" @click="reviveMonster()">
      Revive Boss
    </button>
    <button type="button" @click="autoAttack = !autoAttack">
      Auto-attack - {{ autoAttack ? 'on': 'off' }}
    </button>
    <button v-if="characterTurn" type="button" @click="basicAttack()">
      basicAttack
    </button>
    <button v-if="characterTurn" type="button" :disabled="!!specialAttackCooldown" @click="specialAttack(1000)">
      specialAttack - Cooldown {{ specialAttackCooldown }}
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
import battleMixing from '@/mixins/battle'
import monsterMixin from '@/mixins/monster'
import characterBaseMixin from '@/mixins/character/base'
export default {
  mixins: [battleMixing, monsterMixin, characterBaseMixin],
  async fetch () {
    this.experienceTable = (await this.$content('settings/experience').fetch()).table
    this.character = await this.$content('character').fetch()
    this.monster = await this.$content(`monsters/${this.$route.params.monster}`).fetch()
    this.availableExperienceToEarn = this.returnMonsterExperience
  },
  data: () => ({
    monster: {},
    character: {},
    experienceTable: [],
    availableExperienceToEarn: 0
  })
}
</script>

<style>
h3 {
  margin: 0;
}
</style>

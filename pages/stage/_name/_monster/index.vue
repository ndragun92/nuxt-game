<template>
  <div v-if="!$fetchState.pending" class="battle-ui">
    <div class="battle-ui__background" :style="{ backgroundImage: `url(/images/stages/background/${returnStageName}.jpg)` }" />
    <div class="battle-ui__map">
      <img class="stage-name__map" :src="`/images/stages/map/${returnStageName}.gif`" :alt="returnStageName">
      <el-map :monsters="monsters" :stage-name="returnStageName" :current-stage="returnMonsterName" />
    </div>
    <div class="battle-ui__wrapper">
      <div class="battle-ui__container">
        <el-monster
          :monster="returnMonster"
          :received-damage="lastDealtDamageByCharacter"
          :critical-hit="lastDealtDamageCriticalHit"
          :stage-name="returnStageName"
        />
        <div class="logs">
          <h6>Battle logs:</h6>
          <div class="logs__container">
            <template v-if="returnBattleLog.length">
              <p v-for="(text, index) in returnBattleLog" :key="index" v-html="text" />
            </template>
            <template v-else>
              <p>No logs. Please start battle!</p>
            </template>
          </div>
        </div>
        <div v-if="!battleStart" class="battle__start">
          <button type="button" @click="startBattle()">
            Start battle
          </button>
        </div>
      </div>
    </div>
    <el-character
      :character="returnCharacter"
      :experience-table="experienceTable"
      :received-damage="lastDealtDamageByMonster"
      :critical-hit="lastDealtDamageCriticalHit"
      :auto-attack="autoAttack"
      :character-turn="characterTurn"
      :skill-cooldown="skillCooldown"
      @onAutoAttack="autoAttack = !autoAttack"
      @onSkillAttack="skillAttack"
    />
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
    console.log('MONSTER FETCH')
    this.experienceTable = (await this.$content('settings/experience').fetch()).table
    this.character = await this.$content('character').fetch()
    this.monsters = await this.$content(`monsters/${this.returnStageName}`).sortBy('field', 'asc').fetch()
    this.monster = await this.$content(`monsters/${this.returnStageName}/${this.returnMonsterName}`).fetch()
    this.availableExperienceToEarn = this.returnMonsterExperience
  },
  data: () => ({
    monsters: [],
    monster: {},
    character: {},
    experienceTable: [],
    availableExperienceToEarn: 0
  }),
  computed: {
    returnStageName () {
      return this.$route.params.name
    },
    returnMonsterName () {
      return this.$route.params.monster
    }
  }
}
</script>

<style lang="scss" scoped>
.battle-ui {
  height: 100vh;
  background-color: var(--dark-primary-color);
  &__background {
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.5;
  }
  &__map {
    position: absolute;
    top: 20px;
    left: 20px;
    img {
      display: block;
      width: 400px;
      height: 400px;
    }
  }
  &__wrapper {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__container {
    width: 100%;
    max-width: 300px;
    padding: 20px;
    background-color: var(--dark-primary-color);
    color: var(--light-text-primary-color);
    border-radius: var(--radius);
  }
}
.battle__start {
  margin-top: 10px;
  width: 100%;
  button {
    cursor: pointer;
    height: 30px;
    padding: 0 10px;
    width: 100%;
    border: none;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
    background-color: rgba(var(--info-color-rgb), 0.75);
    transition: var(--transition);
    &:hover {
      background-color: rgba(var(--info-color-rgb), 1);
    }
  }
}
.logs {
  margin-top: 10px;
  h6 {
    margin: 5px 0;
    text-transform: uppercase;
    font-size: 10px;
  }
  &__container {
    height: 200px;
    padding-right: 5px;
    overflow-y: auto;
    color: #a7a7a7;
    p {
      margin: 5px 0;
      font-size: 11px;
      line-height: 16px;
    }
    ::v-deep {
      em {
        color: var(--info-color);
        font-size: 10px;
      }
      strong {
        &.win {
          color: var(--success-color);
        }
        &.character {
          color: var(--warning-color)
        }
        &.lose {
          color: var(--error-color);
        }
      }
    }
  }
}
</style>

<template>
  <div v-if="!$fetchState.pending" class="battle-ui">
    <div class="battle-ui__background" />
    <div class="battle-ui__map">
      <img src="https://gamepedia.cursecdn.com/cabal_gamepedia/4/45/MapBG01.gif?version=e0e5ffc606b732d78be1b009924866b4" alt="">
    </div>
    <div class="battle-ui__wrapper">
      <div class="battle-ui__container">
        <el-monster-2
          :monster="returnMonster"
          :received-damage="lastDealtDamageByCharacter"
          :critical-hit="lastDealtDamageCriticalHit"
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
    <!--    <div>-->
    <!--      <button v-if="!returnMonsterHP" type="button" @click="reviveMonster()">-->
    <!--        Revive Boss-->
    <!--      </button>-->
    <!--      <button type="button" @click="autoAttack = !autoAttack">-->
    <!--        Auto-attack - {{ autoAttack ? 'on': 'off' }}-->
    <!--      </button>-->
    <!--      <button v-if="characterTurn" type="button" @click="basicAttack()">-->
    <!--        basicAttack-->
    <!--      </button>-->
    <!--      <button v-if="characterTurn" type="button" :disabled="!canUseSkill('force_stab')" @click="skillAttack('force_stab')">-->
    <!--        Force Stab - {{ canUseSkill('force_stab') }} - {{ returnSkillData('force_stab') }}-->
    <!--      </button>-->
    <!--      <button v-if="characterTurn" type="button" :disabled="!canUseSkill('assassinate')" @click="skillAttack('assassinate')">-->
    <!--        Assassinate - {{ canUseSkill('assassinate') }} - {{ returnSkillData('assassinate') }}-->
    <!--      </button>-->
    <!--      <button v-if="!battleStart" type="button" @click="startBattle()">-->
    <!--        Start battle-->
    <!--      </button>-->
    <!--      <div>-->
    <!--        <ul>-->
    <!--          <li v-for="(text, index) in returnBattleLog" :key="index">-->
    <!--            <span v-html="text" />-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--    </div>-->
    <el-character-2
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

<style lang="scss" scoped>
.battle-ui {
  height: 100vh;
  background-color: var(--dark-primary-color);
  &__background {
    background-image: url("https://cabalph.playpark.com/main/wp-content/uploads/2017/05/BloodyIce3.jpg");
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

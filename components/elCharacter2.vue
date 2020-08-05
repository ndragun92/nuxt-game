<template>
  <div class="character__toolbar">
    <div class="character__toolbar-container">
      <div class="character__toolbar-container-left">
        <div class="character__details">
          <div class="character__details-image" @click="showCharacterInfo = !showCharacterInfo">
            <img src="http://naimg.playthisgame.com/cabal_new/images/classes/blader.jpg" alt="">
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <div v-if="receivedDamage" class="character__dmg" :class="{ criticalHit }">
                <span v-if="!criticalHit">{{ receivedDamage.toFixed() }}</span>
                <span v-else class="animated shake">{{ receivedDamage.toFixed() }}</span>
              </div>
            </transition>
          </div>
          <div class="character__details-box">
            <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
              <div v-if="!showCharacterInfo" class="character__details-stats">
                <div class="character__details-att-def">
                  <span><i class="icon-sword"><span class="path1" /><span class="path2" /><span class="path3" /><span class="path4" /><span class="path5" /><span class="path6" /><span class="path7" /><span class="path8" /></i><span class="atk-value">{{ returnCharacterAttack.toFixed(2) }}</span></span>
                  <span><i class="icon-shield"><span class="path1" /><span class="path2" /><span class="path3" /><span class="path4" /></i><span class="def-value">{{ returnCharacterDefense.toFixed(2) }}</span></span>
                </div>
                <div class="character__details-hp">
                  <span><i class="icon-heart"><span class="path1" /><span class="path2" /></i><span class="hp-value">{{ returnCharacterHPTotal }}</span></span>
                </div>
              </div>
            </transition>
            <div class="character__hp-progress">
              <div class="character__hp-bar" :style="{ width: `${returnCharacterHPPercentage}%` }">
                <p class="character__hp-percent" :class="{ offset: returnCharacterHPPercentage <= 20 }">
                  {{ returnCharacterHPPercentage }}%
                </p>
              </div>
            </div>
            <div class="character__details-name">
              <span>{{ returnCharacterName }}</span>
            </div>
            <div class="character__details-level">
              {{ returnCharacterLevel }} Level
            </div>
          </div>
        </div>
        <div class="character__skills">
          <ul>
            <li v-for="n in 5" :key="n">
              <img src="https://gamepedia.cursecdn.com/cabal_gamepedia/9/94/Stab_and_Slash_icon.png" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div>
        Right
      </div>
      <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <div v-if="showCharacterInfo" class="character__info">
          <ul>
            <li>
              <span><strong>STR</strong>: {{ returnCharacterStats.STR }}</span>
              <span>
                <i class="material-icons">remove</i>
                <i class="material-icons" @click="character.stats.STR += 10">add</i>
              </span>
            </li>
            <li>
              <span><strong>DEX</strong>: {{ returnCharacterStats.DEX }}</span>
              <span>
                <i class="material-icons">remove</i>
                <i class="material-icons" @click="character.stats.DEX += 10">add</i>
              </span>
            </li>
            <li>
              <span><strong>INT</strong>: {{ returnCharacterStats.INT }}</span>
              <span>
                <i class="material-icons">remove</i>
                <i class="material-icons" @click="character.stats.INT += 10">add</i>
              </span>
            </li>
            <li>
              <strong>Critical Rate</strong>: 50%
            </li>
            <li>
              <strong>Critical DMG</strong>: 250%
            </li>
          </ul>
        </div>
      </transition>
      <div class="character__exp-bar">
        <div class="character__exp-bar-progress" :style="{ width: `${returnCharacterExperiencePercent}%` }" />
        <div class="character__exp-bar-lines">
          <div v-for="n in 10" :key="n" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import characterBaseMixin from '@/mixins/character/base'
export default {
  mixins: [characterBaseMixin],
  props: {
    character: {
      type: Object,
      default: () => ({}),
      required: true
    },
    experienceTable: {
      type: Array,
      default: () => [],
      required: true
    },
    receivedDamage: {
      type: Number,
      default: 0,
      required: true
    },
    criticalHit: {
      type: Boolean,
      default: false,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.character {
  &__toolbar {
    position: fixed;
    right: 0;
    bottom: 5px;
    left: 0;
    z-index: $z-index-fixed;
    &-container {
      position: relative;
      max-width: 1024px;
      margin: auto;
      background-color: var(--dark-primary-color);
      color: var(--light-text-primary-color);
      font-size: 12px;
      padding: 10px 10px 15px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: var(--radius) var(--radius) 0 0;
      &-left {
        display: flex;
      }
    }
  }
  &__exp-bar {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    line-height: 10px;
    background-color: var(--light-primary-color);
    font-weight: 600;
    text-align: center;
    border: 1px solid var(--dark-primary-color);
    &-progress {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      background-color: var(--info-color);
      transition: width var(--transition) linear;
    }
    &-lines {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      & > div {
        width: calc(100% / 10);
        height: 100%;
        &:not(:last-child) {
          border-right: 2px solid var(--dark-primary-color);
        }
        //background-color: purple;
      }
    }
  }
  &__details {
    display: flex;
    &-box {
      padding: 0 10px;
      font-size: 10px;
    }
    &-image {
      position: relative;
      display: inline-block;
      img {
        object-fit: cover;
        object-position: center;
        display: block;
        width: 65px;
        height: 65px;
      }
    }
    &-stats {
      position: absolute;
      bottom: calc(100% + 5px);
      display: flex;
      align-items: center;
      background: #353442;
      padding: 3px 5px;
      border-radius: var(--radius);
      i {
        vertical-align: middle;
      }
    }
    &-att-def {
      .atk-value, .def-value {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
    &-hp {
      .hp-value {
        margin-left: 5px;
      }
    }
    &-name {
      display: block;
      span {
        font-size: 12px;
        font-weight: 600;
        margin-right: 10px;
      }
    }
    &-level {
      color: #a7a7a7;
    }
  }
  &__dmg {
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(var(--error-color-rgb), 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 24px;
    &.criticalHit {
      background-color: rgba(var(--error-color-rgb), 0.8);
      color: var(--dark-text-primary-color);
    }

  }
  &__skills {
    ul {
      height: 100%;
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      align-items: center;
      li {
        position: relative;
        border: 1px solid #353442;
        border-radius: var(--radius);
        overflow: hidden;
        margin: 0 2px;
        img {
          display: block;
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  &__info {
    position: absolute;
    z-index: -1;
    bottom: 100%;
    left: 10px;
    background-color: var(--dark-secondary-color);
    color: var(--light-text-primary-color);
    border-radius: var(--radius) var(--radius) 0 0;
    padding: 10px;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        font-size: 10px;
        text-transform: uppercase;
        margin: 5px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        i {
          vertical-align: middle;
          font-size: 12px;
        }
        &:first-child {
          margin-top: 0;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  &__hp {
    &-progress {
      margin: 0 0 5px 0;
      padding: 0;
      width: 150px;
      height: 10px;
      overflow: hidden;
      background: #e5e5e5;
    }
    &-bar {
      position: relative;
      float: left;
      height: 100%;
      background: var(--error-color);
      transition: width var(--transition) linear;
    }
    &-percent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      margin: 0;
      font-size: 8px;
      font-weight: 600;
      color: var(--dark-text-primary-color);
      &.offset {
        padding-left: 30px;
      }
    }
  }
}
</style>

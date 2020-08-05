<template>
  <div class="monster">
    <h2 class="monster__name">
      {{ returnMonsterName }}
    </h2>
    <div class="monster__image">
      <div class="monster__image-container">
        <img :src="returnMonsterImage" :alt="returnMonsterName">
        <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
          <div v-if="receivedDamage" class="monster__dmg" :class="{ criticalHit }">
            <span v-if="!criticalHit">{{ receivedDamage.toFixed() }}</span>
            <span v-else class="animate__animated animate__headShake">{{ receivedDamage.toFixed() }}</span>
          </div>
        </transition>
      </div>
    </div>
    <div class="monster__hp-progress">
      <div class="monster__hp-bar" :style="{ width: `${returnMonsterHPPercentage}%` }">
        <p class="monster__hp-percent">
          {{ returnMonsterHPPercentage }}%
        </p>
      </div>
    </div>
    <div class="monster__info">
      <div class="monster__info-level">
        {{ returnMonsterLevel }} Level
      </div>
      <div class="monster__info-stats">
        <div class="monster__info-hp">
          <i class="icon-heart"><span class="path1" /><span class="path2" /></i> {{ returnMonsterHPTotal }}
        </div>
        <div class="monster__info-attack">
          <i class="icon-sword"><span class="path1" /><span class="path2" /><span class="path3" /><span class="path4" /><span class="path5" /><span class="path6" /><span class="path7" /><span class="path8" /></i> {{ returnMonsterAttack.toFixed(2) }}
        </div>
        <div class="monster__info-defense">
          <i class="icon-shield"><span class="path1" /><span class="path2" /><span class="path3" /><span class="path4" /></i> {{ returnMonsterDefense.toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import monsterMixin from '@/mixins/monster'
export default {
  mixins: [monsterMixin],
  props: {
    monster: {
      type: Object,
      default: () => ({}),
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
.monster {
  &__name {
    margin: 0 0 10px 0;
    font-size: 18px;
    text-align: center;
  }
  &__image {
    display: flex;
    justify-content: center;
    &-container {
      position: relative;
      display: inline-block;
    }
    img {
      display: block;
      width: 100px;
      height: 100px;
      margin: auto;
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
  &__info {
    background-color: var(--dark-secondary-color);
    border-radius: var(--radius);
    padding: 10px;
    font-size: 12px;
    i {
      margin-right: 5px;
    }
    &-level {
      text-align: center;
      margin-bottom: 10px;
    }
    &-stats {
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #a7a7a7;
    }
  }
  &__hp {
    &-progress {
      margin: 10px 0;
      padding: 0;
      width: 100%;
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

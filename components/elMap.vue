<template>
  <div class="stage-name__map-areas" :class="{single: currentStage}">
    <div
      v-for="monster in monsters"
      :key="monster.slug"
      :class="{active: currentStage && currentStage === monster.slug}"
      @mouseenter="$emit('onShow', monster.slug)"
      @mouseleave="$emit('onClose')"
      @click="$router.push(`/stage/${stageName}/${monster.slug}`)"
    >
      <div v-if="currentStage ? currentStage === monster.slug : true">
        <h6>
          {{ monster.stage }}. Stage
        </h6>
        <h2>
          {{ monster.name }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    monsters: {
      type: Array,
      default: () => [],
      required: true
    },
    stageName: {
      type: String,
      default: '',
      required: true
    },
    currentStage: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.stage-name__map-areas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    background-color: rgba(var(--dark-primary-color-rgb), 0.25);
    &.single {
      pointer-events: none;
      & > div {
        &:not(.active) {
          background-color: rgba(var(--dark-primary-color-rgb), 0.9);
        }
      }
    }
    & > div {
      cursor: pointer;
      position: relative;
      border: 1px dashed var(--error-color);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      transition: background-color var(--transition) linear;
      img {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
      &:hover {
        background-color: rgba(var(--error-color-rgb), 0.65);
      }
      h6 {
        position: relative;
        z-index: 1;
        margin: 0 0 5px 0;
        font-size: 11px;
        font-weight: 600;
        color: var(--light-text-primary-color);
      }
      h2 {
        position: relative;
        margin: 5px 0 0 0;
        font-weight: 600;
        color: var(--light-text-primary-color);
        font-size: 12px;
      }
    }
}
</style>

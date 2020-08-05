<template>
  <div class="stage-name">
    <div class="stage-name__background" :style="{ backgroundImage: `url(/images/stages/map/${returnStageName}.gif)` }" />
    <div class="stage-name__wrapper">
      <img class="stage-name__map" :src="`/images/stages/map/${returnStageName}.gif`" alt="">
      <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
        <div v-if="showMonsterImage" class="stage-name__monster-image">
          <img :src="`/images/monsters/${returnStageName}/${showMonsterImage}.gif`" alt="">
        </div>
      </transition>
      <div class="stage-name__map-areas">
        <div
          v-for="monster in monsters"
          :key="monster.slug"
          @mouseenter="showMonsterImage = monster.slug"
          @mouseleave="showMonsterImage = null"
          @click="$router.push(`/stage/${returnStageName}/${monster.slug}`)"
        >
          <div>
            <h6>
              {{ monster.stage }}. Stage
            </h6>
            <h2>
              {{ monster.name }}
            </h2>
          </div>
        </div>
      </div>
      <h1 class="stage-name__title">
        {{ returnNormalName }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  async fetch () {
    console.log('STAGE FETCH')
    this.monsters = await this.$content(`monsters/${this.returnStageName}`).sortBy('field', 'asc').fetch()
  },
  data: () => ({
    monsters: [],
    showMonsterImage: null
  }),
  computed: {
    returnStageName () {
      return this.$route.params.name
    },
    returnNormalName () {
      return this.returnStageName.replace(/-/g, ' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.stage-name {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dark-primary-color);
  &__background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.1;
  }
  &__wrapper {
    position: relative;
  }
  &__title {
    text-align: center;
    margin: 10px 0 0 0;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    color: var(--light-text-primary-color);
    text-transform: capitalize;
  }
  &__map {
    width: 400px;
    height: 400px;
    display: block;
    object-fit: cover;
    &-areas {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(4, 1fr);
      background-color: rgba(var(--dark-primary-color-rgb), 0.25);
      & > div {
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
  }
  &__monster-image {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 0;
    right: 0;
    img {
      display: block;
      margin: auto;
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }
}
</style>

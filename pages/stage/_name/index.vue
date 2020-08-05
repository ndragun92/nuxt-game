<template>
  <div class="stage-name">
    <div class="stage-name__background" :style="{ backgroundImage: `url(/images/stages/map/${returnStageName}.gif)` }" />
    <div class="stage-name__wrapper">
      <img class="stage-name__map" :src="`/images/stages/map/${returnStageName}.gif`" :alt="returnNormalName">
      <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
        <div v-if="showMonsterImage" class="stage-name__monster-image">
          <img :src="`/images/monsters/${returnStageName}/${showMonsterImage}.gif`" alt="">
        </div>
      </transition>
      <el-map
        :monsters="monsters"
        :stage-name="returnStageName"
        @onShow="showMonsterImage = $event"
        @onClose="showMonsterImage = null"
      />
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

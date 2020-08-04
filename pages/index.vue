<template>
  <div>
    <nuxt-link to="/battle">
      Battle
    </nuxt-link>
    <ul>
      <li v-for="monster in monsters" :key="monster.slug">
        <nuxt-link :to="`/battle/${monster.slug}`">
          <img :src="monster.image" :alt="monster.name" width="50" height="50"> {{ monster.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async fetch () {
    this.monsters = await this.$content('monsters').fetch()
  },
  data: () => ({
    monsters: []
  })
}
</script>

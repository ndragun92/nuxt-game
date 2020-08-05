<template>
  <div>
    <ul>
      <li v-for="stage in stages" :key="stage.slug">
        <nuxt-link :to="`/stage/${stage.slug}`">
          <img :src="`/images/stages/${stage.slug}.gif`" :alt="stage.name" width="50" height="50"> {{ stage.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async fetch () {
    this.stages = await this.$content('stages').sortBy('stage', 'asc').fetch()
  },
  data: () => ({
    stages: []
  })
}
</script>

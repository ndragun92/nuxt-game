<template>
  <div style="border: 1px solid black; padding: 10px">
    <h3>Monster - {{ returnMonsterName }}</h3>
    <img :src="returnMonsterImage" alt="" width="100" height="100">
    <div>
      Level: {{ returnMonsterLevel }}
    </div>
    <div>
      Defense: {{ returnMonsterDefense }}
    </div>
    <div>
      Total Monster HP: {{ returnMonsterHPTotal }}
    </div>
    <div>
      Current Monster HP: {{ returnMonsterHP.toFixed(2) }}
    </div>
    <div>
      <progress :value="returnMonsterHP" :max="returnMonsterHPTotal">
        {{ returnMonsterHPPercentage }}%
      </progress>
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
    }
  }
}
</script>

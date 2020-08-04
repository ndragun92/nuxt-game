<template>
  <div style="border: 1px solid black; padding: 10px">
    <h3>Monster - {{ returnMonsterName }}</h3>
    <div v-if="receivedDamage" class="damage" :class="{critical: criticalHit}">
      {{ receivedDamage.toFixed() }}
    </div>
    <img :src="returnMonsterImage" alt="" width="100" height="100">
    <div>
      Level: {{ returnMonsterLevel }}
    </div>
    <div>
      Attack: {{ returnMonsterAttack }}
    </div>
    <div>
      Defense: {{ returnMonsterDefense }}
    </div>
    <div>
      Total HP: {{ returnMonsterHPTotal }}
    </div>
    <div>
      Current HP: {{ returnMonsterHP.toFixed(2) }}
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

<style scoped>
.fire-text {
  text-align: center;
  font-size: 120px;
  color: #fff;
  text-shadow: 0 0 20px #fefcc9, 10px -10px 30px #feec85, -20px -20px 40px #ffae34, 20px -40px 50px #ec760c, -20px -60px 60px #cd4606, 0 -80px 70px #973716, 10px -90px 80px #451b0e;
}
.damage {
  font-size: 28px;
  font-weight: 600;
}

.damage.critical {
  font-weight: 800;
  color: orangered;
}
</style>

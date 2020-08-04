<template>
  <div style="border: 1px solid black; padding: 10px">
    <h3>Character</h3>
    <div v-if="receivedDamage" class="damage" :class="{critical: criticalHit}">
      {{ receivedDamage.toFixed() }}
    </div>
    <div>
      <span @click="character.stats.STR += 1">STR - {{ returnCharacterStats.STR }}</span>
      <span @click="character.stats.DEX += 1">DEX - {{ returnCharacterStats.DEX }}</span>
      <span @click="character.stats.INT += 1">INT - {{ returnCharacterStats.INT }}</span>
      <span>Points to distribute - {{ returnCharacterStats.points }}</span>
    </div>
    <div>
      Level: {{ returnCharacterLevel }}
    </div>
    <div>
      Attack: {{ returnCharacterAttack }}
    </div>
    <div>
      Defense: {{ returnCharacterDefense }}
    </div>
    <div>
      Total HP: {{ returnCharacterHPTotal }}
    </div>
    <div>
      Current HP: {{ returnCharacterHP.toFixed(2) }}
    </div>
    <div>
      <progress :value="returnCharacterHP" :max="returnCharacterHPTotal">
        {{ returnCharacterHPPercentage }}%
      </progress>
    </div>
    <div>
      Experience: {{ returnCharacterExperience.toFixed(2) }}
      <progress :value="returnCharacterExperience" :max="returnNextLevelExperience">
        {{ returnCharacterExperiencePercent }}%
      </progress>
    </div>
  </div>
</template>

<script>
import characterMixin from '@/mixins/character'
export default {
  mixins: [characterMixin],
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

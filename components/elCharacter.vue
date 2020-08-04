<template>
  <div style="border: 1px solid black; padding: 10px">
    <h3>Character</h3>
    <div v-if="receivedDamage">
      Received {{ receivedDamage }}
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
    }

  }
}
</script>

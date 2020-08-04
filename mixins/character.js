export default {
  computed: {
    returnCharacter () {
      return this.character
    },
    returnCharacterExperience () {
      return this.returnCharacter.experience
    },
    returnCharacterHP () {
      return this.returnCharacter.HP.current
    },
    returnCharacterHPTotal () {
      return this.returnCharacter.HP.total
    },
    returnCharacterHPPercentage () {
      return (this.returnCharacterHP * 100 / this.returnCharacterHPTotal).toFixed(2)
    },
    returnCharacterStats () {
      return this.returnCharacter.stats
    },
    returnCharacterAttack () {
      const { STR, DEX, INT } = this.returnCharacterStats
      return (STR * 1) + (DEX * 0.5) + (INT * 0.1)
    },
    returnCharacterDefense () {
      const { STR, DEX, INT } = this.returnCharacterStats
      return (STR * 7) + (DEX * 5) + (INT * 2)
    },
    returnCharacterCriticalRate () {
      return this.returnCharacter.critical.rate
    },
    returnCharacterCriticalDMG () {
      return this.returnCharacter.critical.DMG
    },
    returnCharacterLevel () {
      return [...this.experienceTable].reverse().find(obj => obj.experience <= this.returnCharacterExperience).level
    },
    returnNextLevelExperience () {
      return this.experienceTable.find(obj => obj.level === this.returnCharacterLevel + 1).experience
    },
    returnCharacterExperiencePercent () {
      return (this.returnCharacterExperience * 100 / this.returnNextLevelExperience).toFixed(2)
    }
  }
}

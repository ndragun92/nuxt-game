export default {
  computed: {
    returnMonster () {
      return this.monster
    },
    returnMonsterName () {
      return this.returnMonster.name
    },
    returnMonsterImage () {
      return this.returnMonster.image
    },
    returnMonsterLevel () {
      return this.returnMonster.level
    },
    returnMonsterExperience () {
      return this.returnMonster.experience
    },
    returnMonsterDefense () {
      if (this.returnMonsterLevel === 1) { return this.returnMonster.defense }
      return this.returnMonster.defense + (this.returnMonsterLevel / 100 * this.returnMonster.defense)// Max monster level is 100
    },
    returnMonsterHP () {
      return this.returnMonster.HP.current
    },
    returnMonsterHPTotal () {
      return this.returnMonster.HP.total
    },
    returnMonsterHPPercentage () {
      return (this.returnMonsterHP * 100 / this.returnMonsterHPTotal).toFixed(2)
    }
  }
}

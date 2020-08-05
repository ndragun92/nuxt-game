export default {
  data: () => ({
    specialAttackCooldown: 0
  }),
  methods: {
    basicAttack () {
      const { characterSpeed, monsterSpeed } = this.saveTempSpeed
      this.dealDamageToMonster(this.randomCharacterDamage())
      this.startBattle(characterSpeed, monsterSpeed)
    },
    specialAttack (skillDMG) {
      const { characterSpeed, monsterSpeed } = this.saveTempSpeed
      this.specialAttackCooldown = 4
      this.dealDamageToMonster(this.randomCharacterDamage(skillDMG))
      this.startBattle(characterSpeed, monsterSpeed)
    }
  }
}

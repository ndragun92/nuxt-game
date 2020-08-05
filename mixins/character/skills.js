export default {
  data: () => ({
    skillCooldown: { },
    skills: [
      {
        name: 'Force Stab',
        skill: 'force_stab',
        amp: 5,
        attack: 34,
        cooldown: 3
      },
      {
        name: 'Assassinate',
        skill: 'assassinate',
        amp: 61,
        attack: 1617,
        cooldown: 7
      }
    ]
  }),
  methods: {
    basicAttack () {
      const { characterSpeed, monsterSpeed } = this.saveTempSpeed
      this.dealDamageToMonster(this.randomCharacterDamage())
      this.startBattle(characterSpeed, monsterSpeed)
    },
    skillAttack (skillName) {
      const { characterSpeed, monsterSpeed } = this.saveTempSpeed
      const skill = this.skills.find(obj => obj.skill === skillName)
      console.log('CAN USE SKILL?', this.canUseSkill(skillName))
      if (this.canUseSkill(skillName)) {
        alert(`Used: ${skill.name}`)
        this.dealDamageToMonster(this.randomCharacterDamage(skill))
        this.startBattle(characterSpeed, monsterSpeed)
      } else {
        return alert('Skill is on cooldown!')
      }
    },
    returnSkillData (skillName) {
      const skill = this.skills.find(obj => obj.skill === skillName)
      return {
        skillCooldown: skill.cooldown,
        cooldown: this.skillCooldown[skillName] || 0
      }
    },
    canUseSkill (skillName) {
      const skill = this.skillCooldown[skillName]
      console.log('check skill', skill)
      if (!skill) { return true } else { return !skill }
    }
  }
}

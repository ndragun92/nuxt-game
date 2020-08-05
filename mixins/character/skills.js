export default {
  data: () => ({
    skills: [
      {
        name: 'Basic attack',
        skill: 'basic_attack',
        type: 'attack',
        amp: 5,
        attack: 64,
        cooldown: 0
      },
      {
        name: 'Blade Cry',
        skill: 'blade_cry',
        type: 'attack',
        amp: 55,
        attack: 938,
        cooldown: 3
      },
      {
        name: 'Blade Scud',
        skill: 'blade_scud',
        type: 'attack',
        amp: 61,
        attack: 1586,
        cooldown: 5
      },
      {
        name: 'Lightning Slash',
        skill: 'lightning_slash',
        type: 'attack',
        amp: 66,
        attack: 2015,
        cooldown: 7
      },
      {
        name: 'Death Tempest',
        skill: 'death_tempest',
        type: 'attack',
        amp: 75,
        attack: 2288,
        cooldown: 9
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
      if (this.canUseSkill(skillName)) {
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
      if (!skill) { return true } else { return !skill }
    },
    returnSkillCooldownPercent (skill) {
      const { skillCooldown, cooldown } = this.returnSkillData(skill)
      return cooldown / skillCooldown * 100
    }
  }
}

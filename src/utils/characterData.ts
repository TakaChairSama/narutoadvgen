import type { AbilityStat, CharacterSkill, TechniqueScaling } from '../types/naruto';

export const ABILITY_STATS: AbilityStat[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export const SKILL_DEFINITIONS: Array<{ name: string; stat: AbilityStat }> = [
  { name: 'Acrobatics', stat: 'dex' },
  { name: 'Animal Handling', stat: 'wis' },
  { name: 'Athletics', stat: 'str' },
  { name: 'Chakra Control', stat: 'con' },
  { name: 'Crafting', stat: 'int' },
  { name: 'Deception', stat: 'cha' },
  { name: 'Illusions', stat: 'wis' },
  { name: 'Insight', stat: 'wis' },
  { name: 'History', stat: 'int' },
  { name: 'Intimidation', stat: 'cha' },
  { name: 'Investigation', stat: 'int' },
  { name: 'Medicine', stat: 'wis' },
  { name: 'Nature', stat: 'int' },
  { name: 'Ninshou', stat: 'int' },
  { name: 'Perception', stat: 'wis' },
  { name: 'Performance', stat: 'cha' },
  { name: 'Persuasion', stat: 'cha' },
  { name: 'Sleight of Hand', stat: 'dex' },
  { name: 'Stealth', stat: 'dex' },
  { name: 'Survival', stat: 'wis' },
  { name: 'Martial Arts', stat: 'str' },
];

export const DEFAULT_TECHNIQUE_SCALING: TechniqueScaling = {
  ninjutsu: 'int',
  taijutsu: 'str',
  genjutsu: 'wis',
};

export const createDefaultSkills = (): CharacterSkill[] =>
  SKILL_DEFINITIONS.map((skill) => ({
    ...skill,
    proficient: false,
    expertise: false,
    advantage: false,
  }));

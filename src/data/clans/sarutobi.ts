import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const SARUTOBI_FEATURES: ClanFeature[] = [
  {
    name: 'Monkey Combat',
    description:
      'You are proficient with quarterstaffs and spears. When wielding these weapons, you can use your bonus action to make an additional attack. The weapon gains the Finesse property for you.',
    level: 1,
  },
  {
    name: 'Fire Affinity',
    description:
      'When you cast a fire jutsu, you can spend 2 chakra to reroll any number of damage dice. You must use the new rolls. Additionally, you have resistance to fire damage.',
    level: 3,
    chakraCost: 2,
  },
  {
    name: "King's Wisdom",
    description:
      'Your experience in combat grants you tactical advantages. When you hit with a weapon attack, you can analyze the target. Until the end of your next turn, you and allies gain advantage on attacks against that target.',
    level: 7,
  },
];

export const SARUTOBI_JUTSU: ClanJutsu[] = [
  {
    name: 'Flame Dragon Dance',
    rank: 'C',
    chakraCost: 6,
    description: 'Create a spiraling dragon of fire',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Create fire dragon that moves 30ft per turn',
      'Deals 4d6 fire damage in 10ft radius',
      'Can direct dragon as bonus action',
      'Creatures must make DEX save or be knocked prone',
      'Higher ranks: +2d6 damage, larger radius',
    ],
  },
];

export const SARUTOBI_REQUIREMENTS = {
  abilityScores: {
    Wisdom: 13,
  },
  features: ['Must be born into clan'],
  restrictions: ['Must honor clan traditions'],
};

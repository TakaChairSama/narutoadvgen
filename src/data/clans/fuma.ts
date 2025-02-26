import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const FUMA_FEATURES: ClanFeature[] = [
  {
    name: 'Weapon Expert',
    description:
      'You gain proficiency with all thrown weapons. When you make a ranged attack with a thrown weapon, you can draw the weapon as part of the attack.',
    level: 1,
  },
  {
    name: 'Precise Shot',
    description:
      'When you make a ranged attack with a thrown weapon, you can spend 2 chakra to gain advantage on the attack roll.',
    level: 3,
    chakraCost: 2,
  },
  {
    name: 'Deadly Accuracy',
    description:
      'Your thrown weapons score a critical hit on a roll of 19-20. When you score a critical hit with a thrown weapon, add one additional weapon damage die.',
    level: 7,
  },
];

export const FUMA_JUTSU: ClanJutsu[] = [
  {
    name: 'Falling Heaven: Divide',
    rank: 'D',
    chakraCost: 5,
    description:
      'Coat your weapon in chakra and create an extremely powerful spin to sharpen the edge, splitting the air and even sound. Make a Ranged taijutsu attack.',
    components: ['M', 'W (Any Thrown)'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instantaneous',
    keywords: ['Hijutsu', 'Bukijutsu'],
    effects: [
      'Make a Ranged taijutsu attack.',
      'On a hit, deal 3d10 + Taijutsu ability modifier slashing damage.',
      'At Higher Ranks: Increase chakra cost by 3 and damage by 2d10 for each rank above D.',
    ],
  },
  {
    name: 'Falling Heaven: Split',
    rank: 'D',
    chakraCost: 5,
    description:
      'Release a collection of thrown weapons that cover a wide range, piercing through everything in their path. Creatures in range must make a Dexterity saving throw.',
    components: ['M', 'W (Any Thrown)'],
    castingTime: '1 Action',
    range: 'Self (30-foot Cone)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Bukijutsu'],
    effects: [
      'Creatures in range must make a Dexterity saving throw.',
      'On a failed save, take weapon damage + 2d8 damage.',
      'On a successful save, take half damage.',
      'At Higher Ranks: Increase chakra cost by 3 and damage by 2d8 for each rank above D.',
    ],
  },
  {
    name: 'Falling Heaven: Penetrate',
    rank: 'C',
    chakraCost: 8,
    description:
      'Focus chakra onto the edge of your next thrown weapon. For the duration, ranged attacks with a thrown weapon increase its damage die by one step and gain a +1 bonus to its critical threat range.',
    components: ['CM'],
    castingTime: '1 Bonus Action',
    range: 'Self',
    duration: '1 minute',
    keywords: ['Hijutsu', 'Bukijutsu'],
    effects: [
      'Ranged attacks with a thrown weapon increase its damage die by one step (d4>d6>d8>d10>d12).',
      'Gain a +1 bonus to critical threat range.',
      'At Higher Ranks: Increase chakra cost by 3 and critical threat range by 1 for each rank above C.',
    ],
  },
  {
    name: 'Falling Heaven: Calamity',
    rank: 'B',
    chakraCost: 13,
    description:
      'Spin and launch weapons in every direction, piercing and slashing enemies within range. Creatures of your choice within 40 feet must succeed a Dexterity saving throw.',
    components: ['M', 'W (Any Thrown)'],
    castingTime: '1 Action',
    range: 'Self (40-feet)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Bukijutsu'],
    effects: [
      'Creatures of your choice within 40 feet must make a Dexterity saving throw.',
      'On a failed save, take weapon damage + 5d8 slashing damage.',
      'At Higher Ranks: Increase chakra cost by 3 and damage by 2d8 for each rank above B.',
    ],
  },
  {
    name: 'Falling Heaven: Execution',
    rank: 'A',
    chakraCost: 20,
    description:
      'The perfected and secret art of the Fuma Clan. The user takes their shuriken and lines it with chakra to separate water molecules, coating the blade and launching it with enough force to momentarily cut through gravity. Make one Ranged Taijutsu Attack.',
    components: ['M', 'W (Any Thrown)'],
    castingTime: '1 Action',
    range: '90 feet Line',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Bukijutsu'],
    effects: [
      'Make one Ranged Taijutsu Attack and compare the result to each creature’s AC in range (5 feet wide, 90 feet long).',
      'On a hit, deal weapon damage + 10d12 slashing damage.',
    ],
  },
];

export const FUMA_REQUIREMENTS = {
  abilityScores: {
    Dexterity: 13,
  },
  features: ['Must train in Fuma weapon techniques'],
  restrictions: ['Must maintain and carry multiple weapons'],
};

import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const BAKUTON_FEATURES: ClanFeature[] = [
  {
    name: 'Explosive Touch',
    description:
      'When you hit with an unarmed strike, you can expend 2 chakra to add 1d8 force damage. This damage increases to 2d8 at 11th level.',
    level: 1,
  },
  {
    name: 'Detonation',
    description:
      'You can use your action to create a small explosion that deals 1d10 damage in a 10-foot radius.',
    level: 3,
  },
  {
    name: 'Master of Explosions',
    description:
      'You can increase the damage of your explosive techniques by 1d6 at 7th level and again at 11th level.',
    level: 7,
  },
];

export const BAKUTON_JUTSU: ClanJutsu[] = [
  {
    name: 'Explosive Palm',
    rank: 'D',
    chakraCost: 4,
    description: 'Channel explosive chakra into a devastating palm strike',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Melee attack dealing 3d8 force damage',
      'Target pushed back 10 feet on hit',
      'Can delay explosion up to 1 round',
      'Higher ranks: +2d8 damage per rank',
    ],
  },
  {
    name: 'Landmine Fist',
    rank: 'C',
    chakraCost: 7,
    description: 'Create an explosive trap in the ground',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: '1 hour',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Plant explosive in 5ft square',
      'Triggers when creature enters space',
      'DEX save or take 6d8 force damage',
      'Half damage on successful save',
      'Can plant multiple mines (concentration)',
      'Higher ranks: +2d8 damage, +1 mine per rank',
    ],
  },
  {
    name: 'Explosion Release: Devastation',
    rank: 'B',
    chakraCost: 12,
    description: 'Create a massive explosion centered on yourself',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (20-foot radius)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      '20ft radius explosion',
      'DEX save for all creatures in range',
      '8d10 force damage, half on save',
      'Objects take double damage',
      'Higher ranks: +2d10 damage, +5ft radius per rank',
    ],
  },
  {
    name: 'Explosion Release: Atomic Missile',
    rank: 'A',
    chakraCost: 20,
    description:
      'Propel yourself as a missile towards a target, causing a reckless explosion on impact.',
    components: ['CM'],
    castingTime: 'Full Turn Action',
    range: '120 feet',
    duration: 'Instant',
    keywords: [
      'Hijutsu',
      'Taijutsu',
      'Lightning Release',
      'Earth Release',
      'Reckless Style',
    ],
    effects: [
      'Choose a target within range (space, creature, object, or structure).',
      'You propel yourself towards the target, chakra rotating like a bullet with smoke trailing behind.',
      'All creatures, objects, and structures within 60 feet of the target (excluding you) must make a Dexterity saving throw.',
      'On a failed save, they take your unarmed damage + 10d8 force damage.',
      'On a successful save, they take half damage.',
      'All creatures within 15 feet of the target (excluding you) must make a Constitution saving throw.',
      'On a failed save, they take 6d8 force damage and all equipment they are carrying or wearing of Greater Quality or lower is destroyed.',
      'At Higher Ranks: Increase chakra cost by 3 and damage by 2d8 for each rank above A.',
    ],
  },
  {
    name: 'Explosion Release: Tower of the Sun',
    rank: 'A',
    chakraCost: 20,
    description:
      'Release chakra limiters to create a monstrous, tower-shaped explosion, sacrificing your own life.',
    components: ['CM'],
    castingTime: 'Full Turn Action',
    range: 'Self',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Lightning Release', 'Earth Release'],
    effects: [
      'Release the chakra limiters in your body, using your body as the catalyst for the explosion.',
      'You die, leaving behind no corpse.',
      'All creatures within 500 feet of you must make a Constitution saving throw.',
      'On a failed save, they take 200d4 + 100 force damage.',
      'On a successful save, they take half damage.',
      'Unattended objects and structures within range are instantly destroyed.',
      'At Higher Ranks: Increase chakra cost by 3 and damage by 25d4 + 25 for each rank above A.',
    ],
  },
];

export const BAKUTON_REQUIREMENTS = {
  abilityScores: {
    Constitution: 13,
  },
  features: ['Must possess Explosion Release kekkei genkai'],
  restrictions: ['Risk of self-damage from explosive techniques'],
};

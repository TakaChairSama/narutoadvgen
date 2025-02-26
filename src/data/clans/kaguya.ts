import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const KAGUYA_FEATURES: ClanFeature[] = [
  {
    name: 'Bone Manipulation',
    description:
      'As a bonus action, you can grow and weaponize your bones. Create bone weapons that deal 1d8 piercing damage and count as natural weapons. You can create up to two weapons at once.',
    level: 1,
  },
  {
    name: 'Bone Armor',
    description:
      'You can use your bones to create armor, gaining a +2 bonus to AC while not wearing armor.',
    level: 3,
  },
  {
    name: 'Bone Spike Eruption',
    description:
      'As an action, you can cause bone spikes to erupt from the ground in a 20-foot radius around you. Creatures in the area must make a Dexterity saving throw or take 3d6 piercing damage.',
    level: 7,
  },
];

export const KAGUYA_JUTSU: ClanJutsu[] = [
  {
    name: 'Bone Spear',
    rank: 'D',
    chakraCost: 2,
    description: 'Create a spear from your bones and throw it at an enemy.',
    components: ['HS'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Make a ranged attack that deals 1d8 piercing damage.',
      'On a hit, the target must make a Constitution saving throw or be incapacitated until the end of their next turn.',
    ],
  },
  {
    name: 'Bone Shield',
    rank: 'C',
    chakraCost: 5,
    description: 'Create a shield of bones to protect yourself.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: '1 minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Gain +2 AC for the duration.',
      'If you are hit by an attack, you can reduce the damage by 1d10.',
    ],
  },
  {
    name: 'Bone Spike Barrage',
    rank: 'B',
    chakraCost: 10,
    description: 'Launch a barrage of bone spikes at your enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (30-foot radius)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Creatures in a 30-foot radius must make a Dexterity saving throw.',
      'On a failed save, they take 4d8 piercing damage, or half on a successful save.',
    ],
  },
  {
    name: 'Bone Eruption',
    rank: 'A',
    chakraCost: 15,
    description: 'Cause bones to erupt from the ground, impaling your enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (60-foot radius)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Creatures in a 60-foot radius must make a Dexterity saving throw.',
      'On a failed save, they take 8d10 piercing damage, or half on a successful save.',
    ],
  },
];

export const KAGUYA_REQUIREMENTS = {
  abilityScores: {
    Constitution: 13,
  },
  features: ['Must possess Shikotsumyaku kekkei genkai'],
  restrictions: ['Must maintain bone density', 'Requires high calcium intake'],
};

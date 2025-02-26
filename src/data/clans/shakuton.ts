import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const SHAKUTON_FEATURES: ClanFeature[] = [
  {
    name: 'Heat Aura',
    description:
      'As a bonus action, surround yourself with intense heat. Creatures that start their turn within 5 feet of you take 1d6 fire damage. You are immune to heat and fire damage.',
    level: 1,
  },
  {
    name: 'Dehydrating Touch',
    description:
      'When you hit with a melee attack, you can spend 2 chakra to deal an additional 2d8 fire damage. The target must make a Constitution save or gain one level of exhaustion.',
    level: 3,
    chakraCost: 2,
  },
  {
    name: 'Scorching Mastery',
    description:
      "Your heat attacks ignore fire resistance. When you deal fire damage, you can choose to have it deal necrotic damage instead. The target can't regain hit points until the start of your next turn.",
    level: 7,
  },
];

export const SHAKUTON_JUTSU: ClanJutsu[] = [
  {
    name: 'Scorch Release: Scorching Murder',
    rank: 'D',
    chakraCost: 5,
    description:
      'Create 4 motes of superheated flame that can be used for ranged attacks or to enhance other Scorch Release jutsu.',
    components: ['HS', 'CM'],
    castingTime: '1 Bonus Action',
    range: 'Self (30-foot range for attacks)',
    duration: '1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Fire Release'],
    effects: [
      'Create 4 motes of superheated flame that circle around you.',
      'As a bonus action, spend a mote to make a ranged Ninjutsu attack (3d8+3 Fire damage, Constitution saving throw for burned condition on a failed save).',
      'Motes can be used to enhance other Scorch Release jutsu.',
      'Unspent motes are retained when recasting this jutsu.',
      'At Higher Ranks: Increase chakra cost by 3, number of motes by 3, and damage by 1d8+1 for each rank above D.',
    ],
  },
  {
    name: 'Scorch Release: Murderous Flame',
    rank: 'D',
    chakraCost: 4,
    description:
      'Conjure a beam of white flame in a 30-foot line, dealing fire damage and potentially inflicting the burned condition.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (30-foot line)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Fire Release', 'Clash'],
    effects: [
      'Conjure a beam of white flame (3d6+3 Fire damage, Dexterity saving throw for burned condition).',
      'Spend 2 motes from Scorching Murder to increase damage die to d10 and increase burned condition severity (2 ranks on failed save, 1 rank on successful save).',
      'At Higher Ranks: Increase chakra cost by 3 and damage by 2d6+2 for each rank above D.',
    ],
  },
  {
    name: 'Scorch Release: Blazing Murder',
    rank: 'C',
    chakraCost: 8,
    description:
      'Compress superheated flames into a sphere and release them in a 15-foot cube, inflicting the burned condition.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet (15-foot cube)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Fire Release'],
    effects: [
      'Compress superheated flames into a sphere and release them in a 15-foot cube.',
      'Creatures in the area must make a Constitution saving throw (2 ranks of burned on failed save, 1 rank on successful save).',
      'At Higher Ranks: Increase chakra cost by 3 and cube size by 5 feet for each rank above C.',
    ],
  },
  {
    name: 'Scorch Release: Painful Violence',
    rank: 'C',
    chakraCost: 9,
    description:
      'Coat your fists and feet in superheated flames for melee attacks that inflict the burned condition.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '5 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Fire Release'],
    effects: [
      'Coat your fists and feet in superheated flames.',
      'Make a melee Ninjutsu attack (4d6+4 Fire damage, inflicts burned condition).',
      'Spend 3 motes from Scorching Murder for each additional melee attack (up to 2 additional attacks).',
      'Cannot lose concentration due to damage.',
    ],
  },
  {
    name: 'Scorch Release: Hellfire Murder',
    rank: 'B',
    chakraCost: 12,
    description:
      'Manifest a massive ball of superheated flame and slam it into the ground, incinerating nearby creatures.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (30-foot radius sphere)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Fire Release'],
    effects: [
      'Manifest a massive ball of superheated flame and slam it into the ground.',
      'Creatures in the radius must make a Constitution saving throw (10d8+10 Fire damage and 2 ranks of burned on failed save, half damage on success).',
      'Spend 2 motes from Scorching Murder to make one creature unaffected and increase damage by 2d8 (up to 4 motes).',
      'At Higher Ranks: Increase chakra cost by 3 and radius by 15 feet for each rank above B.',
    ],
  },
  {
    name: 'Scorch Release: Vengeful Mirage',
    rank: 'B',
    chakraCost: 11,
    description:
      "Enhance a creature's reactionary speed and increase their unarmed damage, while creating a heat mirage that can weaken attackers.",
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Fire Release'],
    effects: [
      "Enhance a touched creature's reactionary speed.",
      "Increase the creature's unarmed damage to 4d4+4 Fire damage.",
      'Creatures making melee attacks against the affected creature must make a Wisdom saving throw (+1 rank of Weakened on failed save).',
      'No chakra cost to maintain this jutsu.',
    ],
  },
  {
    name: 'Scorch Release: Majestic Violent Murdering Hellfire Destroyer',
    rank: 'A',
    chakraCost: 22,
    description:
      'Create a massive sphere of superheated flame and launch it at a target, causing a large explosion that burns nearby creatures to dust.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Fire Release', 'Clash'],
    effects: [
      'Create a massive sphere of superheated flame and make a ranged Ninjutsu attack (8d12+8 Fire damage).',
      'Creatures within 60 feet of the target must make a Constitution saving throw (3d12+3 Fire damage and burned condition on failed save).',
      'Creatures reduced to 0 hit points by this jutsu are turned to dust.',
      'Spend 2 motes from Scorching Murder to increase damage by 2d12+2.',
    ],
  },
];

export const SHAKUTON_REQUIREMENTS = {
  abilityScores: {
    Intelligence: 13,
  },
  features: ['Must possess Scorch Release kekkei genkai'],
  restrictions: ['Vulnerable to water techniques'],
};

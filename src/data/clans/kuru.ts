import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const KURU_FEATURES: ClanFeature[] = [
  {
    name: 'Kurugan',
    description:
      'You have darkvision out to 60 feet. While in dim light or darkness, you can use a bonus action to activate enhanced vision that lets you see through magical darkness and invisible creatures within 30 feet.',
    level: 1,
  },
  {
    name: 'Shadow Step',
    description:
      'When in dim light or darkness, you can use a bonus action and spend 2 chakra to teleport up to 60 feet to another spot you can see that is also in dim light or darkness.',
    level: 3,
    chakraCost: 2,
  },
  {
    name: 'Dark Sustenance',
    description:
      'While in darkness, you regenerate 1d6 + your level hit points at the start of your turn. Additionally, you have advantage on saving throws against being blinded.',
    level: 7,
  },
];

export const KURU_JUTSU: ClanJutsu[] = [
  {
    name: 'Dark Devotion Fist',
    rank: 'D',
    chakraCost: 4,
    description:
      'Empower your fists and feet with fiery black chakra, using Wisdom for Taijutsu attacks and increasing unarmed damage to 2d6 necrotic.',
    components: ['M', 'CM'],
    castingTime: '1 Bonus Action',
    range: '5 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Taijutsu'],
    effects: [
      'Your fists and feet erupt into fiery black chakra.',
      'Use Wisdom as your Taijutsu ability score.',
      'Unarmed damage becomes 2d6 necrotic.',
    ],
  },
  {
    name: 'Dark Isolation',
    rank: 'D',
    chakraCost: 5,
    description:
      "Summon a tangible manifestation of loneliness to cloak the target, affecting allies' perception of them, requires Kurugan active.",
    components: ['HS', 'CM', 'CS'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Genjutsu', 'Fuinjutsu'],
    effects: [
      'Requires Kurugan active.',
      'Select one creature within range.',
      'Allies within 60 feet must make a Wisdom saving throw.',
      'On a failed save, allies can no longer see the target.',
      'On a critical failure, allies forget the target exists.',
      'At Higher Ranks: Increase cost by 3 and target +1 creature per rank above D.',
    ],
  },
  {
    name: 'Dark Wave',
    rank: 'C',
    chakraCost: 7,
    description:
      'A line of spiraling black chakra damages and ages targets, potentially inflicting Concussed.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (60-feet)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Genjutsu'],
    effects: [
      'A 60-foot long, 5-foot wide line of black chakra emanates from you.',
      'Creatures in range must make a Charisma saving throw.',
      'On a failed save, take 4d8 necrotic damage and gain 1 rank of Concussed.',
      'On a successful save, take half damage.',
      'At Higher Ranks: Increase damage per rank above C.',
    ],
  },
  {
    name: 'Dark Blade',
    rank: 'C',
    chakraCost: 9,
    description:
      'Create a shadowy blade of necrotic chakra, usable as a simple melee weapon with finesse, light, and thrown properties.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Your arm erupts into black shadowy chakra, forming a blade.',
      'Counts as a simple melee weapon with finesse, light, and thrown properties (range 20/60).',
      'Deals 3d8 necrotic damage.',
      'Advantage on attack rolls in dim light or darkness.',
      'Dissipates if dropped or thrown, can be resummoned as a bonus action.',
    ],
  },
  {
    name: 'Dark Rift',
    rank: 'B',
    chakraCost: 14,
    description:
      "Send a creature's consciousness into a pocket dimension, stunning their body, with damage potentially allowing new saves, and psychic damage upon return.",
    components: ['HS', 'CM', 'CS'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Hijutsu', 'Ninjutsu', 'Genjutsu', 'Fuinjutsu'],
    effects: [
      'Target must make a Charisma saving throw.',
      'On a failed save, consciousness is banished, body is stunned.',
      'Elites and Solos make saving throws at advantage.',
      'Damaged creatures may make new saving throws.',
      'Upon return, take 10d10 psychic damage.',
    ],
  },
  {
    name: 'Dark Contingency',
    rank: 'B',
    chakraCost: 14,
    description:
      'Store a B-Rank or lower jutsu to be triggered by a specific circumstance, affecting only you.',
    components: ['HS', 'CM', 'CS'],
    castingTime: '10 Minutes',
    range: 'Self',
    duration: '10 Days',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fuinjutsu'],
    effects: [
      'Choose a B-Rank or lower jutsu with a 1 action casting time that can target you.',
      'The chosen jutsu is stored in a chakra seal.',
      'The stored jutsu activates when a specific circumstance occurs.',
      'The stored jutsu only affects you.',
      'You can only have one contingency active at a time.',
    ],
  },
  {
    name: 'Dark Displacement',
    rank: 'A',
    chakraCost: 20,
    description:
      'Use Kurugan to briefly manipulate time, dealing necrotic damage and potentially reducing maximum hit points, requires Kurugan active.',
    components: ['HS', 'CM', 'CS'],
    castingTime: '1 Action',
    range: '5 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fuinjutsu'],
    effects: [
      'Requires Kurugan active.',
      'Make a melee ninjutsu attack.',
      'On a hit, deal 9d10 necrotic damage.',
      'Target must make a Charisma saving throw; on a failure, reduce max HP by half the damage dealt.',
      'Reaching 0 max HP causes the target to age to dust.',
      'Max HP can be restored with A-Rank or higher Medical Ninjutsu.',
    ],
  },
  {
    name: 'Unfettered Foresight',
    rank: 'A',
    chakraCost: 20,
    description:
      "Release Kurugan limiters for enhanced foresight, granting advantages, disadvantage to enemies, and the ability to see others' immediate future, requires Kurugan active.",
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: '1 Minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Requires Kurugan active.',
      'Cannot be surprised.',
      'Advantage on skill checks and saving throws.',
      'Enemies have disadvantage on attack rolls against you.',
      'Know the exact time and moment of minor events.',
      'As an action, touch a creature and cast Sealing Art: Divination Technique (no cost, ignoring components).',
      'With Pierce the Veil active, Kurugan features have no use limit.',
      'At the conclusion of this jutsu, you expend all uses of your Kurugan features until you complete a long rest.',
    ],
  },
];

export const KURU_REQUIREMENTS = {
  abilityScores: {
    Dexterity: 13,
  },
  features: ['Must possess Kurugan'],
  restrictions: [
    'Vulnerable to bright light',
    'Must maintain connection to darkness',
  ],
};

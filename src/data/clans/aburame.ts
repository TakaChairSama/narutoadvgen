import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const ABURAME_FEATURES: ClanFeature[] = [
  {
    name: 'Bug Host',
    description: 'Gain +1 bonus to Constitution saving throws as bugs resist harmful effects. At 7th level this applies to Wisdom saves. Bonus increases to +2 at 11th level and +3 at 18th level.',
    level: 1
  },
  {
    name: 'Chakra Sense', 
    description: 'Spend 1 minute to sense chakra within 1-mile radius. At 11th level, creatures with chakra sight cannot distinguish you from insects within 15 feet.',
    level: 1
  },
  {
    name: 'Chakra Consumption',
    description: 'When using clan jutsu, can deal chakra damage instead. Gain temporary chakra equal to half jutsu rank (D:2, C:3, B:4, A:5, S:6) for 1 minute. If target has 0 chakra, deal double damage as poison instead.',
    level: 3
  },
  {
    name: 'Insect Focus',
    description: 'Choose specialization at 7th, 11th and 15th level:\n- Beetles: +1d4 to WIS checks\n- Parasites: Infect targets for 1d6 poison/turn, stacking up to 5d6\n- Kikaichu: Ignore poison resistance and +1 damage die\n- Nano-Insects: Xd4 poison ranged attack where X is proficiency',
    level: 7
  }
];

export const ABURAME_JUTSU: ClanJutsu[] = [
  {
    name: 'Human Cocoon',
    rank: 'D',
    chakraCost: 3,
    description: 'Create protective cocoon that provides stealth and healing benefits',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Special',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Out of Combat: Waterproof sleeping bag hovering above ground',
      'Recover max possible HP/Chakra from rest dice',
      'In Combat (3 chakra): +1d8 to stealth checks for 1 minute'
    ]
  },
  {
    name: 'Insect Sphere',
    rank: 'D',
    chakraCost: 5,
    description: 'Swarm of insects restrains target and increases jutsu costs',
    components: ['HS', 'CM'],
    castingTime: '1 Action', 
    range: '30 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Target makes DEX save or is restrained',
      'Deal 4d4 poison damage at end of your turns',
      'Jutsu costs increase by +4 (+8 if requires hand seals)',
      'Higher ranks: +2d4 damage, +2 cost increase per rank'
    ]
  },
  {
    name: 'Parasitic Destruction',
    rank: 'D',
    chakraCost: 5,
    description: 'Ranged insect attack that increases jutsu costs',
    components: ['HS'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Ranged ninjutsu attack dealing 4d6 poison damage',
      'Target\'s next jutsu costs +4 chakra',
      'Higher ranks: +2d6 damage, +4 cost increase per rank'
    ]
  },
  {
    name: 'Insect Clone',
    rank: 'C',
    chakraCost: 8,
    description: 'Create clone made of insects with limited jutsu ability',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Clone'],
    effects: [
      'Clone can cast 2 D-rank Aburame jutsu',
      'Cannot maintain concentration',
      'Dissipates at 0 HP or after casting 2 jutsu',
      'A-rank: Can cast C-rank jutsu instead'
    ]
  },
  {
  name: 'Parasitic Insect Cloud',
  rank: 'B',
  chakraCost: 12,
  description: 'Your insects create a noxious gas that is exuded from your body.',
  components: ['HS'],
  castingTime: '1 Action',
  range: '60 feet (15-foot cube)',
  duration: 'Concentration, up to 1 minute',
  keywords: ['Hijutsu', 'Ninjutsu'],
  effects: [
    'Choose an area you can see within range.',
    'The gas moves to the chosen area.',
    'Creatures in the path of the gas and creatures who start their turn in the gas must make a Constitution saving throw.',
    'On a failed save, the creature is poisoned and takes 5d8 poison damage.',
    'At the beginning of a creature\'s turn where they start inside the gas, they repeat the saving throw.',
    'As a bonus action on each turn, you may move the cloud 30 feet.',
    'At higher ranks, chakra cost increases by 3 and damage increases by 2d8.'
  ]
},
  {
    name: 'Parasitic Giant Insect',
    rank: 'A',
    chakraCost: 20,
    description: 'Parasitic beetles burrow into target causing severe effects',
    components: ['HS'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Target makes CON save each turn for 1 minute',
      'Each fail: Gain rank of Envenomed, Weakened, Dazzled (10 min)',
      '5 fails: Take 10d12 poison + 12d10 chakra damage',
      '5 successes: End effect',
      'Higher ranks: +2d12 poison, +2d10 chakra per rank'
    ]
  }
];

export const ABURAME_REQUIREMENTS = {
  abilityScores: {
    'Intelligence': 13
  },
  features: ['Must be born into clan or specially inducted'],
  restrictions: ['Cannot use fire release jutsu']
};
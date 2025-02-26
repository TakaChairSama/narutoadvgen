import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const UZUMAKI_FEATURES: ClanFeature[] = [
  {
    name: 'Uzumaki Vitality',
    description:
      'Your hit point maximum increases by 1 per level. When you roll a Hit Die to regain hit points, you can reroll the die and must use the new roll. Additionally, you have advantage on death saving throws.',
    level: 1,
  },
  {
    name: 'Sealing Expert',
    description:
      'You can create a seal as an action by spending 2 chakra. Choose one effect:\n- Seal a small object into a scroll\n- Create an explosive tag (2d6 force damage)\n- Make a barrier seal (AC 15, 20 HP)\nSeals last until activated or dispelled.',
    level: 3,
    chakraCost: 2,
  },
  {
    name: 'Chakra Chains',
    description:
      "As an action, create chakra chains to bind enemies. Target must make a Strength save or be restrained and take 2d8 force damage. While chains exist, target can't use chakra. Maintaining chains requires concentration.",
    level: 7,
  },
];

export const UZUMAKI_JUTSU: ClanJutsu[] = [
  {
    name: 'Adamantine Striking Chains',
    rank: 'D',
    chakraCost: 5,
    description:
      'Manifest a chakra chain to strike a target, dealing force damage and increasing the cost of their next jutsu.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Fuinjutsu', 'Ninjutsu'],
    effects: [
      'Make a ranged Ninjutsu attack against a creature within range.',
      'On a hit, the target takes 4d6 force damage.',
      "The base cost of the target's next jutsu is increased by 5.",
      'At Higher Ranks: Increase the cost by 3, damage by 2d6, and base cost increase by 5 for each rank above D.',
    ],
  },
  {
    name: 'Uzumaki Art: Basic Seal',
    rank: 'D',
    chakraCost: 5,
    description:
      "Create a three-point seal to temporarily reduce a target's chakra.",
    components: ['CM', 'CS'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Fuinjutsu', 'Ninjutsu'],
    effects: [
      'Make a melee Ninjutsu attack.',
      'On a hit, the target takes 4d6 chakra damage and gains 2 ranks of Sealed.',
      'At Higher Ranks: Increase the cost by 3 and chakra damage by 2d6 for each rank above D. At B-Rank or higher, increase Sealed ranks by 1 (3 total). At S-Rank, increase Sealed ranks by 2 (4 total).',
    ],
  },
  {
    name: 'Adamantine Barrier',
    rank: 'C',
    chakraCost: 9,
    description:
      'Create a spherical barrier of adamantine chains to block movement and attacks.',
    components: ['HS', 'CM', 'CS'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Hijutsu', 'Fuinjutsu', 'Ninjutsu'],
    effects: [
      'Create a 15-foot radius sphere barrier at a point you can see within range.',
      "Creatures caught in the barrier's creation are pushed to one side.",
      'Hostile creatures attempting to pass through the barrier must make a Charisma saving throw. On a failure, they cannot pass this turn.',
      'Creatures outside the barrier targeting creatures inside must make a Charisma saving throw. On a failure, they must choose a new target or lose the attack/jutsu. Area of effects pass through normally.',
      'At Higher Ranks: Increase the cost by 3 and the barrier radius by 5 feet for each rank above C.',
    ],
  },
  {
    name: 'Adamantine Binding Chains',
    rank: 'C',
    chakraCost: 8,
    description: 'Manifest four chakra chains to attack or bind a target.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fuinjutsu'],
    effects: [
      'Manifest 4 chakra chains from your back.',
      'As a bonus action, choose one of the following:',
      '• Whip: Make a ranged Ninjutsu attack dealing 4d10 chakra damage.',
      '• Bind: Target must make a Strength saving throw. On a failure, their movement is halved, they cannot make hand signs (HS), gain movement bonuses, or take the Dash action.',
      'At Higher Ranks: Increase the cost by 3, damage by 2d10, and the number of Bind targets by 1 for each rank above C.',
    ],
  },
  {
    name: 'Uzumaki Art: 5-Pronged Seal',
    rank: 'C',
    chakraCost: 9,
    description:
      'Infuse a target with a seal that doubles the cost of their jutsu and hinders Chakra Control checks.',
    components: ['HS', 'CM', 'CS'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: 'Up to 1 Week',
    keywords: ['Hijutsu', 'Fuinjutsu', 'Ninjutsu'],
    effects: [
      'Make a melee Ninjutsu attack.',
      'On a hit, the target is infused with the 5-pronged seal.',
      "The base cost of the target's Ninjutsu and Genjutsu is doubled.",
      'The target automatically fails Constitution (Chakra Control) checks.',
      'At Higher Ranks: If the target has Sealed ranks, saving throws and skill checks to remove Sealed or resist Fuinjutsu are made at disadvantage.',
      'After 1 week, the jutsu ends. The target can attempt an Intelligence (Ninshou) check vs. your Ninjutsu save DC as a Full-Turn Action to end the jutsu early.',
    ],
  },
  {
    name: 'Uzumaki Break',
    rank: 'B',
    chakraCost: 14,
    description: 'Attempt to break active jutsu within range.',
    components: ['HS', 'CM', 'CS'],
    castingTime: '1 Action',
    range: '60 feet (10-foot cube)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Fuinjutsu', 'Ninjutsu'],
    effects: [
      'Select a space within range.',
      'Make a Ninjutsu ability check against a DC (13 + Jutsu Rank).',
      'On a success, you end the effects of all jutsu of the target rank or lower in range that you choose.',
    ],
  },
  {
    name: 'Uzumaki Art: River Dam Seal',
    rank: 'A',
    chakraCost: 25,
    description: 'Seal a target, hindering their chakra use and control.',
    components: ['HS', 'CM', 'CS'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: 'Permanent',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fuinjutsu'],
    effects: [
      'Target must have at least 5 ranks of Sealed.',
      'Make a melee Ninjutsu attack.',
      'On a hit, the target is afflicted with the River Dam Seal.',
      'River Dam Seal effects:',
      '• Counts as 5 ranks of Sealed (cannot gain more Sealed ranks).',
      '• Jutsu, feature, and trait chakra costs increased by 25.',
      '• -5 penalty to Ninjutsu & Genjutsu save DCs.',
      '• Can spend 1 minute to make a DC 30 Ninshou check to remove the seal.',
    ],
  },
];

export const UZUMAKI_REQUIREMENTS = {
  abilityScores: {
    Constitution: 13,
  },
  features: ['Must possess Uzumaki bloodline'],
  restrictions: ['Must study sealing techniques'],
};

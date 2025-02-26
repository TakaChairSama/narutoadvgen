import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const NARA_FEATURES: ClanFeature[] = [
  {
    name: 'Shadow Manipulation',
    description:
      'As an action, you can extend your shadow up to 30 feet. Make a ranged attack against a creature. On a hit, they are restrained until the start of your next turn. This feature costs 2 chakra to use.',
    level: 1,
    chakraCost: 2,
  },
  {
    name: 'Tactical Genius',
    description:
      'When you roll initiative, you can grant up to three allies within 60 feet advantage on their first attack roll or saving throw before the start of your next turn.',
    level: 3,
  },
  {
    name: 'Shadow Mastery',
    description:
      'Your shadow manipulation range increases to 60 feet. When you hit a creature with your shadow, you can spend 3 chakra to force them to make a Wisdom save or be controlled by you until the end of your next turn.',
    level: 7,
    chakraCost: 3,
  },
];

export const NARA_JUTSU: ClanJutsu[] = [
  {
    name: 'Shadow Possession',
    rank: 'D',
    chakraCost: 4,
    description:
      "Control a creature's shadow, restraining them and forcing them to mimic your movements.",
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Choose a creature within range.',
      'The creature must make a Dexterity saving throw.',
      'On a failed save, the creature is restrained and cannot take actions for the duration. They mimic your physical movements (but not attacks or jutsu).',
      "As an action on the affected creature's turn, they can make a Strength saving throw to end the effect.",
      'In Dim Light, range is halved. Cannot be used in complete darkness.',
      'At Higher Ranks: Cost increases by 3, range increases by 15ft, and the creature no longer mimics movements unless you choose.',
    ],
  },
  {
    name: 'Shadow Imitation',
    rank: 'D',
    chakraCost: 5,
    description:
      'Grant an ally a bonus to AC and Dexterity saving throws by attaching your shadow to them.',
    components: ['HS', 'CM'],
    castingTime: '1 Reaction, to an ally being the target of an attack',
    range: '45 feet',
    duration: '1 Round',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'You must know the Shadow Possession Jutsu.',
      'Target a willing creature within range.',
      'The target gains +2 to AC and advantage on Dexterity saving throws until the end of the current turn.',
      'At Higher Ranks: Cost increases by 3 and AC bonus increases by +1.',
    ],
  },
  {
    name: 'Shadow Imitation Field',
    rank: 'C',
    chakraCost: 6,
    description:
      'Expand your shadow to restrain multiple creatures in a radius.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '20-foot radius',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'You must know the Shadow Possession Jutsu.',
      'All creatures within the radius must make a Strength saving throw.',
      'On a failed save, the creature is restrained and cannot take actions for the duration.',
      "On an affected creature's turn, they can make a Strength saving throw to end the effect.",
      'At Higher Ranks: Cost increases by 3 and radius increases by 5ft.',
    ],
  },
  {
    name: 'Black Spider Lily',
    rank: 'B',
    chakraCost: 14,
    description:
      'A more powerful version of Shadow Possession, affecting multiple targets.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '90 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'You must know the Shadow Possession Jutsu.',
      'Choose up to 8 creatures within range.',
      'Each creature must make a Dexterity saving throw.',
      'On a failed save, the creature is restrained and affected by Shadow Possession of equal rank.',
      'At Higher Ranks: Cost increases by 3 and you can select 1 additional target.',
    ],
  },
  {
    name: 'Shadow Web Execution',
    rank: 'A',
    chakraCost: 18,
    description:
      'Deal necrotic damage and inflict exhaustion on creatures restrained by a Nara jutsu.',
    components: ['HS', 'CM'],
    castingTime: '1 Bonus Action',
    range: '90 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'You must have the Black Spider Lily Jutsu active and at least one creature restrained by a Nara jutsu.',
      'All restrained creatures must make a Constitution saving throw.',
      'On a failed save, the creature takes 12d8 necrotic damage and suffers 1 rank of exhaustion.',
      'On a successful save, the creature takes half damage and suffers no further effects.',
    ],
  },
];

export const NARA_REQUIREMENTS = {
  abilityScores: {
    Intelligence: 13,
  },
  features: ['Must be born into clan'],
  restrictions: ['Shadows limited by lighting conditions'],
};

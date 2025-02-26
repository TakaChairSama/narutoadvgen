import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const KURAMA_FEATURES: ClanFeature[] = [
  {
    name: 'Reality Bending',
    description:
      'When you cast a genjutsu, you can spend 2 chakra to make the illusion partially real. Creatures that fail their save against your genjutsu take 1d6 psychic damage at the start of their turns.',
    level: 1,
  },
  {
    name: 'Illusion Mastery',
    description:
      'You can cast one additional genjutsu per turn without expending chakra.',
    level: 3,
  },
  {
    name: 'Nightmare Weaver',
    description:
      'You can trap a target in a nightmare, causing them to take psychic damage and suffer disadvantage on their next attack.',
    level: 7,
  },
];

export const KURAMA_JUTSU: ClanJutsu[] = [
  {
    name: 'Illusionary Clone',
    rank: 'D',
    chakraCost: 2,
    description: 'Create an illusory clone of yourself to confuse enemies.',
    components: ['HS'],
    castingTime: '1 Action',
    range: 'Self',
    duration: '1 minute',
    keywords: ['Hijutsu', 'Genjutsu'],
    effects: [
      'The clone has AC 10 and 10 hit points.',
      'When a creature attacks the clone, it must make a Wisdom saving throw.',
      'On a failed save, the attacker is confused and must roll a d6 to determine their action on their next turn.',
    ],
  },
  {
    name: 'Mind Trap',
    rank: 'C',
    chakraCost: 5,
    description:
      'Trap a target in a mental illusion, causing them to take psychic damage.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Genjutsu'],
    effects: [
      'Target must make a Wisdom saving throw.',
      'On a failed save, they take 3d8 psychic damage and are incapacitated until the end of their next turn.',
    ],
  },
  {
    name: 'Nightmare',
    rank: 'B',
    chakraCost: 10,
    description: 'Trap a target in a personalized nightmare.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Genjutsu'],
    effects: [
      'Target must make a Wisdom saving throw.',
      'On a failed save, they take 4d8 psychic damage and are frightened until the end of their next turn.',
    ],
  },
  {
    name: 'Reality Shatter',
    rank: 'A',
    chakraCost: 15,
    description: 'Create a powerful illusion that can cause real damage.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Genjutsu'],
    effects: [
      'Target must make a Wisdom saving throw.',
      'On a failed save, they take 8d10 psychic damage and are stunned until the end of their next turn.',
    ],
  },
];

export const KURAMA_REQUIREMENTS = {
  abilityScores: {
    Charisma: 13,
  },
  features: ['Must possess Kurama clan bloodline'],
  restrictions: [
    'Risk of losing control of illusions',
    'Mental strain from reality bending',
  ],
};

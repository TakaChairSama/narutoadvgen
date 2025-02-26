import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const YAMANAKA_FEATURES: ClanFeature[] = [
  {
    name: 'Mind Walker',
    description:
      'You can communicate telepathically with any creature you can see within 30 feet. Additionally, you have advantage on Wisdom (Insight) checks to detect lies or read emotions.',
    level: 1,
  },
  {
    name: 'Mental Assault',
    description:
      'When you hit a creature with an attack, you can spend 2 chakra to force them to make a Wisdom save. On a failure, they take 2d8 psychic damage and are stunned until the end of your next turn.',
    level: 3,
    chakraCost: 2,
  },
  {
    name: 'Psychic Network',
    description:
      'As an action, create a telepathic network with up to 5 willing creatures within 60 feet. Members can communicate mentally and share sensory information. Network lasts 10 minutes and requires concentration.',
    level: 7,
  },
];

export const YAMANAKA_JUTSU: ClanJutsu[] = [
  {
    name: 'Mind Body Transfer',
    rank: 'D',
    chakraCost: 8,
    description:
      "Invade a target creature's mind and body, overwriting their consciousness with your own.",
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: '1 minute',
    keywords: ['Hijutsu', 'Genjutsu', 'Fuinjutsu'],
    effects: [
      'Target a sentient creature within range.',
      'The target must make a Charisma saving throw.',
      "On a failed save, you transfer your consciousness into the target's body for the duration.",
      'While possessing the body, you control it and act on its turns.',
      "Use the host's Strength, Dexterity, and Constitution stats for relevant rolls.",
      'Use your own Intelligence, Wisdom, and Charisma stats for relevant rolls.',
      'Retain your class and clan features, but cannot activate features that inflict negative conditions on the host.',
      "Gain access to the host's general and clan traits (if known).",
      "Do not gain access to the host's class or role traits/features.",
      'Retain access to your jutsu list.',
      "Do not gain access to the host's jutsu, but can end concentration on their jutsu.",
      'If the host body takes damage, they make another saving throw to end the effect.',
      'On a successful save, you fall unconscious until your next turn, then return to your body.',
      'Your body remains unconscious until you return to it.',
      'If your body takes damage, you immediately return to it.',
    ],
  },
  {
    name: 'Bestial Mind Domination',
    rank: 'D',
    chakraCost: 4,
    description:
      'Influence the mind of an animal or creature with less mental fortitude, making them friendly towards you.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: '1 minute',
    keywords: ['Hijutsu', 'Genjutsu', 'Fuinjutsu'],
    effects: [
      'Target a creature within range.',
      'The target must make an Intelligence saving throw.',
      'On a failed save, the target becomes friendly and more inclined to complete tasks for you.',
      'You can command the affected creature with verbal and non-verbal actions.',
      "You can understand the creature's emotions.",
    ],
  },
  {
    name: 'Mind Connection Technique',
    rank: 'C',
    chakraCost: 8,
    description:
      'Create a temporary telepathic link between yourself and a willing, familiar creature.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '500 feet',
    duration: '10 minutes',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fuinjutsu'],
    effects: [
      'Target a willing, familiar creature within range.',
      'You and the target can instantaneously share sensory messages.',
      'The target must be able to understand the messages.',
    ],
  },
  {
    name: 'Mind Body Augmentation',
    rank: 'C',
    chakraCost: 7,
    description:
      "Enhance the mental receptors of a willing creature, granting proficiency in a chosen ability score's saving throws or a +2 bonus if already proficient.",
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Genjutsu', 'Fuinjutsu'],
    effects: [
      'Touch a willing creature.',
      'Choose Intelligence, Wisdom, or Charisma.',
      "The target gains proficiency in the chosen ability score's saving throws, or a +2 bonus if already proficient.",
      'At Higher Ranks: For each rank above C, increase the chakra cost by 3.',
      'At A-Rank: You may select one additional creature.',
    ],
  },
  {
    name: 'Mass Mind Body Disjunction',
    rank: 'B',
    chakraCost: 14,
    description:
      'Emit a wave of psychic chakra to disrupt the connection between mind and body.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (30 feet)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Genjutsu', 'Fuinjutsu'],
    effects: [
      'Creatures of your choice within 30 feet must make a Charisma saving throw.',
      'On a failed save, take 8d6 psychic damage and become dazed until your next turn.',
      'On a successful save, take half damage.',
      'At Higher Ranks: For each rank above C, increase the chakra cost by 3 and the damage by 2d8.',
    ],
  },
  {
    name: 'Mind Puppet Switch: Cursed Seal',
    rank: 'A',
    chakraCost: 20,
    description:
      "Seal a creature's consciousness into a humanoid-shaped item, trapping them when a trigger is activated.",
    components: ['HS', 'CM', 'NT', 'CS'],
    castingTime: '1 Week',
    range: '5 feet',
    duration: 'Permanent',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fuinjutsu'],
    effects: [
      'Place a sealing jutsu on a humanoid-shaped item.',
      'Create conditions and triggers for the seal.',
      'When a creature triggers the seal, they must make a Charisma saving throw.',
      'On a failed save, their consciousness is sealed inside the item, and their body becomes incapacitated.',
      'They cannot make further saving throws while sealed.',
      'If the item is destroyed, the jutsu ends, and their consciousness attempts to return to their body.',
      'If their body is dead, their consciousness is trapped and cannot be revived.',
    ],
  },
];

export const YAMANAKA_REQUIREMENTS = {
  abilityScores: {
    Wisdom: 13,
  },
  features: ['Must possess Yamanaka clan techniques'],
  restrictions: ['Mental techniques strain the mind'],
};

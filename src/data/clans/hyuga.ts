import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const HYUGA_FEATURES: ClanFeature[] = [
  {
    name: 'Byakugan',
    description:
      'As a bonus action, activate your Byakugan for 1 minute. While active:\n- Gain 360° vision and see through solid objects within 500 feet\n- Can see chakra points and networks\n- Advantage on Perception checks\n- Cannot be surprised\nCosts 2 chakra per round to maintain. Range increases to 1000 at 11th level.',
    level: 1,
  },
  {
    name: 'Gentle Fist',
    description:
      'Your unarmed strikes can target chakra points. When you hit with an unarmed strike, you can spend 2 chakra to force the target to make a Constitution save. On a failure, they lose 1d4 chakra points and have disadvantage on the next jutsu they cast before the end of their next turn.',
    level: 3,
  },
  {
    name: 'Chakra Vision',
    description:
      "While your Byakugan is active, you can analyze a creature's chakra network as an action. Learn their current and maximum chakra points, active jutsu effects, and any kekkei genkai they possess.",
    level: 7,
  },
];

export const HYUGA_JUTSU: ClanJutsu[] = [
  {
    name: 'Palm Strike',
    rank: 'D',
    chakraCost: 5,
    description:
      'While benefiting from the Gentle Fist Stance, enhance a melee Chakra Damage attack to deal additional damage and disrupt or block chakra pathways.',
    components: ['CM', 'M'],
    castingTime: 'Special',
    range: '5 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Taijutsu'],
    effects: [
      'Must be benefiting from the Gentle Fist Stance.',
      'Cast when dealing Chakra Damage with a melee attack.',
      'Deals an additional 3d8 chakra damage.',
      'Choose to either Disrupt I or Block I their chakra pathways.',
      'If target has 0 Chakra, deal double damage as force damage.',
      'Disrupt I: Increase the cost of all jutsu they cast by +3 until the end of their next turn.',
      'Block I: Target makes a Constitution saving throw, becoming unable to mold Chakra until the start of your next turn on a failed save.',
      'At Higher Ranks: Increase cost by 3, damage by 2d8, and if Disrupt I is used, increase the cost of their next jutsu by an additional +3 for each rank above D.',
    ],
  },
  {
    name: '8-Trigrams 64 Palms',
    rank: 'C',
    chakraCost: 7,
    description:
      "With Byakugan active and Gentle Fist Stance, perform the Hyūga clan's final maneuver, dealing damage and disrupting or blocking chakra pathways to multiple targets.",
    components: ['CM', 'M'],
    castingTime: '1 Action',
    range: 'Self (5 feet)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Taijutsu'],
    effects: [
      'Must have Byakugan active and be benefiting from the Gentle Fist Stance.',
      'Make a single melee Taijutsu attack against all creatures within 5 feet.',
      'Deals [Unarmed Damage] + 3d8 Chakra damage, half as force damage.',
      'Choose to either Disrupt II or Block II their chakra pathways.',
      'If target has 0 Chakra, deal double the result as force damage.',
      'Disrupt II: Increase the cost of all jutsu they cast by +9 until the end of their next turn.',
      'Block II: Target makes a Constitution saving throw, becoming unable to mold Chakra for 2 of their turns on a failed save.',
      'At Higher Ranks: Increase cost by 3 and damage by 1d8 for each rank above C. If Disrupt II is used, increase the cost of their next jutsu by an additional +6.',
      'At B-Rank or higher: Make 2 attacks, and creatures struck with both suffer increased effects from Disrupt II and Block II.  Disrupt II becomes +12 and Block II lasts for 3 turns.',
    ],
  },
  {
    name: '8-Trigrams Spiraling Heaven Palm',
    rank: 'B',
    chakraCost: 10,
    description:
      'With Gentle Fist Stance and Byakugan active, sharpen your stance to make each strike more precise and lethal, ignoring damage reduction and increasing the cost of enemy jutsu.',
    components: ['CM', 'M'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Taijutsu'],
    effects: [
      'Must be benefiting from the Gentle Fist Stance and have the Byakugan active.',
      'Chakra damage ignores Damage Reduction.',
      'Unarmed attacks that deal chakra damage also deal equal damage as Force damage.',
      'Each successful unarmed attack that deals Chakra damage in the same turn increases the cost of the next Jutsu the affected creature casts by +2 (stacks up to 3 times per round).',
    ],
  },
  {
    name: '8-Trigrams 128 Palms',
    rank: 'A',
    chakraCost: 17,
    description:
      'With Byakugan active, Gentle Fist Stance, and 8-Trigrams 64 Palms learned, unleash a flurry of strikes, dealing damage and disrupting or blocking chakra pathways to multiple targets.',
    components: ['CM', 'M'],
    castingTime: '1 Action',
    range: 'Self (10-foot Radius)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Side Branch', 'Taijutsu'],
    effects: [
      'Must have Byakugan active, be benefiting from the Gentle Fist Stance, and have 8-Trigrams 64 Palms learned.',
      'Make three melee Taijutsu attacks against all creatures within 10 feet.',
      'Deals [Unarmed Damage] + 3d8 Chakra damage, half as force damage.',
      'Choose to either Disrupt III or Block III their chakra pathways.',
      'If target has 0 Chakra, deal double the result as force damage.',
      'Disrupt III: Increase the cost of all jutsu they cast by +15 until the end of their next turn.',
      'Block III: Target makes a Constitution saving throw, becoming unable to mold Chakra for 4 of their turns on a failed save.',
      'At Higher Ranks: Increase cost by 3 and damage by 1d8 for each rank above A.',
      'At S-Rank: Creatures struck suffer increased effects from Disrupt III (+20 cost) and Block III (5 turns).',
    ],
  },
];

export const HYUGA_REQUIREMENTS = {
  abilityScores: {
    Wisdom: 13,
    Dexterity: 13,
  },
  features: ['Must possess Byakugan'],
  restrictions: ['Must protect clan secrets', 'Branch family restrictions'],
};

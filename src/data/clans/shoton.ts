import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const SHOTON_FEATURES: ClanFeature[] = [
  {
    name: 'Crystal Touch',
    description:
      'As an action, touch an object to crystallize it. Small, nonmagical objects are automatically crystallized. You can spend 2 chakra to attempt to crystallize a 5-foot cube of material (object save negates).',
    level: 1,
    chakraCost: 2,
  },
  {
    name: 'Crystal Armor',
    description:
      'When hit by an attack, use your reaction to create crystal armor. Until the start of your next turn, you gain +3 AC and resistance to bludgeoning, piercing, and slashing damage.',
    level: 3,
  },
  {
    name: 'Crystal Mastery',
    description:
      'Your crystals become incredibly resilient. Crystal structures you create have AC 18 and twice as many hit points. You can create partially transparent crystals that provide cover but allow you to see through them.',
    level: 7,
  },
];

export const SHOTON_JUTSU: ClanJutsu[] = [
  {
    name: 'Crystal Release: Crystal Armor',
    rank: 'D',
    chakraCost: 5,
    description:
      'Create a layer of crystalline chakra across your body for damage reduction.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 Minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release'],
    effects: [
      'Gain 4 DR (damage reduction) vs all sources, except Lightning.',
      'You are counted as an Earthen Construct of your own creation.',
      'At Higher Ranks: Increase cost by 3 per rank above D. At B-Rank or higher, DR increases to 8. At A-Rank or higher, duration becomes 10 minutes. At S-Rank or higher, DR increases to 12.',
    ],
  },
  {
    name: 'Crystal Release: Crystal Needles',
    rank: 'D',
    chakraCost: 5,
    description:
      'Launch crystal rods at a creature to deal damage and reduce speed.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 Feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release'],
    effects: [
      'Make two ranged ninjutsu attacks against a creature you can see within range.',
      "On a hit, deal 3d6 Earth damage and reduce the target's speed by 10 feet until the end of their next turn.",
      'At Higher Ranks: Increase cost by 3 per rank above D and the number of attacks by 1.',
    ],
  },
  {
    name: 'Crystal Release: Crystal Wheel',
    rank: 'D',
    chakraCost: 4,
    description:
      'Manifest a spinning crystal ring around yourself to increase speed and damage attackers.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, Up to 1 Minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release'],
    effects: [
      'Increase your Movement speed by 5 x your Ninjutsu ability modifier.',
      'Ignore difficult terrain.',
      'Creatures who make an attack of opportunity against you take 10 earth damage.',
      'At Higher Ranks: Increase cost by 3 per rank above D and damage by 5.',
    ],
  },
  {
    name: 'Crystal Release: Jade Crystal Hexagonal Pillars',
    rank: 'C',
    chakraCost: 9,
    description:
      'Manifest crystalline pillars to provide benefits to allies and yourself.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (60 Foot Radius)',
    duration: 'Concentration, Up to 10 minutes',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release', 'Fuinjutsu'],
    effects: [
      'Manifest five crystalline pillars around the edge of this jutsu’s radius.',
      'You and creatures of your choice within the radius gain the following benefits:',
      '  - Earth Release jutsu of equal or lower rank can be cast without Hand Seals.',
      '  - Earth Release jutsu that require concentration reduce concentration costs by 1 (Min 1).',
      '  - Allied creatures (excluding yourself) gain 6 DR (damage reduction).',
      'At Higher Ranks: Increase cost by 3 per rank above C and DR by 2. At A-Rank or above, increase concentration cost reduction to 2 (Min 1).',
    ],
  },
  {
    name: 'Crystal Release: Crystal Prison',
    rank: 'B',
    chakraCost: 14,
    description:
      'Encapsulate a creature in a crystalline structure, potentially petrifying them.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release'],
    effects: [
      'Make a melee ninjutsu attack.',
      'On a hit, the target must make a Constitution saving throw.',
      'On a failed save, the target is infused with Crystal Release Chakra and must make a Constitution (Chakra Control) check vs your Ninjutsu Save DC at the beginning of each of their turns.',
      'Failure 1+ times: Gains one rank of the Slowed Condition.',
      'Failure 2+ times: Gains the Restrained Condition.',
      'Failure 3+ times: Becomes Incapacitated.',
      'Failure 5+ times: Becomes Petrified permanently (until recast, or A-Rank or higher medical Ninjutsu is used).',
      'If a Petrified figure is damaged or destroyed, the creature is killed with no way to be revived.',
    ],
  },
  {
    name: 'Crystal Release: Crystal Imprisonment Wave',
    rank: 'A',
    chakraCost: 25,
    description:
      'Perform Crystal Release: Crystal Prison on a massive scale, affecting all creatures in range.',
    components: ['HS', 'CM'],
    castingTime: 'Full Turn Action',
    range: 'Self (30-Foot Radius sphere)',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release'],
    effects: [
      'Each creature within a 30-foot radius must make a Dexterity saving throw.',
      'On a failed save, they fall under the effects of Crystal Release: Crystal Prison.',
    ],
  },
];

export const SHOTON_REQUIREMENTS = {
  abilityScores: {
    Intelligence: 13,
  },
  features: ['Must possess Crystal Release kekkei genkai'],
  restrictions: ['Crystal techniques require nearby minerals'],
};

import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const NAMIKAZE_FEATURES: ClanFeature[] = [
  {
    name: 'Swift Movement',
    description:
      'You can take the Dash action as a bonus action. Additionally, your jump distance is doubled, and you take no damage from falling 20 feet or less. Additionally, your movement speed is increased by 10 feet',
    level: 1,
  },
  {
    name: 'Combat Reflexes',
    description:
      'When a creature misses you with a melee attack, you can use your reaction and spend 2 chakra to move up to half your speed without provoking opportunity attacks.',
    level: 3,
    chakraCost: 2,
  },
  {
    name: 'Lightning Steps',
    description:
      'Your movement no longer provokes opportunity attacks. When you take the Dash action, you can move through enemy spaces and gain resistance to all damage until the start of your next turn.',
    level: 7,
  },
];

export const NAMIKAZE_JUTSU: ClanJutsu[] = [
  {
    name: 'Swift Release: Expedience',
    rank: 'D',
    chakraCost: 4,
    description: 'Gain a +30 bonus to movement speed for the duration.',
    components: ['HS', 'M'],
    castingTime: '1 Bonus Action',
    range: 'Self',
    duration: 'Concentration, Up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Lightning Release'],
    effects: [
      'Gain a +30 bonus to your movement speed.',
      'This bonus is applied when you cast this jutsu and as a bonus action on each of your turns.',
    ],
  },
  {
    name: 'Swift Release: Phase',
    rank: 'D',
    chakraCost: 5,
    description:
      'Gain a +4 bonus to AC against attacks and advantage on Dexterity saving throws until the start of your next turn.',
    components: ['HS', 'M'],
    castingTime: '1 Reaction',
    range: 'Self',
    duration: '1 round',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Lightning Release'],
    effects: [
      'Gain a +4 bonus to AC against attacks.',
      'Gain advantage on Dexterity saving throws.',
      'These effects last until the start of your next turn.',
    ],
  },
  {
    name: 'Swift Release: Air Shattering Strike',
    rank: 'D',
    chakraCost: 5,
    description: 'Make a melee Ninjutsu attack dealing 4d6 Wind damage.',
    components: ['CM', 'M'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Lightning Release'],
    effects: [
      'Make a melee Ninjutsu attack roll against a target within range.',
      'On a hit, the target takes 4d6 Wind damage.',
      'At Higher Ranks: For each rank above D-Rank, increase the cost by 3, the damage by 2d6, and you can make one additional attack against another creature within range.',
    ],
  },
  {
    name: 'Swift Release: Shadowless Flight',
    rank: 'C',
    chakraCost: 6,
    description:
      'Gain an additional attack and impose disadvantage on melee attacks against you until the start of your next turn.',
    components: ['HS', 'M'],
    castingTime: '1 Bonus Action',
    range: 'Self',
    duration: '1 round',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Lightning Release'],
    effects: [
      'Once per turn, you can make an additional weapon or unarmed attack when you use your action to make at least one Taijutsu, weapon, or unarmed attack.',
      'This additional attack ignores resistances.',
      'If the additional attack is made against a target that used a Taijutsu or made a weapon attack as part of its last turn, you have advantage on the attack roll.',
      'Melee attacks against you have disadvantage.',
    ],
  },
  {
    name: 'Swift Release: Flash Step',
    rank: 'B',
    chakraCost: 12,
    description:
      'Vanish and reappear in a nearby space. While vanished, vision is limited to shades of gray and 60 feet.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: '1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Lightning Release'],
    effects: [
      'At the end of each of your turns, roll a d20. On a roll of 11 or higher, you vanish from your current location.',
      'At the start of your next turn, and when the jutsu ends if you are still running, you reappear in an unoccupied space of your choice that you can see within 10 feet of the space you vanished from. If no unoccupied space is available within that range, you appear in the nearest unoccupied space chosen at random.',
      'While moving at hyper speed, you can only see shades of gray, and you can’t see anything more than 60 feet away. You can’t affect anything while in this state.',
      'You can dismiss this jutsu as an Action.',
    ],
  },
  {
    name: 'Swift Release: Speed Siphon',
    rank: 'A',
    chakraCost: 20,
    description:
      'Attempt to drain a creature of their speed, inflicting Weakened and Slowed conditions.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Concentration, Up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Wind Release', 'Lightning Release'],
    effects: [
      'Select a creature you can see within range.',
      'At the beginning of each of their turns, the target must make a Constitution saving throw.',
      'On a failed save, they gain 2 ranks of Weakened and Slowed.',
      'While the target is slowed or weakened in this way, the target cannot gain bonuses to speed by any means. The target also has disadvantage on all attack rolls, skill checks and saving throws except Constitution skill checks and saving throws.',
      'If a target tries to cast a jutsu, it must first make a Constitution saving throw. On a failed save the target fails the jutsu’s casting, and the Chakra is wasted as if they cast the jutsu.',
      'A target suffering from this speed siphoning make a constitution saving throw at the end of each of its turns. On a successful save, they remove 1 rank of the Slowed or Weakened conditions, of their choice. The target gains an additional application of the slowed or weakened condition each time it fails its saving throw.',
    ],
  },
];

export const NAMIKAZE_REQUIREMENTS = {
  abilityScores: {
    Dexterity: 13,
  },
  features: ['Must possess natural speed talent'],
  restrictions: ['Must maintain physical conditioning'],
};

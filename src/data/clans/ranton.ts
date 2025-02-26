import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const RANTON_FEATURES: ClanFeature[] = [
  {
    name: 'Storm Beam',
    description:
      'As an action, fire a beam of energy that deals 1d10 lightning damage to all creatures in a 60-foot line (Dexterity save for half damage). This feature costs 2 chakra to use.',
    level: 1,
  },
  {
    name: 'Energy Absorption',
    description:
      'When you take lightning or water damage, you can use your reaction to gain resistance to that damage type until the end of your next turn. You also gain temporary HP equal to your level.',
    level: 3,
  },
  {
    name: 'Storm Field',
    description:
      'As an action, create a 20-foot radius sphere of crackling energy centered on you. Creatures that enter or start their turn in the field take 3d6 lightning damage. Costs 4 chakra and requires concentration.',
    level: 7,
  },
];

export const RANTON_JUTSU: ClanJutsu[] = [
  {
    name: 'Storm Release: Lightning Whip',
    rank: 'D',
    chakraCost: 4,
    description:
      'Form a current of water-like lightning, striking a creature for lightning damage and potentially shocking them, or restraining them on a critical hit.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release', 'Lightning Release'],
    effects: [
      'Make a melee ninjutsu attack against a creature within range.',
      'On a hit, deal 5d6 lightning damage.',
      'The target must make a Constitution saving throw.',
      'On a failed save, the target gains the shocked condition and their movement speed is halved.',
      'On a critical hit, the creature is restrained until the beginning of your next turn.',
      'At Higher Ranks: Increase the cost by 3 and damage by 2d6 for each rank above D-Rank.',
    ],
  },
  {
    name: 'Storm Release: Laser Beam',
    rank: 'D',
    chakraCost: 5,
    description:
      'Conjure a beam of lightning and water that bends around corners, damaging creatures in a line, and potentially targeting shocked creatures with a penalty to their save.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (60 feet line)',
    duration: 'Instant',
    keywords: [
      'Hijutsu',
      'Ninjutsu',
      'Water Release',
      'Lightning Release',
      'Laser Style',
    ],
    effects: [
      'All creatures in a 60-foot line must make a Dexterity saving throw.',
      'On a failed save, take 3d8 lightning damage, or half as much on a success.',
      'If a shocked creature is within 10 feet, this jutsu can target up to two shocked creatures, ignoring its normal shape.',
      'Shocked creatures make their Dexterity save with a -1 penalty.',
      'At Higher Ranks: Increase the cost by 3 and damage by 2d8 for each rank above D-Rank.',
    ],
  },
  {
    name: 'Storm Release: Tri-Beam',
    rank: 'C',
    chakraCost: 9,
    description:
      'Form a sphere of storm chakra, firing it in a line, damaging and potentially shocking creatures, and allowing you to repeat this attack on subsequent turns.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (60-foot Line)',
    duration: 'Concentration, up to 1 minute',
    keywords: [
      'Hijutsu',
      'Ninjutsu',
      'Water Release',
      'Lightning Release',
      'Laser Style',
    ],
    effects: [
      'Make a ranged ninjutsu attack against each creature in a 30-foot line.',
      'Deal 4d10 lightning damage.',
      'Affected creatures must make a Constitution saving throw, gaining +1 rank of shocked on a failed save.',
      'For the duration, use an action on subsequent turns to fire the wave again in any direction (30-foot line).',
      'Creatures with ranks of shocked take an additional 1d10 lightning damage.',
      'At Higher Ranks: Increase the cost by 3 and damage by 2d10 for each rank above C-Rank.',
    ],
  },
  {
    name: 'Storm Release: Laser Dance',
    rank: 'B',
    chakraCost: 14,
    description:
      'Form a large sphere of storm chakra, firing up to three beams at creatures within range, potentially incapacitating them if hit by multiple beams.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '90 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: [
      'Hijutsu',
      'Ninjutsu',
      'Water Release',
      'Lightning Release',
      'Laser Style',
    ],
    effects: [
      'Send a sphere of storm chakra to a point within range.',
      'As part of casting and as an action on subsequent turns, fire up to three beams at creatures within a 30-foot radius of the sphere (ranged ninjutsu attacks).',
      'Deal 3d6 lightning damage per beam.',
      'If the same creature is hit by at least two beams, they must make a Constitution saving throw.',
      'On a failed save, the creature is incapacitated until the end of your next turn.',
      'At Higher Ranks: Increase the cost by 3 and the number of attacks by one for each rank above B-Rank.',
    ],
  },
  {
    name: 'Storm Release: Laser Circus',
    rank: 'A',
    chakraCost: 20,
    description:
      'Fire a large number of lightning beams at multiple targets, dealing damage and ignoring cover.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Instant',
    keywords: [
      'Hijutsu',
      'Ninjutsu',
      'Water Release',
      'Lightning Release',
      'Laser Style',
    ],
    effects: [
      'Fire lightning beams at up to 10 targets.',
      'Make a ranged ninjutsu attack per creature.',
      'Deal 1d12 per beam, plus your Ninjutsu ability modifier.',
      'These beams ignore cover.',
      'At Higher Ranks: No specific higher rank effects listed.',
    ],
  },
  {
    name: 'Storm Release: Raging Wave',
    rank: 'A',
    chakraCost: 20,
    description:
      'Expel a massive amount of electrified water, creating difficult terrain and pushing/damaging creatures who enter or start their turn in the area, while also potentially shocking and weakening them.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (30-foot Radius)',
    duration: 'Concentration, up to 1 minute',
    keywords: [
      'Hijutsu',
      'Ninjutsu',
      'Water Release',
      'Lightning Release',
      'Storm Style',
    ],
    effects: [
      'Create a swirling mass of electrified water in a 30-foot radius around you.',
      'This area is difficult terrain for creatures other than you.',
      'Creatures who start their turn or move into the area for the first time must make a Strength saving throw.',
      'On a failed save, take 7d10 lightning damage and are pushed 15 feet away.',
      'On a successful save, take half damage and are pushed 5 feet away.',
      'Creatures who start their turn or move into the area for the first time must also make a Constitution saving throw.',
      'On a failed Constitution save, gain 3 ranks of shocked and 1 rank of weakened.',
      'At Higher Ranks: No specific higher rank effects listed.',
    ],
  },
];

export const RANTON_REQUIREMENTS = {
  abilityScores: {
    Intelligence: 13,
  },
  features: ['Must possess Storm Release kekkei genkai'],
  restrictions: ['Requires precise chakra control'],
};

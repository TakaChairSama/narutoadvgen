import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const JITON_FEATURES: ClanFeature[] = [
  {
    name: 'Magnetic Control',
    description:
      'As a bonus action, you can manipulate metal objects within 30 feet. You can move one unattended metal object up to 30 feet in any direction. The object must weigh no more than 20 pounds.',
    level: 1,
  },
  {
    name: 'Magnetic Shield',
    description:
      'When hit by a metal weapon, you can use your reaction and spend 2 chakra to gain +4 AC against the attack. If this causes the attack to miss, you can redirect the weapon up to 30 feet in any direction.',
    level: 3,
    chakraCost: 2,
  },
  {
    name: 'Iron Sand',
    description:
      'You can control magnetic black sand. As an action, create a 15-foot cone of abrasive sand dealing 3d6 slashing damage (DEX save for half). The sand remains under your control for 1 minute.',
    level: 7,
  },
];

export const JITON_JUTSU: ClanJutsu[] = [
  {
    name: 'Magnet Release: Dust Immobilization',
    rank: 'D',
    chakraCost: 4,
    description:
      'Touch an object up to 10 pounds and affix it in place with a chakra seal of dust.  You and designated creatures can move the object normally.  If fixed in air, it can hold up to 4000 pounds.  Moving the object 20 feet or more breaks the seal.',
    components: ['HS', 'CM', 'CS'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: '1 Hour',
    keywords: [
      'Hijutsu',
      'Ninjutsu',
      'Fuinjutsu',
      'Earth Release',
      'Wind Release',
    ],
    effects: [
      'Touch an object weighing no more than 10 pounds.',
      'Create a chakra seal of dust (Gold, Iron, Sand, Salt, Gravel) to affix it in place.',
      'You and designated creatures can move the object normally.',
      'If fixed in the air, the object can hold up to 4000 pounds.',
      'A creature can use an action and succeed on a Strength (Athletics) check against your Ninjutsu save DC to move the object up to 10 feet.',
      'If the object is 20 feet or more from its original position, the seal breaks.',
      'At C-Rank: Chakra cost increases by 3, DC to move increases by 5, can carry up to 8000 pounds, duration increases to 24 hours.',
      'At A-Rank or Higher: Chakra cost increases by 3 per rank above D, DC to move increases by 10, can carry up to 20,000 pounds, duration becomes permanent until dispelled.',
    ],
  },
  {
    name: 'Magnet Release: Dust Particle Drizzle',
    rank: 'D',
    chakraCost: 5,
    description:
      'Fire a wave of dust particles (Gold, Iron, Sand, Salt, Gravel) in a 30-foot cone, dealing damage and potentially poisoning or weakening targets.',
    components: ['CM'],
    castingTime: '1 Action',
    range: 'Self (30-foot Cone)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release', 'Wind Release'],
    effects: [
      'Each creature in a 30-foot cone must make a Dexterity saving throw.',
      'On a failed save, the creature takes 2d4 piercing damage, 2d4 earth damage, and is poisoned.',
      'On a successful save, the creature takes half damage.',
      'Objects and constructs that fail the saving throw are weakened instead of poisoned.',
      'A poisoned or weakened creature repeats the saving throw at the end of each of its turns, ending the condition on a success.',
      'At Higher Ranks: Chakra cost increases by 3 per rank above D, both damage types increase by 1d4 per rank above D, cone size increases by 10 feet per rank above D.',
      'At B-Rank or Higher: All creatures that fail their saving throw become weakened, poisoned, and slowed.',
    ],
  },
  {
    name: 'Magnet Release: Sealing Dust Sphere',
    rank: 'C',
    chakraCost: 9,
    description:
      'Create a 10-foot radius sphere of dust particles (Gold, Iron, Sand, Salt, Gravel) that can restrain creatures.  The sphere can be moved as an action.',
    components: ['HS', 'CM', 'CS'],
    castingTime: '1 Action',
    range: '90 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: [
      'Hijutsu',
      'Ninjutsu',
      'Fuinjutsu',
      'Earth Release',
      'Wind Release',
    ],
    effects: [
      'Create a 10-foot radius sphere of dust at a point within range.',
      'Creatures in the sphere must make a Strength saving throw.',
      'On a successful save, the creature is ejected from the sphere.',
      'On a failed save, the creature is restrained and engulfed.',
      'A restrained creature can repeat the saving throw at the end of each of its turns.',
      'The sphere can restrain up to four Medium or smaller creatures or one Large creature.',
      'As an action, you can move the sphere up to 30 feet.',
      'When the jutsu ends, the sphere falls to the ground and extinguishes normal flames within 30 feet.',
      'At Higher Ranks: Chakra cost increases by 3 per rank above C, sphere size increases. At B-Rank: 15-foot radius, can restrain five Medium or smaller creatures, one Large creature, or one Huge creature. At A-Rank: 20-foot radius, can restrain six Medium or smaller creatures, two Large creatures, one Huge creature, or one Gargantuan creature. At S-Rank: 30-foot radius, can restrain eight Medium or smaller creatures, three Large creatures, two Huge creatures, or one Gargantuan creature.',
    ],
  },
  {
    name: 'Magnet Release: Imperial Dust Funeral',
    rank: 'B',
    chakraCost: 14,
    description:
      'Summon a wall of dust particles (Gold, Iron, Sand, Salt, Gravel) up to 250 feet long, 250 feet high, and 50 feet thick, which moves away from you each turn, damaging creatures within it.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '300 feet',
    duration: 'Concentration, up to 5 rounds',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release', 'Wind Release'],
    effects: [
      'Summon a wall of dust particles at a point within range.',
      'Creatures within the wall must make a Strength saving throw, taking 5d8 earth damage on a failed save, or half as much on a success.',
      'At the start of each of your turns, the wall moves 50 feet away from you, and any Huge or smaller creature inside must make a Strength saving throw, taking 4d8 earth damage on a failed save.',
      "The wall's height is reduced by 50 feet and damage is reduced by 1d8 at the end of each turn.",
      'Creatures inside the wall can attempt to move within it, but must succeed on a Strength (Athletics) check against your ninjutsu save DC for every foot moved.',
      'A creature that moves out of the area falls to the ground.',
    ],
  },
  {
    name: 'Magnet Release: Dust Particle World',
    rank: 'A',
    chakraCost: 20,
    description:
      'Create a 40-foot radius sphere of dust particles (Gold, Iron, Sand, Salt, Gravel) with massive, irregular spikes, making the area difficult terrain and hindering sight.  Creatures entering or starting their turn in the area take damage and can become poisoned, paralyzed, or unconscious.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '150 feet (40-foot radius sphere)',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Earth Release', 'Wind Release'],
    effects: [
      'Create a 40-foot radius sphere of dust particles at a point within range.',
      'The area is difficult terrain, and creatures attempting to see through it have disadvantage.',
      'Creatures entering or starting their turn in the area must make a Constitution saving throw.',
      'On a failed save, the creature takes 4d10 piercing damage and 4d10 earth damage and is poisoned.',
      'On a successful save, the creature takes half damage.',
      'If a poisoned creature fails this saving throw, it becomes paralyzed instead.',
      'If a paralyzed creature fails this saving throw, it becomes unconscious.',
      "A paralyzed or unconscious creature outside the jutsu's range can make a Constitution saving throw at the end of each of its turns to improve their condition.",
    ],
  },
];

export const JITON_REQUIREMENTS = {
  abilityScores: {
    Intelligence: 13,
  },
  features: ['Must possess Magnet Release kekkei genkai'],
  restrictions: ['Requires magnetic materials for techniques'],
};

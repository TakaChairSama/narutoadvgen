import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const FUTTON_FEATURES: ClanFeature[] = [
  {
    name: 'Corrosive Touch',
    description:
      'Your unarmed strikes deal an additional 1d4 acid damage. You are immune to your own acid damage.',
    level: 1,
  },
  {
    name: 'Acidic Defense',
    description:
      'When hit by a melee attack, you can use your reaction and spend 2 chakra to deal 2d6 acid damage to the attacker.',
    level: 3,
    chakraCost: 2,
  },
  {
    name: 'Caustic Body',
    description:
      'You gain resistance to acid damage. Metal weapons that hit you take a -1 penalty to damage rolls until repaired.',
    level: 7,
  },
];

export const FUTTON_JUTSU: ClanJutsu[] = [
  {
    name: 'Boil Release: Skilled Mist',
    rank: 'D',
    chakraCost: 5,
    description:
      'Expel a cloud of melting mist in a cone, damaging and corroding targets.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (20-foot Cone)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fire Release', 'Water Release'],
    effects: [
      'Creatures, objects, and structures in range must make a Dexterity saving throw.',
      'On a failed save, the target takes 4d6 acid damage and gains 1 rank of Corroded.',
      'On a successful save, the target takes half damage and no additional effect.',
      'At Higher Ranks: For each rank above D, increase chakra cost by 3 and damage by 2d6. At B-Rank, a failed save inflicts 2 ranks of Corroded.',
    ],
  },
  {
    name: 'Boil Release: Erupting Propulsion',
    rank: 'D',
    chakraCost: 5,
    description:
      'Propel yourself forward with a jet of mist, striking a target with accelerated force.',
    components: ['CM', 'M'],
    castingTime: '1 Action',
    range: 'Movement speed',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Taijutsu', 'Fire Release', 'Water Release', 'Clash'],
    effects: [
      'Select a space within your movement speed adjacent to a hostile creature.',
      'Move to that space and make a melee taijutsu attack, dealing [Unarmed Damage] + 2d8 damage on a hit.',
      'On a hit, the target must make a Constitution saving throw, being pushed 15 feet and falling prone on a failed save.',
      'At Higher Ranks: For each rank above D, increase chakra cost by 3 and damage by 2d8.',
    ],
  },
  {
    name: 'Boil Release: Corrosive Viper Fang',
    rank: 'C',
    chakraCost: 8,
    description:
      'Coil corrosive Boil Release chakra around your arm, forming a snake of steam for two melee attacks.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '5 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Taijutsu', 'Fire Release', 'Water Release'],
    effects: [
      'Make two melee taijutsu attacks, dealing [Unarmed Damage] + 2d8 acid damage.',
      'If the target has ranks of Corroded, gain a +2 bonus to attack rolls.',
      "On a hit, the target's next saving throw against a Futton clan jutsu is reduced by -2 until the end of their next turn.",
      'At Higher Ranks: For each rank above C, increase chakra cost by 3 and damage by 1d8.',
    ],
  },
  {
    name: "Boil Release: Acidic Dragon's Breath",
    rank: 'B',
    chakraCost: 13,
    description:
      'Fire a beam of corroding acid in a line, damaging and corroding targets in its path.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (30-Foot line)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fire Release', 'Water Release', 'Clash'],
    effects: [
      'Creatures in a 30-foot long, 5-foot wide line must make a Dexterity saving throw.',
      'On a failed save, the target takes 8d8 acid damage and gains 2 ranks of Corroded.',
      'On a successful save, the target takes half damage.',
    ],
  },
  {
    name: 'Boil Release: Acidic Explosion',
    rank: 'A',
    chakraCost: 18,
    description:
      'Release a massive flux of acidic steam in a sphere, damaging and corroding targets within.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (20-foot radius sphere)',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fire Release', 'Water Release'],
    effects: [
      'Creatures, objects, and structures in a 20-foot radius sphere must make a Constitution saving throw.',
      'On a failed save, the target takes 10d10 acid damage and gains 3 ranks of Corroded.',
      'On a successful save, the target takes half damage.',
      "At the beginning of each creature's turn who starts or enters the steam, they must make a Constitution saving throw, taking 5d10 acid damage and gaining 2 ranks of Corroded on a failed save.",
      'At Higher Ranks: For each rank above A, increase chakra cost by 3, initial and secondary damage by 2d10.',
    ],
  },
];

export const FUTTON_REQUIREMENTS = {
  abilityScores: {
    Constitution: 13,
  },
  features: ['Must possess Boil Release kekkei genkai'],
  restrictions: ['Must be careful with acidic abilities around allies'],
};

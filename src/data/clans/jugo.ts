import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const JUGO_FEATURES: ClanFeature[] = [
  {
    name: 'Sage Transformation',
    description:
      'As a bonus action, absorb natural energy to transform part of your body. Choose one effect:\n- Arm Cannon: Ranged attack (60/120 ft) dealing 2d8 force damage\n- Blade Arm: Melee weapon dealing 1d10 slashing damage\n- Thruster: Flying speed 30 feet\nLasts 1 minute, costs 3 chakra per round.',
    level: 1,
    chakraCost: 3,
  },
  {
    name: 'Natural Energy Absorption',
    description:
      'When you take damage, you can use your reaction to absorb natural energy. Gain temporary HP equal to your Constitution modifier + your level. If you do, you must make a DC 13 Wisdom save or enter a rage for 1 minute.',
    level: 3,
  },
  {
    name: 'Cellular Regeneration',
    description:
      'While transformed, you regenerate 5 HP at the start of each turn. Additionally, your transformations can now combine two effects from Sage Transformation.',
    level: 7,
  },
];

export const JUGO_JUTSU: ClanJutsu[] = [
  {
    name: 'Chakra Cannon',
    rank: 'D',
    chakraCost: 5,
    description: 'Fire a beam of raw chakra, dealing force damage on a hit.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '90 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Make a ranged ninjutsu attack.',
      'On a hit, deal 4d6 force damage.',
      'At Higher Ranks: Increase cost by 3 and damage by 2d6 for each rank above D.',
    ],
  },
  {
    name: 'Hellfire Jets',
    rank: 'C',
    chakraCost: 9,
    description:
      'Propel yourself with chakra jets, increasing speed, jump distance, and granting several benefits.',
    components: ['HS', 'CM'],
    castingTime: '1 Bonus action',
    range: 'Self',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Hijutsu', 'Taijutsu'],
    effects: [
      'Speed increased by 20ft.',
      'Opportunity attacks against you are made at disadvantage.',
      'Jump distance quadrupled.',
      'Move in any direction while falling; ignore the first 60 feet of fall damage.',
      'Choose to not fall until the end of your next turn when jumping.',
    ],
  },
  {
    name: 'Chakra Cannon: Overdrive',
    rank: 'C',
    chakraCost: 8,
    description:
      'Project a large beam of chakra, dealing force damage to creatures in its path.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (30-foot Line)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      '30ft range, 10ft width beam.',
      'Creatures hit must make a Dexterity saving throw.',
      'On a failed save, take 4d8 force damage; half on a successful save.',
      'At Higher Ranks: Increase cost by 3, range by 5 feet, and damage by 2d8 for each rank above C.',
    ],
  },
  {
    name: 'Warp Beam Reflection',
    rank: 'B',
    chakraCost: 13,
    description:
      'Reflect a ninjutsu attack back at the attacker by generating a powerful blast of chakra.',
    components: ['M', 'CM'],
    castingTime: '1 Reaction',
    range: 'Touch',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Use this reaction when targeted by a ninjutsu attack roll.',
      'Make a ninjutsu attack roll.',
      'If your roll is higher, you are not hit and the attack is sent back at the attacker, dealing full damage and effects.',
    ],
  },
  {
    name: 'Obliteration Warp Cannon',
    rank: 'A',
    chakraCost: 21,
    description:
      'Transform your arms into a large chakra cannon, releasing a devastating blast in a cone.',
    components: ['HS', 'CM'],
    castingTime: '1 Full Turn Action',
    range: 'Self (90-Foot Cone)',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Clash'],
    effects: [
      '90-foot cone attack.',
      'Creatures in range must make a Dexterity Saving Throw.',
      'On a failed save, take 10d10 force damage and are turned to dust at 0 hit points.',
      'On a successful save, take half damage and movement speed is halved until the end of their next turn.',
      'While concentrating: Speed is 0; cannot gain speed bonuses.',
      "Cannot end concentration on another creature's turn; only at the start of your turns.",
      'Creatures entering the area while concentrating take 5d10 force damage.',
      'Creatures starting their turn in the area while concentrating take 2d10 force damage.',
      'Each turn while concentrating, spend a Full Turn Action and choose one:',
      'Creatures in range make a Constitution Saving Throw, taking 10d10 force damage on a failed save, half on a successful one.',
      'Move the cannon 90 degrees; creatures in the new, old, and connecting areas make a Dexterity Saving Throw for half damage.',
      'Concentration cost is paid at the start of each of your turns.',
      'Advantage on clash checks against jutsu of B-Rank or lower.',
      'At Higher Ranks: Increase cost by 3, range by 10 feet, and damage by 2d10 for each rank above A.',
    ],
  },
];

export const JUGO_REQUIREMENTS = {
  abilityScores: {
    Constitution: 13,
  },
  features: ['Must possess Sage Transformation ability'],
  restrictions: [
    'Risk of berserk transformation',
    'Must manage natural energy carefully',
  ],
};

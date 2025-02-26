import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const AKIMICHI_FEATURES: ClanFeature[] = [
  {
    name: 'Big Appetite',
    description:
      'You can spend a bonus action to consume food, recovering 1d6 + your Constitution modifier in hit points. You can use this feature a number of times equal to your Constitution modifier (minimum of 1). You regain all expended uses when you finish a long rest.',
    level: 1,
  },
  {
    name: 'Chakra Enhancement',
    description:
      'When you use your Big Appetite feature, you can also gain temporary chakra equal to your Constitution modifier for 1 minute.',
    level: 3,
  },
  {
    name: 'Body Expansion',
    description:
      'As an action, you can expand your body to increase  your size by one category. While expanded:\n- Your reach  increases by 5 feet\n- You have advantage on Strength checks and  saves\n- Your unarmed strikes deal 1d8 + Strength modifier  damage\n- You can use large weapons without disadvantage\nThis  lasts for 1 minute and costs 5 chakra to maintain each round.',
    level: 7,
  },
];

export const AKIMICHI_JUTSU: ClanJutsu[] = [
  {
    name: 'Partial Expansion',
    rank: 'D',
    chakraCost: 4,
    description:
      'Temporarily expand a portion of your body to enhance unarmed attack potential.  Alternatively, this jutsu can be maintained by spending 2 Calories instead of Chakra.',
    components: ['HS', 'CM'],
    castingTime: '1 Bonus Action',
    range: 'Self',
    duration: 'Concentration, Up to 1 minute',
    keywords: ['Hijutsu', 'Taijutsu'],
    effects: [
      'Unarmed attack range increases to 10 feet.',
      'Unarmed damage die becomes a d8.',
      'At Higher Ranks:',
      '  - B-Rank: Increase damage by 1d8 (2d8 total).',
      '  - S-Rank: Increase damage by 2d8 (3d8 total).',
      '  - For each rank above D-Rank, increase Chakra cost by 3 or Calorie cost by 1.',
    ],
  },
  {
    name: 'Human Boulder',
    rank: 'C',
    chakraCost: 8,
    description: 'Transform into a massive rolling sphere',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Transform and roll up to your movement speed',
      'Creatures in path make DEX save or take 4d6 bludgeoning damage',
      'Half damage on successful save',
      'Can move through enemy spaces',
      'Target creature takes 2d12 bludgeoning damage',
    ],
  },
  {
    name: 'Super Multi-Size Technique',
    rank: 'B',
    chakraCost: 15,
    description: 'Dramatically increase your size and power',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Increase size by two categories',
      'Gain 30 temporary hit points',
      'Reach increases by 10 feet',
      'Advantage on STR checks/saves',
      'Unarmed strikes deal 2d8 + STR damage',
      'Can grapple Huge or smaller creatures',
    ],
  },
  {
    name: 'Butterfly Mode',
    rank: 'B',
    chakraCost: 0,
    description:
      'Releases chakra to form butterfly wings, granting combat bonuses and immunities but preventing Full-Body-Expansion and costing all remaining calories upon ending. Costs 6 Calories instead of chakra.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: '1 minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Cannot use Full-Body-Expansion jutsu during this duration.',
      'Immune to poison damage.',
      'Melee weapon, unarmed attacks, and Akimichi Hijutsu damage increased by Xd6 (X = Strength Modifier), applied no more than twice per turn.',
      'Other Taijutsu damage increased by half the bonus damage die.',
      'Advantage on Strength and Constitution saving throws, and Strength-based ability and skill checks.',
      'Upon ending, lose all remaining calories and cannot gain calories until a long rest.',
    ],
  },
  {
    name: 'Caloric Recharge',
    rank: 'B',
    chakraCost: 0,
    description:
      'Converts calories into healing, regaining 1d6+1 hit points per calorie spent, up to a maximum of 10 calories per rest.',
    components: ['CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Taijutsu'],
    effects: [
      'Spend any number of calories to regain hit points.',
      'Regain 1d6+1 hit points per calorie spent, up to a maximum of 10 calories.',
      'Once 10 calories have been spent, must complete a rest before recasting.',
      'At Higher Ranks: Increase the maximum number of calories spent by +3 per rank above B.',
      'At S-Rank: Use a d10 instead of a d6 for hit point recovery.',
    ],
  },
  {
    name: 'Butterfly Bullet Bomb',
    rank: 'A',
    chakraCost: 20,
    calorieCost: 'All Remaining',
    description:
      'Converts remaining calories into chakra for a devastating single attack, requiring Butterfly Mode or Full-Body-Expansion to be active.',
    components: ['HS', 'CM', 'M'],
    castingTime: '1 Action',
    range: 'Touch',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Taijutsu', 'Clash'],
    effects: [
      'Requires Butterfly Mode or Full-Body-Expansion to be active.',
      'Reduce remaining calories to 0.',
      'Make a melee Taijutsu attack.',
      'On a hit: Deal 10d10 bludgeoning damage + 1d10 additional damage per remaining calorie before casting.',
      'Creatures in a 30-foot cone behind the target must make a Dexterity saving throw.',
      'On a failed save: Take half damage, knocked back 20 feet, and become staggered.',
      'Butterfly Mode ends immediately after casting.',
      'At Higher Ranks: Increase chakra cost by 3 and initial damage by 2d10 per rank above A.',
    ],
  },
];

export const AKIMICHI_REQUIREMENTS = {
  abilityScores: {
    Constitution: 13,
  },
  features: ['Must maintain a high caloric intake'],
  restrictions: ['Cannot use jutsu that require a different chakra nature'],
};

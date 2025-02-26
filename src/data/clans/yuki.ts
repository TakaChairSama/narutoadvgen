import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const YUKI_FEATURES: ClanFeature[] = [
  {
    name: 'Ice Affinity',
    description:
      'You have resistance to cold damage and cannot be slowed by ice or snow. You can create a small amount of ice at will, and your melee attacks deal an additional 1d4 cold damage.',
    level: 1,
  },
  {
    name: 'Frost Armor',
    description:
      'When hit by an attack, use your reaction and spend 2 chakra to create ice armor. Until the start of your next turn, you gain +3 AC and attackers that hit you must make a CON save or be slowed until their next turn.',
    level: 3,
    chakraCost: 2,
  },
  {
    name: 'Ice Mirror',
    description:
      'As an action, create an ice mirror within 60 feet. You can use a bonus action to teleport between your current location and the mirror. The mirror has AC 15, 30 HP, and lasts for 1 minute.',
    level: 7,
  },
];

export const YUKI_JUTSU: ClanJutsu[] = [
  {
    name: 'Ice Daggers',
    rank: 'D',
    chakraCost: 4,
    description:
      'Create and throw ice daggers, dealing cold damage and chilling nearby creatures.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '50 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release', 'Wind Release'],
    effects: [
      'Make a ranged ninjutsu attack against a target creature, dealing 3d6 cold damage on a hit.',
      'Creatures within 10 feet of the target (excluding the caster) must make a Dexterity saving throw.',
      'On a failed save, they take 2d6 cold damage and gain 1 rank of Chilled.',
      'On a successful save, they take half damage and do not gain Chilled.',
      'At Higher Ranks: Increase the cost by 3 and the damage by 1d6 for each instance of damage per rank above D.',
    ],
  },
  {
    name: 'Ice Prison',
    rank: 'D',
    chakraCost: 5,
    description: 'Encase a target creature in ice, stunning and chilling them.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Concentration, up to 10 minutes',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release', 'Wind Release'],
    effects: [
      'Target creature makes a Dexterity saving throw.',
      'On a failed save, the creature is stunned for the duration and gains 1 rank of Chilled.',
      'A stunned creature is deafened but can see normally.',
      'The ice has an AC equal to your Ninjutsu save DC and 10 hit points. Excess damage is dealt to the creature.',
      'The target creature makes a Strength saving throw at the end of their turns to break free.',
      'At Higher Ranks: Increase the cost by 3 per rank above D.',
    ],
  },
  {
    name: 'Ice Dome of Nothingness',
    rank: 'D',
    chakraCost: 5,
    description: 'Create a dome of ice to protect yourself and nearby allies.',
    components: ['HS', 'CM'],
    castingTime: '1 Reaction',
    range: 'Self (5-foot radius)',
    duration: '1 round',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release', 'Wind Release'],
    effects: [
      'A dome of ice appears, protecting you and creatures within 5 feet.',
      'The dome absorbs damage until it shatters. Excess damage is transferred to you.',
      'The dome has an AC equal to your Ninjutsu Save DC and 25 hit points.',
      "At Higher Ranks: Increase the cost by 3 and the dome's hit points by 10 per rank above D.",
    ],
  },
  {
    name: 'Ice Needle',
    rank: 'D',
    chakraCost: 4,
    description: 'Conjure a water-based ice sword for melee attacks.',
    components: ['HS', 'CM'],
    castingTime: '1 Bonus action',
    range: 'Self',
    duration: 'Concentration, up to 1 minute',
    keywords: [
      'Hijutsu',
      'Ninjutsu',
      'Bukijutsu',
      'Water Release',
      'Wind Release',
    ],
    effects: [
      'Conjure a 5-foot long ice blade (1-foot handle) in your free hand. No chakra cost to maintain concentration.',
      'Use your action to make a melee Ninjutsu or Taijutsu attack with the ice sword.',
      'On a hit, the target takes 2d10 + Ninjutsu ability modifier cold damage.',
      'At Higher Ranks: Increase the cost by 3 per rank above D. At C-Rank, increase damage by 1d10. At B-Rank, you can make two attacks. At S-Rank, you can make three attacks.',
    ],
  },
  {
    name: 'Ten Thousand Ice Petals',
    rank: 'C',
    chakraCost: 8,
    description:
      'Launch a barrage of ice daggers in a cone, damaging and chilling creatures.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (40-foot cone)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release', 'Wind Release'],
    effects: [
      'Creatures in range must make a Dexterity saving throw.',
      'On a failed save, they take 4d8 cold damage and gain 1 rank of Chilled.',
      'On a successful save, they take half damage and do not gain Chilled.',
      'Constructs, structures, and objects take double damage.',
      'At Higher Ranks: Increase the cost by 3 and the damage by 2d8 per rank above C. At A-Rank or higher, increase Chilled ranks inflicted to +2.',
    ],
  },
  {
    name: 'Tearing Dragon, Fierce Tiger',
    rank: 'B',
    chakraCost: 14,
    description: 'Summon an ice tiger or dragon to attack a target.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '90 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release', 'Wind Release'],
    effects: [
      'Choose to summon a Tiger or Dragon, affecting range and effects.',
      'Tiger: Rushes at a target. If water is in the path, the jutsu ends. Creatures in water must make a Dexterity save or gain 2 ranks of chilled. Explodes on impact, dealing 12d4 cold damage in a 30-foot radius. Creatures in the radius must make a Dexterity save or take full damage and gain 1 rank of chilled (half damage on success).',
      'Dragon: Rushes at a target. If water is in the path, the jutsu ends. Creatures in water must make a Dexterity save or gain 2 ranks of chilled. Deals 8d6 cold damage in a 90-foot long, 10-foot wide line, pushing creatures 10 feet and inflicting 1 rank of Chilled (half damage and no chill on success).',
      'At Higher Ranks: Increase the cost by 3 per rank above B.',
    ],
  },
  {
    name: 'Twin Dragon Whirlwind',
    rank: 'B',
    chakraCost: 12,
    description:
      'Create a swirling ice storm around you, blocking ranged attacks and chilling/blinding enemies.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (20-foot radius sphere)',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release', 'Wind Release'],
    effects: [
      'You cannot be targeted by ranged attacks or effects requiring line of sight.',
      'Creatures entering the radius must make a Constitution saving throw or gain 2 ranks of Chilled.',
      'Creatures in the radius who fail the saving throw are blinded.',
      'At Higher Ranks: Increase the cost by 3 per rank above B.',
    ],
  },
  {
    name: 'Demonic Ice Mirrors',
    rank: 'A',
    chakraCost: 20,
    description:
      'Create a dome of reflective ice mirrors, allowing teleportation and multiple attacks.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (20-foot radius Sphere)',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release', 'Wind Release'],
    effects: [
      'Create a dome of ice mirrors. You meld into a mirror and can teleport to others by spending 5 feet of movement.',
      'While inside, you are nearly imperceptible. Creatures can make a Perception check at disadvantage (advantage with Chakra Sight) to find you when you attack or teleport.',
      'As an action, make three ranged ninjutsu attacks, dealing 4d8 cold damage to all creatures in the radius.',
      'As a reaction to creatures moving more than 10 feet, make two ninjutsu attacks dealing 4d6 cold damage and reducing movement speed to 0.',
      'Gain +5 AC and advantage on Dexterity saving throws while inside.',
      'Creatures can attempt a Dexterity save to leave the radius.',
      'At Higher Ranks: Increase the cost by 3 per rank above A.',
    ],
  },
];

export const YUKI_REQUIREMENTS = {
  abilityScores: {
    Wisdom: 13,
  },
  features: ['Must possess Ice Release kekkei genkai'],
  restrictions: ['Requires moisture in the air'],
};

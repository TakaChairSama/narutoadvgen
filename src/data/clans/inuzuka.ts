import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const INUZUKA_FEATURES: ClanFeature[] = [
  {
    name: 'Ninken Companion',
    description:
      'You have a loyal ninja dog companion. Your ninken shares your proficiency bonus and can understand your speech. It acts on your initiative and obeys your verbal commands. As a bonus action, you can command it to take the Attack, Dash, Disengage, Dodge, or Help action.',
    level: 1,
  },
  {
    name: 'Enhanced Senses',
    description:
      'You gain advantage on Wisdom (Perception) checks that rely on smell or hearing. You can track creatures by scent and determine their general state (wounded, afraid, etc.) by smell.',
    level: 3,
  },
  {
    name: 'Feral Fighting',
    description:
      'When you and your ninken are within 5 feet of the same target, you both have advantage on attack rolls against that creature. Additionally, your unarmed strikes deal 1d6 slashing damage.',
    level: 7,
  },
];

export const INUZUKA_JUTSU: ClanJutsu[] = [
  {
    name: 'Beast-Human Clone',
    rank: 'D',
    chakraCost: 4,
    description:
      'Your Nin-Dog transforms to look like you, but remains on all fours and cannot talk.  While within 15 feet of you, either of you can switch places with the target of an attack and make an unarmed or natural weapon attack as a reaction.',
    components: ['HS', 'CM'],
    castingTime: '1 Bonus Action',
    range: 'Self',
    duration: '10 minutes',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Nin-Dog transforms to resemble you.',
      'While within 15 feet of you, either you or your Nin-Dog can switch places with the target of an attack and make an unarmed or natural weapon attack as a reaction.',
      'If the reaction attack roll is higher than the triggering attack, the creature takes damage.',
      'At Higher Ranks: Increase the cost by 3 and the reaction distance by 10 feet for each rank above D.',
      'At B-Rank: While within 15 feet of your Nin-Dog, if you cast an Inuzuka Clan Hijutsu with a casting time of "1 Action, 1 Bonus Action", you can choose to only spend 1 action. If you do, both you and your Nin-Dog cast the jutsu simultaneously, targeting the same creature.',
    ],
  },
  {
    name: 'Four Legs Technique',
    rank: 'D',
    chakraCost: 4,
    description:
      'You gain the ability to move like a dog, ignoring difficult terrain, increasing your movement speed by 15 feet, and making your wall walking, water walking, and climbing speed equal to your movement speed. Your movement speed cannot be reduced by jutsu, features, or traits.',
    components: ['HS', 'CM'],
    castingTime: '1 Bonus Action',
    range: 'Self',
    duration: '1 Minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Ignore difficult terrain.',
      'Increase movement speed by 15 feet.',
      'Wall walking, water walking, and climbing speed become equal to movement speed.',
      'Movement speed cannot be reduced by jutsu, features, or traits (but can be by conditions).',
      'At Higher Ranks: Increase the cost by 3 and the movement speed bonus by 5 feet for each rank above D.',
    ],
  },
  {
    name: 'Tunneling Fang',
    rank: 'D',
    chakraCost: 5,
    description:
      'With Four Legs Technique active or Beast-Human Clone active on your Nin-Dog, you or your Nin-Dog spin and perform a spiraling body slam, moving up to 30 feet and making a melee Taijutsu attack.',
    components: ['CM', 'M'],
    castingTime: '1 Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Taijutsu'],
    effects: [
      'Requires Four Legs Technique to be active on you or Beast-Human Clone to be active on your Nin-Dog.',
      'Move up to 30 feet and make a melee Taijutsu attack.',
      'On a hit, deal 2d6 slashing and 2d6 bludgeoning damage.',
      'At Higher Ranks: Increase the cost by 3 and damage by 1d6 for each damage type for each rank above D.',
    ],
  },
  {
    name: 'Fang Over Fang',
    rank: 'C',
    chakraCost: 7,
    description:
      'With Four Legs Technique active on you and Beast-Human Clone active on your Nin-Dog, you and your Nin-Dog perform a spiraling body slam. As an action, you make a melee Taijutsu attack. As a bonus action, your Nin-Dog can also make a melee Taijutsu attack. If both attacks hit the same target, they must make a Strength saving throw or fall prone.',
    components: ['CM', 'M'],
    castingTime: '1 Action, 1 Bonus Action',
    range: '30 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Taijutsu', 'Clash'],
    effects: [
      'Requires Four Legs Technique to be active on you and Beast-Human Clone to be active on your Nin-Dog.',
      'As an action, you make a melee Taijutsu attack (3d6 slashing, 3d6 bludgeoning damage).',
      'As a bonus action, your Nin-Dog makes a melee Taijutsu attack (3d4 slashing, 3d4 bludgeoning damage).',
      'If both attacks hit the same creature, they must make a Strength saving throw or fall prone.',
    ],
  },
  {
    name: 'Double Headed Wolf',
    rank: 'B',
    chakraCost: 12,
    description:
      "In direct contact with your Nin-Dog, you perform the Inuzuka Clans Secret Transformation Technique, fusing into a huge, two-headed creature. You gain increased Strength, Dexterity, Constitution, and Wisdom, become a Huge creature, gain increased speed and damage resistance, temporary hit points, and access to all of your Nin-Dog's senses and abilities. You can no longer perform hand seals, but can perform Inuzuka Clan jutsu without them. Inuzuka clan jutsu cost is reduced by half and adds your Strength and Dexterity modifier to damage rolls if they don’t already.",
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 Minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Requires direct contact with your Nin-Dog.',
      'Transform into a Huge, two-headed creature.',
      'Increase Strength, Dexterity, Constitution, and Wisdom by +4.',
      'Speed increased by 30 feet.',
      'Gain resistance to bludgeoning, piercing, and slashing damage.',
      "Gain temporary hit points equal to 10 times the higher of your or your Nin-Dog's Constitution modifier.",
      'Cannot perform hand seals, but can perform Inuzuka Clan jutsu without them.',
      'Inuzuka clan jutsu cost is reduced by half and adds your Strength and Dexterity modifier to damage rolls if they don’t already.',
      'Cannot command your Nin-Dog, but gain all of its senses, traits, features, skill proficiencies, and attack actions.',
      'Cannot lose concentration on this jutsu as a result of damage.',
    ],
  },
  {
    name: 'Fang Wolf Fang',
    rank: 'B',
    chakraCost: 13,
    description:
      'With Double Headed Wolf active, you perform a devastating version of Tunneling Fang, dealing 5d6 slashing and 5d6 piercing damage.',
    components: ['HS', 'CM', 'M'],
    castingTime: '1 Action',
    range: '90 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Taijutsu'],
    effects: [
      'Requires Double Headed Wolf to be active.',
      'Make a melee Taijutsu attack.',
      'Deal 5d6 slashing and 5d6 piercing damage.',
      'At Higher Ranks: Increase the cost by 3 and damage by 2d6 for each damage type for each rank above B.',
    ],
  },
  {
    name: 'Tail Chasing Fang',
    rank: 'A',
    chakraCost: 15,
    description:
      'With Double Headed Wolf active, you curl into a ball and roll at high speed, dealing 7d8 slashing and 7d8 piercing damage to creatures in your path.',
    components: ['M'],
    castingTime: '1 Action',
    range: '120 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Taijutsu', 'Clash'],
    effects: [
      'Requires Double Headed Wolf to be active.',
      'Move up to 120 feet, changing direction as desired.',
      'Creatures in your path must make a Dexterity saving throw.',
      'On a failed save, take 7d8 slashing and 7d8 piercing damage.',
      'On a successful save, take half damage.',
    ],
  },
];

export const INUZUKA_REQUIREMENTS = {
  abilityScores: {
    Dexterity: 13,
    Wisdom: 13,
  },
  features: ['Must bond with ninken companion'],
  restrictions: ['Must care for and protect ninken'],
};

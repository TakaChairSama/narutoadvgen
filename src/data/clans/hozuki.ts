import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const HOZUKI_FEATURES: ClanFeature[] = [
  {
    name: 'Hydrification Technique',
    description:
      'As a bonus action, you can transform your body into water. While transformed, you have resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks. You can move through spaces as narrow as 1 inch without squeezing. This form lasts for 1 minute and costs 3 chakra per round to maintain.',
    level: 1,
  },
  {
    name: 'Water Gun',
    description:
      'You can compress water within your body to fire as a projectile. As an action, make a ranged attack (60/120 ft) dealing 2d6 piercing damage. The damage increases to 3d6 at 11th level.',
    level: 3,
  },
  {
    name: 'Fluid Form',
    description:
      'While using Hydrification Technique, you can flow around attacks. You can use your reaction to impose disadvantage on an attack roll against you.',
    level: 7,
  },
];

export const HOZUKI_JUTSU: ClanJutsu[] = [
  {
    name: 'Great Water Arm',
    rank: 'D',
    chakraCost: 5,
    description: 'Enlarge your arm with water for a powerful melee attack.',
    components: ['W', 'CM', 'M'],
    castingTime: '1 Action',
    range: '5 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Bukijutsu', 'Water Release'],
    effects: [
      'Make a melee Ninjutsu or Taijutsu attack with the weapon used to cast this jutsu.',
      'On a hit, deal weapon damage + 2d8 and force a Strength saving throw.',
      'On a failed save, the target is knocked back 15 feet and dazed.',
      'If under the effects of Hydrofication, increase damage die by one step.',
      'At Higher Ranks: C-Rank or higher: +1d8 damage. B-Rank or higher: +1 attack. S-Rank: Increase damage die by one step. +3 chakra cost per rank above D.',
    ],
  },
  {
    name: 'Water Escape',
    rank: 'D',
    chakraCost: 5,
    description: 'Turn into water to escape restraints.',
    components: ['CM'],
    castingTime: '1 Bonus Action',
    range: 'Self',
    duration: '1 Round',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release'],
    effects: [
      'If grappled or restrained, turn into a puddle of water, escaping the condition.',
    ],
  },
  {
    name: 'Water Blob',
    rank: 'C',
    chakraCost: 9,
    description:
      'Trap a target in a water bubble, causing suffocation and damage.',
    components: ['CM'],
    castingTime: '1 Action',
    range: '5 feet',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release'],
    effects: [
      'Target creature must make a Dexterity saving throw.',
      'On a failed save, the target is grappled and their head is submerged in a water bubble, causing suffocation.',
      'While grappled, the target must make a Constitution (Chakra Control) check to maintain concentration on jutsu.',
      'A creature begins to drown after a number of rounds equal to its Constitution modifier (minimum 1).',
      'To escape, the target can spend an action to make a Strength (Athletics) or Dexterity (Acrobatics) check contested by your Strength (Chakra Control) or Constitution (Chakra Control) check.',
      'At the start of its first turn after drowning begins and at the start of each turn it remains grappled, the target takes 4d8 + your Ninjutsu ability modifier necrotic damage.',
      'If under the effects of Hydrofication, skill checks to escape the grapple are made with a 1d4 penalty.',
    ],
  },
  {
    name: 'Water Balloon',
    rank: 'B',
    chakraCost: 10,
    description:
      'Launch oily water bubbles at a target area for concussive damage.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: '60 feet (15-foot cube)',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release'],
    effects: [
      'Launch oily water bubbles at a 15-foot cube area within range.',
      'Creatures who enter the area or start their turn within it must make a Dexterity saving throw.',
      'On a failed save, the creature takes 4d10 bludgeoning damage and is dazed. On a success, the creature takes half damage and is not dazed.',
      'As an action on your turn, you can move the target area up to 30 feet.',
      'If under the effects of Hydrofication, increase the damage die by one step (d10 to d12).',
      'At Higher Ranks: +3 chakra cost and +2d10 damage per rank above B.',
    ],
  },
  {
    name: 'Demon Wave',
    rank: 'A',
    chakraCost: 16,
    description:
      'Merge with a large body of water, increasing your size and strength.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release'],
    effects: [
      'Requires Hydrofication to be active. Ends concentration on Hydrofication and begins concentration on Demon Wave.',
      'Retain all effects of Hydrofication and add Demon Wave effects.',
      'Can only cast Water Release jutsu while this jutsu is active.',
      'Increase size to Large and Strength score by +4.',
      'As a reaction, when an ally within 10 feet is targeted by an attack, you can interpose, changing the attack target to you.',
    ],
  },
  {
    name: 'Hydrofication',
    rank: 'B',
    chakraCost: 12,
    description:
      'Turn into a sentient pool of water and oil, gaining various benefits.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Water Release'],
    effects: [
      'Turn into a mixture of water and oil, becoming a sentient pool of fluid.',
      'Can transform any part of your body into liquid, allowing you to fit through small cracks.',
      'Gain resistance to bludgeoning, piercing, and slashing damage, and immunity to fire damage.',
      'Gain vulnerability to lightning damage.',
      'Strength and Constitution scores increase by +4.',
    ],
  },
];

export const HOZUKI_REQUIREMENTS = {
  abilityScores: {
    Constitution: 13,
  },
  features: ['Must possess Hydrification ability'],
  restrictions: ['Vulnerable to lightning damage', 'Must stay hydrated'],
};

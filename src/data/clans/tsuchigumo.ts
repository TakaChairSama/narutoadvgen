import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const TSUCHIGUMO_FEATURES: ClanFeature[] = [
  {
    name: 'Third Eye',
    description: `As an Action, you can make a Wisdom (Perception) check vs the Passive Deception of one creature you can see within 120 feet of you. On a success, you become aware of the target's highest attack bonus (Weapon, Ninjutsu, Genjutsu, Taijutsu). If you fail this check, you cannot use this action against the same creature until you complete a rest of any type.`,
    level: 1,
  },
  {
    name: 'Web Weapons',
    description: `As a bonus action you can generate enough webbing to create Web weapons. All Web Weapons have the Light, Multiattack, and Lethal 1 weapon properties. When you make a Web Weapon, you create any simple melee weapon or any simple or martial ranged weapon with the Ammunition property, that does not have the Heavy weapon property. Weapons with the Ammunition property that you create do not need to roll ammunition die as you create new ammunition from your webs with each attack.`,
    level: 1,
  },
  {
    name: 'Web Traps',
    description: `You can produce spider webs by infusing your spit or sweat with chakra. You can use this web to create a variety of traps. When you do, you can create traps without additional resources required.`,
    level: 3,
  },
];

export const TSUCHIGUMO_JUTSU: ClanJutsu[] = [
  {
    name: 'Web Bind',
    rank: 'D',
    chakraCost: 5,
    description:
      'Spit sticky webbing in a cone, restraining creatures on a failed Dexterity save.',
    components: ['CM'],
    castingTime: '1 Action',
    range: 'Self (15-foot cone)',
    duration: '1 Minute',
    keywords: ['Hijutsu', 'Ninjutsu', 'Bukijutsu'],
    effects: [
      'Creatures in the target area must make a Dexterity saving throw.',
      'On a failed save, the creature is restrained for the duration.',
      'A restrained creature makes a Strength saving throw at the end of each of their turns to end this effect.',
      'At Higher Ranks: Increase the cost by 3 and the cone size by 5 feet for each rank above D.',
    ],
  },
  {
    name: 'Web Throw',
    rank: 'D',
    chakraCost: 4,
    description:
      'Spit sticky webbing at a creature, throwing them up to 30 feet away on a failed Strength save, dealing 3d6 bludgeoning damage.',
    components: ['CM'],
    castingTime: '1 Action',
    range: '60 feet',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Bukijutsu'],
    effects: [
      'Target creature must make a Strength saving throw.',
      'On a failed save, choose a space up to 30 feet away and throw the creature, dealing 3d6 bludgeoning damage.',
      'At Higher Ranks: Increase the cost by 3, throw distance by 10 feet, and damage by 2d6 for each rank above D.',
    ],
  },
  {
    name: 'Spider Web Area',
    rank: 'C',
    chakraCost: 9,
    description:
      'Spread thin webs, alerting you to creatures entering the 120-foot radius.  As an action, attempt to ensnare a creature with Web Bind.',
    components: ['HS', 'CM'],
    castingTime: '1 Minute',
    range: '120-foot radius sphere',
    duration: 'Until dispelled or ended',
    keywords: ['Hijutsu', 'Ninjutsu', 'Sensory'],
    effects: [
      'Requires knowledge of Web Bind Tsuchigumo Clan Jutsu.',
      'Creatures entering the radius alert you to their presence and location.',
      'As an action, target a creature in the radius. Ending this jutsu attempts to ensnare the target with Web Bind (Dexterity saving throw at disadvantage).',
    ],
  },
  {
    name: 'Spider Art: Terrible Split',
    rank: 'B',
    chakraCost: 14,
    description:
      'Create drill-tipped golden arrows usable with a Web Short/Longbow or Tsuchigumo clan Hijutsu. Weapon damage becomes 3d10 and ignores DR, temporary hit points, and interposing structures.',
    components: ['CM'],
    castingTime: '1 Bonus Action',
    range: 'Self',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Bukijutsu'],
    effects: [
      'Manifest a d4 stack of drill-tipped arrows.',
      'Arrows can only be used with a Web Short/Longbow or when casting a Tsuchigumo clan Hijutsu that requires one.',
      'When used as ammunition, weapon damage becomes 3d10 and ignores DR, temporary hit points, and interposing structures.',
    ],
  },
  {
    name: 'Spider Nest Summoning: Rain of Spiders',
    rank: 'A',
    chakraCost: 20,
    description:
      'Summon a large nest of spiders in a 60-foot tall, 30-foot radius cylinder. Creatures in the area are restrained, incapacitated, and poisoned on a failed save.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (60-foot cylinder)',
    duration: '1 Hour',
    keywords: ['Hijutsu', 'Ninjutsu', 'Fuinjutsu'],
    effects: [
      'Summons a Large Nest of spiders.',
      'Creatures in the target area must make a Strength saving throw, being restrained and incapacitated on a failed save.',
      'Creatures must also make a Constitution saving throw, being poisoned on a failed save.',
      'Affected creatures can make an Athletics check vs your Ninjutsu save DC to escape.',
    ],
  },
];

export const TSUCHIGUMO_REQUIREMENTS = {
  abilityScores: {
    Dexterity: 13,
    Wisdom: 13,
  },
  features: ['Must train in Tsuchigumo techniques'],
  restrictions: ['Cannot use jutsu that require a different chakra nature'],
};

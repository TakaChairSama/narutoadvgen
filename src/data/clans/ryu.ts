import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const RYU_FEATURES: ClanFeature[] = [
  {
    name: 'Dragon Scales',
    description:
      'While not wearing armor, your AC equals 13 + your Constitution modifier. You also have resistance to one damage type of your choice: fire, cold, or lightning.',
    level: 1,
  },
  {
    name: "Dragon's Breath",
    description:
      'As an action, exhale destructive energy in a 15-foot cone. Creatures in the area take 2d6 damage of your resistance type (Dexterity save for half). Costs 2 chakra to use.',
    level: 3,
    chakraCost: 2,
  },
  {
    name: 'Draconic Presence',
    description:
      'As an action, channel your draconic nature to frighten enemies. Creatures within 30 feet must make a Wisdom save or be frightened for 1 minute. They can repeat the save at the end of their turns.',
    level: 7,
  },
];

export const RYU_JUTSU: ClanJutsu[] = [
  {
    name: 'Dragon Aegis',
    rank: 'D',
    chakraCost: 4,
    description:
      'Coat your body in chakra, creating draconic scales and wings for 3d6 + 10 temporary hit points. If concentrating on Dragons Cloak, these THP are retained.',
    components: ['HS', 'CM'],
    castingTime: 'Reaction',
    range: 'Self',
    duration: '1 turn',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Gain 3d6 + 10 temporary hit points.',
      'If concentrating on Dragons Cloak, retain these temporary hit points.',
      'At Higher Ranks: Increase chakra cost by 3 and temporary hit points by 5 for each rank above D.',
    ],
  },
  {
    name: 'Dragon Aura',
    rank: 'D',
    chakraCost: 5,
    description:
      'Create a 15-foot aura of elemental chakra, dealing damage equal to your Ninjutsu modifier and hindering saving throws against similar nature jutsu.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (15 feet)',
    duration: 'Concentration, Up to 1 Minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Creatures within range take damage equal to your Ninjutsu ability modifier each turn they begin inside the aura.',
      'Creatures making a saving throw within the aura against a jutsu of the same nature roll an additional 1d6, reducing their save by the result.',
      'At Higher Ranks: Increase chakra cost by 3 and aura size by 5 feet for each rank above D. At B-Rank or higher, the additional die becomes a d8.',
    ],
  },
  {
    name: 'Dragon Vision',
    rank: 'D',
    chakraCost: 5,
    description:
      'Gain draconic vision for enhanced sight, darkvision, and chakra sight.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: '1 Hour',
    keywords: ['Hijutsu', 'Ninjutsu', 'Sensory'],
    effects: [
      'Immune to the blinded condition.',
      'Gain Darkvision.',
      '+5 bonus to Wisdom (Perception) and (Insight) checks.',
      'See the Nature Affinities of other creatures.',
      'Gain 30 feet of Chakra sight.',
    ],
  },
  {
    name: 'Dragons Strike',
    rank: 'C',
    chakraCost: 8,
    description:
      'Bathe your katana in chakra for a powerful elemental slash: Horizontal (25-foot cone, 5d8 damage) or Vertical (60-foot beam, 7d6 damage).',
    components: ['HS', 'CM', 'W (Katana)'],
    castingTime: '1 Action',
    range: 'Self (Special)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Bukijutsu'],
    effects: [
      'Choose Horizontal or Vertical Slash.',
      'Horizontal Slash: 25-foot cone, 5d8 damage, Dexterity saving throw to avoid being knocked prone.',
      'Vertical Slash: 60-foot line, 10-foot wide beam, 7d6 damage, Dexterity saving throw to avoid being knocked prone.',
      'At Higher Ranks: Increase chakra cost by 3 and Horizontal damage by 2d8 or Vertical damage by 2d6 for each rank above C.',
    ],
  },
  {
    name: 'Dragons Wrath',
    rank: 'C',
    chakraCost: 8,
    description:
      'Amplify your nature affinity for +2 AC, +30 movement speed, and +2 bonus on Strength and Dexterity saving throws. Reduced cost by 2 if Dragons Rage is active. No concentration needed if Dragons Rage is active.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, Up to 1 Minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      '+2 AC.',
      '+30 movement speed.',
      '+2 bonus on Strength and Dexterity saving throws.',
      'Reduced cost by 2 if Dragons Rage is active. No concentration needed if Dragons Rage is active.',
    ],
  },
  {
    name: 'Destructive Wave',
    rank: 'B',
    chakraCost: 14,
    description:
      'Release compressed elemental energy in all directions, dealing 10d6 damage to creatures within 30 feet. Creatures must make a Constitution saving throw to avoid being knocked prone.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self (30-foot radius)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Ninjutsu', 'Clash'],
    effects: [
      '10d6 damage to creatures within 30 feet.',
      'Constitution saving throw to avoid being knocked prone.',
      'At Higher Ranks: Increase chakra cost by 3, damage by 2d6, and area size by 10 feet for each rank above B.',
    ],
  },
  {
    name: 'Dragon Cloak',
    rank: 'B',
    chakraCost: 14,
    description:
      'Cover your body in a dragon-like chakra shell for 30 temporary hit points, increased unarmed damage, and bonuses on Constitution and Wisdom saving throws. Reduced cost by 3 for each active Dragons Rage or Dragons Wrath. No concentration needed if Dragons Wrath is active.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: 'Concentration, up to 1 Minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Gain 30 temporary hit points.',
      'Unarmed attacks deal an additional die of damage.',
      '+2 bonus on Constitution and Wisdom saving throws while THP remain.',
      'Reduced cost by 3 for each active Dragons Rage or Dragons Wrath. No concentration needed if Dragons Wrath is active.',
      'At Higher Ranks: Increase chakra cost by 3 and temporary hit points by 15 for each rank above B.',
    ],
  },
  {
    name: 'Dragons Ascension',
    rank: 'A',
    chakraCost: 20,
    description:
      'Enhance physical attributes to 24 Strength, Dexterity, and Constitution, double speed, and gain bonuses on Intelligence and Charisma saving throws. Lose the ability to cast and concentrate on non-Ryu Clan jutsu. Constitution save at the end to avoid being prone and stunned. Reduced cost by 4 for each active Dragons Rage, Dragons Wrath, or Dragons Cloak. No concentration needed on Dragons Wrath and/or Dragons Cloak.',
    components: ['HS', 'CM'],
    castingTime: '1 Action',
    range: 'Self',
    duration: '1 minute',
    keywords: ['Hijutsu', 'Ninjutsu'],
    effects: [
      'Strength, Dexterity, and Constitution become 24.',
      'Speed is doubled.',
      '+2 bonus on Intelligence and Charisma saving throws.',
      'Lose the ability to cast and concentrate on Non-Ryu Clan jutsu.',
      'Constitution save (DC 20 + 1 per round active) at the end to avoid being prone and stunned.',
      'Reduced cost by 4 for each active Dragons Rage, Dragons Wrath, or Dragons Cloak. No concentration needed on Dragons Wrath and/or Dragons Cloak.',
    ],
  },
];

export const RYU_REQUIREMENTS = {
  abilityScores: {
    Strength: 13,
    Constitution: 13,
  },
  features: ['Must possess dragon spirit connection'],
  restrictions: ['Must honor draconic traditions'],
};

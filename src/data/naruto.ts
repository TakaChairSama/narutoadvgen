import {
  ChakraNature,
  NinjaClan,
  NinjaRank,
  NinjaSpecialty,
} from '../types/naruto';

export const CHAKRA_NATURES: ChakraNature[] = [
  'Fire',
  'Water',
  'Earth',
  'Wind',
  'Lightning',
];

export const NINJA_RANKS: NinjaRank[] = [
  'Genin',
  'Chunin',
  'Jonin',
  'ANBU',
  'Kage',
];

export const NINJA_CLANS: NinjaClan[] = [
  // Noble Clans
  'Uchiha',
  'Hyuga',
  'Nara',
  'Akimichi',
  // Combat Clans
  'Aburame',
  'Inuzuka',
  'Yamanaka',
  'Uzumaki',
  // Kekkei Genkai Clans
  'Kaguya',
  'Yuki',
  'Kurama',
  'Jugo',
  // Elemental Clans
  'Bakuton',
  'Futton',
  'Jiton',
  'Ranton',
  'Shakuton',
  'Shoton',
  'Yoton',
  // Specialist Clans
  'Fuma',
  'Hatake',
  'Hebi',
  'Hoshigaki',
  'Hozuki',
  'Kuru',
  'Namikaze',
  'Ryu',
  'Sarutobi',
  'Senju',
  'Shikigami',
  'Tsuchigumo',
  // No Clan
  'None',
];

export const CR_RANGES: Record<NinjaRank, [number, number]> = {
  Genin: [1, 4],
  Chunin: [5, 8],
  Jonin: [9, 12],
  ANBU: [13, 16],
  Kage: [17, 20],
};

export const XP_BY_CR: Record<number, number> = {
 0: 5,
1: 9,
2: 12,
3: 15,
4: 21,
5: 39,
6: 60,
7: 75,
8: 87,
9: 145,
10: 156,
11: 168,
12: 186,
13: 312,
14: 321,
15: 328,
16: 351,
17: 450,
18: 500,
19: 550,
20: 600,
};

export const CLAN_ABILITIES: Record<NinjaClan, string[]> = {
  // Noble Clans
  Uchiha: ['Sharingan: Advantage on perception checks and can copy jutsu'],
  Hyuga: ['Byakugan: Can see through walls and has 360° vision'],
  Nara: ['Shadow Manipulation: Can control shadows within 30 feet'],
  Akimichi: ['Body Expansion: Can increase size and strength'],
  // Combat Clans
  Aburame: [
    'Insect Hosting: Can control chakra-eating insects',
    'Chakra Sense: Can detect chakra signatures',
  ],
  Inuzuka: [
    'Beast Mimicry: Enhanced senses and animal companion',
    'Wild Sense: Superior tracking abilities',
  ],
  Yamanaka: ['Mind Transfer: Can possess other creatures'],
  Uzumaki: ['Powerful Life Force: Increased HP and chakra reserves'],
  // Kekkei Genkai Clans
  Kaguya: [
    'Dead Bone Pulse: Can manipulate bone structure',
    'Enhanced Durability: Natural armor',
  ],
  Yuki: ['Ice Release: Can combine water and wind chakra', 'Cold Resistance'],
  Kurama: [
    'Genjutsu Mastery: Superior illusion abilities',
    'Reality Bending: Can make illusions real',
  ],
  Jugo: [
    'Natural Energy Absorption: Can absorb and use natural energy',
    'Transformation: Can alter body structure',
  ],
  // Elemental Clans
  Bakuton: ['Explosion Release: Can create and control explosions'],
  Futton: ['Boil Release: Can create and control corrosive mist'],
  Jiton: ['Magnet Release: Can control magnetic forces'],
  Ranton: ['Storm Release: Can create and control laser beams'],
  Shakuton: ['Scorch Release: Can create and control heat'],
  Shoton: ['Crystal Release: Can create and control crystals'],
  Yoton: ['Lava Release: Can create and control lava'],
  // Specialist Clans
  Fuma: [
    'Weapon Mastery: Superior throwing weapon skills',
    'Enhanced Accuracy',
  ],
  Hatake: ['White Chakra: Unique chakra nature', 'Lightning Mastery'],
  Hebi: ['Snake Techniques: Snake-based abilities', 'Enhanced Flexibility'],
  Hoshigaki: ['Shark-like Traits: Water affinity and enhanced strength'],
  Hozuki: ['Hydrification: Can turn body into water', 'Water Mastery'],
  Kuru: ['Kurugan: Eyes that see through darkness', 'Shadow Manipulation'],
  Namikaze: [
    'Enhanced Speed: Natural speed and agility',
    'Space-Time Techniques',
  ],
  Ryu: ['Dragon Techniques: Dragon-based abilities', 'Enhanced Strength'],
  Sarutobi: ['Monkey King Techniques: Enhanced agility and staff mastery'],
  Senju: ['Enhanced Life Force: Natural healing and vitality'],
  Shikigami: ['Paper Techniques: Can control and animate paper'],
  Tsuchigumo: ['Spider Techniques: Can create and control spider webs'],
  None: ['No special clan abilities'],
};

export const CLAN_TRAITS: Record<
  NinjaClan,
  {
    abilityScores: string[];
    skills: string[];
    features: string[];
    specialties: string[];
  }
> = {
  // Noble Clans
  Uchiha: {
    abilityScores: ['+2 Dexterity', '+1 Intelligence'],
    skills: ['Perception', 'Insight'],
    features: ['Sharingan', 'Fire Release Affinity'],
    specialties: ['Genjutsu', 'Fire Release'],
  },
  Hyuga: {
    abilityScores: ['+2 Wisdom', '+1 Dexterity'],
    skills: ['Perception', 'Insight'],
    features: ['Byakugan', 'Gentle Fist'],
    specialties: ['Taijutsu', 'Chakra Control'],
  },
  // Add other clans with their traits...
  None: {
    abilityScores: ['Choose any +2', 'Choose any +1'],
    skills: ['Choose any two'],
    features: ['No special features'],
    specialties: ['Any'],
  },
};

export const CLAN_REQUIREMENTS: Record<
  NinjaClan,
  {
    abilityScores?: Record<string, number>;
    skills?: string[];
    features?: string[];
    restrictions?: string[];
  }
> = {
  // Noble Clans
  Uchiha: {
    abilityScores: { Intelligence: 13 },
    features: ['Must be born into the clan'],
    restrictions: ['Cannot learn certain clan jutsu without Sharingan'],
  },
  Hyuga: {
    abilityScores: { Wisdom: 13 },
    features: ['Must be born into the clan'],
    restrictions: ['Cannot learn certain clan jutsu without Byakugan'],
  },
  // Add other clans with their requirements...
  None: {},
};

export const NINJA_SPECIALTIES: NinjaSpecialty[] = [
  'Ninjutsu',
  'Genjutsu',
  'Taijutsu',
  'Fuinjutsu',
  'Bukijutsu',
];

export const WEAPON_TYPES = [
  // Simple Melee
  {
    name: 'Kunai',
    damage: '1d4',
    type: 'Piercing',
    properties: ['Thrown (30/60)', 'Light', 'Finesse', 'Multiattack'],
    group: 'Thrown/Ammunition',
  },
  {
    name: 'Tanto',
    damage: '1d6',
    type: 'Piercing',
    properties: ['Light', 'Finesse', 'Deadly'],
    group: 'Blade',
  },
  {
    name: 'Kama',
    damage: '1d4',
    type: 'Slashing',
    properties: ['Light', 'Finesse', 'Critical', 'Tactical'],
    group: 'Blade',
  },
  // Martial Melee
  {
    name: 'Katana',
    damage: '1d8',
    type: 'Slashing',
    properties: ['Deadly', 'Finesse'],
    group: 'Blade',
  },
  {
    name: 'Naginata',
    damage: '1d10',
    type: 'Slashing',
    properties: ['Reach 1', 'Heavy', 'Trip', 'Two-Handed'],
    group: 'Polearm',
  },
  {
    name: 'Kusarigama',
    damage: '2d4',
    type: 'Slashing',
    properties: [
      'Reach 1',
      'Grapple',
      'Finesse',
      'Tactical',
      'Two-Handed',
      'Winding',
    ],
    group: 'Flail',
  },
  // Simple Ranged
  {
    name: 'Senbon',
    damage: '1d4',
    type: 'Piercing',
    properties: ['Thrown (30/60)', 'Multiattack'],
    group: 'Thrown/Ammunition',
  },
  {
    name: 'Shuriken',
    damage: '1d4',
    type: 'Slashing',
    properties: ['Thrown (30/120)', 'Multiattack'],
    group: 'Thrown/Ammunition',
  },
  // Martial Ranged
  {
    name: 'Fuma-Shuriken',
    damage: '1d8',
    type: 'Slashing',
    properties: ['Thrown (60/120)', 'Hidden', 'Returning'],
    group: 'Thrown',
  },
  {
    name: 'Chakram',
    damage: '1d6',
    type: 'Slashing',
    properties: ['Thrown (30/60)', 'Light', 'Returning'],
    group: 'Thrown',
  },
];

export const WEAPON_TRAITS = [
  {
    name: 'Chakra-Conducting',
    rarity: 'uncommon',
    description: 'Can channel chakra through the weapon',
  },
  {
    name: 'Poisoned',
    rarity: 'uncommon',
    description: 'Coated with toxic substances',
  },
  {
    name: 'Explosive-Tagged',
    rarity: 'rare',
    description: 'Attached with explosive seals',
  },
  {
    name: 'Legendary',
    rarity: 'very rare',
    description: 'A weapon of great historical significance',
  },
  {
    name: 'Ancient',
    rarity: 'very rare',
    description: 'Crafted in a long-lost era',
  },
  {
    name: 'Cursed',
    rarity: 'rare',
    description: 'Bears a malevolent enchantment',
  },
  {
    name: 'Blessed',
    rarity: 'rare',
    description: 'Imbued with positive energy',
  },
  {
    name: 'Elemental-Infused',
    rarity: 'rare',
    description: 'Attuned to a chakra nature',
  },
];

export const WEAPON_PROPERTIES = [
  'Blocking', // Increase AC by +1
  'Critical', // Improved critical hit range
  'Deadly', // Additional damage die on critical
  'Disarm', // Can attempt to disarm
  'Finesse', // Use DEX or STR for attacks
  'Flexible', // Can deal alternative damage type
  'Grapple', // Can attempt to grapple
  'Heavy', // Requires STR 16
  'Hidden', // Advantage on concealment
  'Lethal', // Extra damage vs surprised targets
  'Light', // Suitable for dual wielding
  'Loading', // Limited shots before reload
  'Multiattack', // Bonus action attack
  'Reach', // Extended melee range
  'Returning', // Returns after throwing
  'Tactical', // Bonus vs conditions
  'Trip', // Can attempt to trip
  'Two-handed', // Requires both hands
  'Versatile', // Can use one or two hands
  'Winding', // Can wind up for advantage
];

import {
  NinjaCharacter,
  NinjaClan,
  NinjaRank,
  ChakraNature,
  NinjaSpecialty,
  Weapon,
  Jutsu,
  ClanJutsu,
} from '../types/naruto';
import {
  CR_RANGES,
  XP_BY_CR,
  CLAN_ABILITIES,
  BASE_JUTSU,
  WEAPON_TYPES,
  WEAPON_TRAITS,
  WEAPON_PROPERTIES,
} from '../data/naruto';
import { getJutsu as getJutsuFromLibrary } from '../data/jutsuLibrary';

export { getJutsu } from '../data/jutsuLibrary';

// Import clan-specific data
import { ABURAME_FEATURES, ABURAME_JUTSU } from '../data/clans/aburame';
import { AKIMICHI_FEATURES, AKIMICHI_JUTSU } from '../data/clans/akimichi';
import { BAKUTON_FEATURES, BAKUTON_JUTSU } from '../data/clans/bakuton';
import { FUMA_FEATURES, FUMA_JUTSU } from '../data/clans/fuma';
import { FUTTON_FEATURES, FUTTON_JUTSU } from '../data/clans/futton';
import { HEBI_FEATURES, HEBI_JUTSU } from '../data/clans/hebi';
import { HOSHIGAKI_FEATURES, HOSHIGAKI_JUTSU } from '../data/clans/hoshigaki';
import { INUZUKA_FEATURES, INUZUKA_JUTSU } from '../data/clans/inuzuka';
import { KAGUYA_FEATURES, KAGUYA_JUTSU } from '../data/clans/kaguya';
import { NARA_FEATURES, NARA_JUTSU } from '../data/clans/nara';
import { SENJU_FEATURES, SENJU_JUTSU } from '../data/clans/senju';
import { UCHIHA_FEATURES, UCHIHA_JUTSU } from '../data/clans/uchiha';
import { YAMANAKA_FEATURES, YAMANAKA_JUTSU } from '../data/clans/yamanaka';
import { UZUMAKI_FEATURES, UZUMAKI_JUTSU } from '../data/clans/uzumaki';
import { HYUGA_FEATURES, HYUGA_JUTSU } from '../data/clans/hyuga';
import { YUKI_FEATURES, YUKI_JUTSU } from '../data/clans/yuki';
import { KURAMA_FEATURES, KURAMA_JUTSU } from '../data/clans/kurama';
import { JUGO_FEATURES, JUGO_JUTSU } from '../data/clans/jugo';
import { JITON_FEATURES, JITON_JUTSU } from '../data/clans/jiton';
import { RANTON_FEATURES, RANTON_JUTSU } from '../data/clans/ranton';
import { SHAKUTON_FEATURES, SHAKUTON_JUTSU } from '../data/clans/shakuton';
import { SHOTON_FEATURES, SHOTON_JUTSU } from '../data/clans/shoton';
import { YOTON_FEATURES, YOTON_JUTSU } from '../data/clans/yoton';
import { HATAKE_FEATURES, HATAKE_JUTSU } from '../data/clans/hatake';
import { HOZUKI_FEATURES, HOZUKI_JUTSU } from '../data/clans/hozuki';
import { KURU_FEATURES, KURU_JUTSU } from '../data/clans/kuru';
import { NAMIKAZE_FEATURES, NAMIKAZE_JUTSU } from '../data/clans/namikaze';
import { RYU_FEATURES, RYU_JUTSU } from '../data/clans/ryu';
import { SARUTOBI_FEATURES, SARUTOBI_JUTSU } from '../data/clans/sarutobi';
import { SHIKIGAMI_FEATURES, SHIKIGAMI_JUTSU } from '../data/clans/shikigami';
import {
  TSUCHIGUMO_FEATURES,
  TSUCHIGUMO_JUTSU,
} from '../data/clans/tsuchigumo';

// Map to store clan data
const CLAN_DATA = new Map<
  NinjaClan,
  {
    features: any[];
    jutsu: ClanJutsu[];
  }
>();

// Initialize with available clan data
CLAN_DATA.set('Aburame', {
  features: ABURAME_FEATURES,
  jutsu: ABURAME_JUTSU,
});

CLAN_DATA.set('Akimichi', {
  features: AKIMICHI_FEATURES,
  jutsu: AKIMICHI_JUTSU,
});

CLAN_DATA.set('Bakuton', {
  features: BAKUTON_FEATURES,
  jutsu: BAKUTON_JUTSU,
});

CLAN_DATA.set('Fuma', {
  features: FUMA_FEATURES,
  jutsu: FUMA_JUTSU,
});

CLAN_DATA.set('Futton', {
  features: FUTTON_FEATURES,
  jutsu: FUTTON_JUTSU,
});

CLAN_DATA.set('Hebi', {
  features: HEBI_FEATURES,
  jutsu: HEBI_JUTSU,
});

CLAN_DATA.set('Hoshigaki', {
  features: HOSHIGAKI_FEATURES,
  jutsu: HOSHIGAKI_JUTSU,
});

CLAN_DATA.set('Inuzuka', {
  features: INUZUKA_FEATURES,
  jutsu: INUZUKA_JUTSU,
});

CLAN_DATA.set('Kaguya', {
  features: KAGUYA_FEATURES,
  jutsu: KAGUYA_JUTSU,
});

CLAN_DATA.set('Nara', {
  features: NARA_FEATURES,
  jutsu: NARA_JUTSU,
});

CLAN_DATA.set('Senju', {
  features: SENJU_FEATURES,
  jutsu: SENJU_JUTSU,
});

CLAN_DATA.set('Uchiha', {
  features: UCHIHA_FEATURES,
  jutsu: UCHIHA_JUTSU,
});

CLAN_DATA.set('Yamanaka', {
  features: YAMANAKA_FEATURES,
  jutsu: YAMANAKA_JUTSU,
});

CLAN_DATA.set('Uzumaki', {
  features: UZUMAKI_FEATURES,
  jutsu: UZUMAKI_JUTSU,
});

CLAN_DATA.set('Hyuga', {
  features: HYUGA_FEATURES,
  jutsu: HYUGA_JUTSU,
});

CLAN_DATA.set('Yuki', {
  features: YUKI_FEATURES,
  jutsu: YUKI_JUTSU,
});

CLAN_DATA.set('Kurama', {
  features: KURAMA_FEATURES,
  jutsu: KURAMA_JUTSU,
});

CLAN_DATA.set('Jugo', {
  features: JUGO_FEATURES,
  jutsu: JUGO_JUTSU,
});

CLAN_DATA.set('Jiton', {
  features: JITON_FEATURES,
  jutsu: JITON_JUTSU,
});

CLAN_DATA.set('Ranton', {
  features: RANTON_FEATURES,
  jutsu: RANTON_JUTSU,
});

CLAN_DATA.set('Shakuton', {
  features: SHAKUTON_FEATURES,
  jutsu: SHAKUTON_JUTSU,
});

CLAN_DATA.set('Shoton', {
  features: SHOTON_FEATURES,
  jutsu: SHOTON_JUTSU,
});

CLAN_DATA.set('Yoton', {
  features: YOTON_FEATURES,
  jutsu: YOTON_JUTSU,
});

CLAN_DATA.set('Hatake', {
  features: HATAKE_FEATURES,
  jutsu: HATAKE_JUTSU,
});

CLAN_DATA.set('Hozuki', {
  features: HOZUKI_FEATURES,
  jutsu: HOZUKI_JUTSU,
});

CLAN_DATA.set('Kuru', {
  features: KURU_FEATURES,
  jutsu: KURU_JUTSU,
});

CLAN_DATA.set('Namikaze', {
  features: NAMIKAZE_FEATURES,
  jutsu: NAMIKAZE_JUTSU,
});

CLAN_DATA.set('Ryu', {
  features: RYU_FEATURES,
  jutsu: RYU_JUTSU,
});

CLAN_DATA.set('Sarutobi', {
  features: SARUTOBI_FEATURES,
  jutsu: SARUTOBI_JUTSU,
});

CLAN_DATA.set('Shikigami', {
  features: SHIKIGAMI_FEATURES,
  jutsu: SHIKIGAMI_JUTSU,
});

CLAN_DATA.set('Tsuchigumo', {
  features: TSUCHIGUMO_FEATURES,
  jutsu: TSUCHIGUMO_JUTSU,
});

export function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function generateStats(cr: number, specialty: NinjaSpecialty): Record<string, number> {
    // Determine the primary stat based on specialty using if statements
    let primaryStatKey: string;
    if (specialty === 'Ninjutsu') {
        primaryStatKey = 'int';
    } else if (specialty === 'Bukijutsu') {
        primaryStatKey = 'dex';
    } else if (specialty === 'Genjutsu') {
        primaryStatKey = 'wis';
    } else if (specialty === 'Taijutsu') {
        primaryStatKey = 'str';
    } else if (specialty === 'Fuinjutsu') {
        primaryStatKey = 'int';
    } else {
        throw new Error('Invalid specialty'); // Handle invalid specialty
    }

    // Roll stats for all attributes
    const rollDice = (sides: number): number => {
        return Math.floor(Math.random() * sides) + 1;
    };

    const rolledValues = (() => {
        const values: number[] = [];
        while (values.length < 6) {
            const rolls = Array(4)
                .fill(0)
                .map(() => rollDice(6));
            const sum = rolls
                .sort((a, b) => b - a)
                .slice(0, 3)
                .reduce((a, b) => a + b, 0);
            const value = Math.max(sum, 8);

            if (!values.includes(value)) {
                values.push(value);
            }
        }
        return values;
    })();

    // Create an array of stat names
    const statNames = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

    // Pair rolled values with stat names
    const pairedStats = statNames.map((stat, index) => ({ stat, value: rolledValues[index] }));

    // Sort paired stats from highest to lowest
    pairedStats.sort((a, b) => b.value - a.value);

    // Assign the highest value to the primary stat
    const finalStats: Record<string, number> = {};
    const primaryStatValue = pairedStats[0].value;
    finalStats[primaryStatKey] = primaryStatValue;

    // Shuffle the remaining values (excluding the primary stat's value)
    const remainingStats = pairedStats.filter(({ value }) => value !== primaryStatValue);
    for (let i = remainingStats.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingStats[i], remainingStats[j]] = [remainingStats[j], remainingStats[i]]; // Swap
    }

    // Assign the remaining values to the other stats in the shuffled order
    for (const { stat, value } of remainingStats) {
        finalStats[stat] = value;
    }

    // Add random stat bonuses based on CR/2 (rounded up) only to the primary stat
    const bonusPoints = Math.ceil(cr / 2);
    finalStats[primaryStatKey] += bonusPoints;

        // Ensure all stats except the primary stat have values
    for (const stat of statNames) {
        if (stat !== primaryStatKey && !(stat in finalStats)) {
            let newValue;
            do {
                const rolls = Array.from({ length: 4 }, () => rollDice(6));
                const sum = rolls.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0);
                newValue = Math.max(sum, 8);
            } while (Object.values(finalStats).includes(newValue)); // Ensure it's unique

            finalStats[stat] = newValue; // Assign the new value
        }
    }

    return finalStats;
}

export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function calculateMaxHp(cr: number, conMod: number): number {
  const baseHP = Array(cr)
    .fill(0)
    .map(() => rollDice(12))
    .reduce((a, b) => a + b, 0);
  return baseHP + conMod * cr + 10 + conMod; // Adjust as per your HP calculation logic
}

export function calculateMaxChakra(cr: number, conMod: number): number {
  const baseChakra = Array(cr)
    .fill(0)
    .map(() => rollDice(12))
    .reduce((a, b) => a + b, 0);
  return baseChakra + conMod * cr + 10 + conMod; // Adjust as per your Chakra calculation logic
}

export function generateWeapon(cr: number): Weapon {
  // Select base weapon
  const baseWeapon =
    WEAPON_TYPES[Math.floor(Math.random() * WEAPON_TYPES.length)];

  // Determine rarity based on CR
  let rarity: string;
  if (cr <= 5) {
    rarity = 'common'; // CR 1-5: Common traits only
  } else if (cr <= 10) {
    rarity = 'uncommon'; // CR 6-10: Common and Uncommon traits
  } else if (cr <= 15) {
    rarity = 'rare'; // CR 11-15: Common, Uncommon, and Rare traits
  } else {
    rarity = 'very rare'; // CR 16-20: All traits available
  }

  // 30% chance for special traits
  const hasSpecialTraits = Math.random() < 0.3;

  let traits: string[] = [];
  if (hasSpecialTraits) {
    const numTraits = rollDice(2);
    const availableTraits = WEAPON_TRAITS.filter((trait) => {
      // Filter traits based on rarity
      return (
        (rarity === 'common' && trait.rarity === 'common') ||
        (rarity === 'uncommon' &&
          (trait.rarity === 'common' || trait.rarity === 'uncommon')) ||
        (rarity === 'rare' &&
          (trait.rarity === 'common' ||
            trait.rarity === 'uncommon' ||
            trait.rarity === 'rare')) ||
        rarity === 'very rare'
      );
    });

    traits = Array(numTraits)
      .fill(0)
      .map(() => {
        const trait =
          availableTraits[Math.floor(Math.random() * availableTraits.length)];
        return trait.name;
      })
      .filter((v, i, a) => a.indexOf(v) === i);
  }

  // Assign bonuses based on traits
  let damageBonus = 0;
  let additionalProperties = [];

  traits.forEach((trait) => {
    if (trait === 'Legendary') {
      damageBonus += 3; // +3 damage for legendary weapons
      additionalProperties.push('Critical'); // Add critical property
    } else if (trait === 'Ancient') {
      damageBonus += 1; // +1 damage for ancient weapons
    } else if (trait === 'Blessed') {
      additionalProperties.push('Healing (1/4 Damage)'); // Add healing property
    } else if (trait === 'Cursed') {
      additionalProperties.push('Disadvantage on Saving Throws, Ignores Resistences'); // Add curse effect
    }
  });

  const prefixes = [
    'Mystic',
    'Sacred',
    'Honored',
    'Masterwork',
    'Elite',
    'Shadow',
    'Crimson',
    'Azure',
    'Silent',
    'Iron',
    'Storm',
    'Ember',
    'Whisper',
    'Serpent',
    'Phantom',
    'Celestial',
    'Lunar',
    'Solar',
    'Starlight',
    'Eclipse',
    'Dragon',
    'Phoenix',
    'Kraken',
    'Gryphon',
    'Chimera',
    'Void',
    'Echo',
    'Rune',
    'Apex',
    'Zenith',
    'Nova',
    'Quasar',
    'Comet',
    'Aurora',
    'Tempest',
    'Glacier',
    'Inferno',
    'Monsoon',
    'Tundra',
    'Savanna',
    'Guardian',
    'Sentinel',
    'Warrior',
    'Sage',
    'Seeker',
    'Hunter',
    'Healer',
    'Artisan',
    'Scholar',
    'Messenger',
    'Wanderer',
    'Nomad',
    'Outcast',
    'Rebel',
    'Visionary',
    'Oracle',
    'Enigma',
    'Legend',
    'Myth',
    'Destiny',
  ];

  const suffixes = [
    'of the Storm',
    'of the Flame',
    'of the Mountain',
    'of the River',
    'of the Forest',
    'of the Sky',
    'of the Abyss',
    'of the Void',
    'of the Shadow',
    'of the Light',
    'of the Earth',
    'of the Wind',
    'of the Thunder',
    'of the Ice',
    'of the Lava',
    'of the Crystal',
    'of the Silent Blade',
    'of the Crimson Fist',
    'of the Azure Eye',
    'of the Iron Heart',
    'of the Storm Bringer',
    'of the Ember Hand',
    'of the Whisper Wind',
    "of the Serpent's Kiss",
    'of the Phantom Strike',
    'of the Celestial Dance',
    'of the Lunar Tear',
    'of the Solar Flare',
    'of the Starlight Path',
    'of the Eclipse Shadow',
    "of the Dragon's Breath",
    'of the Phoenix Cry',
    "of the Kraken's Grip",
    "of the Gryphon's Flight",
    "of the Chimera's Rage",
    "of the Void's Embrace",
    'of the Echoing Soul',
    'of the Rune Master',
    'of the Apex Predator',
    'of the Zenith Warrior',
    'of the Nova Blast',
    'of the Quasar Pulse',
    'of the Comet Tail',
    'of the Aurora Veil',
    'of the Tempest Fury',
    "of the Glacier's Touch",
    "of the Inferno's Heart",
    "of the Monsoon's Wrath",
    "of the Tundra's Grip",
    "of the Savanna's Roar",
    "of the Guardian's Shield",
    "of the Sentinel's Watch",
    "of the Warrior's Path",
    "of the Sage's Wisdom",
    "of the Seeker's Quest",
    "of the Hunter's Eye",
    "of the Healer's Touch",
    "of the Artisan's Craft",
    "of the Scholar's Mind",
    "of the Messenger's Swiftness",
    "of the Wanderer's Journey",
    "of the Nomad's Life",
    "of the Outcast's Strength",
    "of the Rebel's Spirit",
    "of the Visionary's Dream",
    "of the Oracle's Sight",
    "of the Enigma's Riddle",
    "of the Legend's Tale",
    "of the Myth's Power",
    "of the Destiny's Call",
  ];

  const name = hasSpecialTraits
    ? `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${
        baseWeapon.name
      } ${suffixes[Math.floor(Math.random() * suffixes.length)]}`
    : baseWeapon.name;

  return {
    name,
    type: baseWeapon.name,
    damage: `${baseWeapon.damage} + ${damageBonus}`, // Apply damage bonus
    properties: [...baseWeapon.properties, ...additionalProperties],
    traits,
    description: hasSpecialTraits
      ? `A ${traits
          .join(', ')
          .toLowerCase()} ${baseWeapon.name.toLowerCase()} that serves as a powerful ninja tool.`
      : `A standard ${baseWeapon.name.toLowerCase()} commonly used by shinobi.`,
  };
}

export function getClanJutsu(clan: NinjaClan, rank: NinjaRank): Jutsu[] {
  const clanData = CLAN_DATA.get(clan);
  if (!clanData) return [];

  const rankMap: Record<NinjaRank, ('D' | 'C' | 'B' | 'A' | 'S')[]> = {
    Genin: ['D'],
    Chunin: ['D', 'C'],
    Jonin: ['D', 'C', 'B'],
    ANBU: ['D', 'C', 'B', 'A'],
    Kage: ['D', 'C', 'B', 'A', 'S'],
  };

  const allowedRanks = rankMap[rank];
  const availableJutsu = clanData.jutsu.filter((j) =>
    allowedRanks.includes(j.rank)
  );

  // Convert ClanJutsu to Jutsu format, preserving all properties
  return availableJutsu.map((j) => ({
    ...j, // Copy all properties from the ClanJutsu
    clan, // Add the clan property
  }));
}

export function getClanFeatures(clan: NinjaClan, level: number): string[] {
  const clanData = CLAN_DATA.get(clan);
  if (!clanData) return CLAN_ABILITIES[clan] || [];

  return clanData.features
    .filter((f) => f.level <= level)
    .map((f) => `${f.name}: ${f.description}`);
}

export function generateCharacter(
    clan: NinjaClan,
    rank: NinjaRank,
    chakraNatures: ChakraNature[],
    specialty: NinjaSpecialty
): NinjaCharacter {
    const [minCR, maxCR] = CR_RANGES[rank];
    const cr = Math.floor(Math.random() * (maxCR - minCR + 1)) + minCR;

    // Determine initial rank based on CR
    let actualRank: NinjaRank;
    if (cr <= 4) actualRank = 'Genin';
    else if (cr <= 8) actualRank = 'Chunin';
    else if (cr <= 12) actualRank = 'Jonin';
    else if (cr <= 16) actualRank = 'ANBU';
    else actualRank = 'Kage';

    const stats = generateStats(cr, specialty); // Pass specialty as an argument
    const modifiers = Object.entries(stats).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: calculateModifier(value), }),
        {}
    );
    const proficiencyBonus = Math.floor((cr - 1) / 4) + 2;
    const level = Math.floor((cr + 1) / 2);

    const conMod = modifiers.con;
    const baseHP = Array(cr)
        .fill(0)
        .map(() => rollDice(12))
        .reduce((a, b) => a + b, 0);
    const totalHP = baseHP + conMod * cr + 10 + conMod;

    const baseChakra = Array(cr)
        .fill(0)
        .map(() => rollDice(12))
        .reduce((a, b) => a + b, 0);
    const totalChakra = baseChakra + conMod * cr + 10 + conMod;

    // Calculate attack modifiers and save DCs
    const attackMods = {
        ninjutsu: proficiencyBonus + modifiers.int,
        taijutsu: proficiencyBonus + modifiers.str,
        genjutsu: proficiencyBonus + modifiers.wis
    };

    const saveDCs = {
        ninjutsu: 8 + proficiencyBonus + modifiers.int,
        taijutsu: 8 + proficiencyBonus + modifiers.str,
        genjutsu: 8 + proficiencyBonus + modifiers.wis
    };

    // Generate 1-3 weapons
    const weapons = Array(rollDice(3))
        .fill(0)
        .map(() => generateWeapon(cr));

    // Get clan-specific jutsu
    const clanJutsu = getClanJutsu(clan, rank);

    // Get general jutsu based on rank, specialty, and elements
    const generalJutsu = getJutsuFromLibrary(rank, specialty, chakraNatures);

    // Combine clan jutsu with general jutsu
    const jutsu = [...clanJutsu, ...generalJutsu];

    // Get clan features
    const abilities = getClanFeatures(clan, level);

    return {
        name: `${clan} ${rank}`,
        clan,
        rank: actualRank,
        cr,
        xp: XP_BY_CR[cr],
        chakraNatures,
        specialty,
        stats,
        modifiers,
        hp: totalHP,
        maxHp: totalHP,
        chakra: totalChakra,
        maxChakra: totalChakra,
        ac: 11 + Math.floor((stats.dex - 10) / 2) + cr + 3,
        speed: 30,
        attackMods,
        saveDCs,
        jutsu,
        weapons,
        abilities,
        proficiencyBonus,
    };
}

import React, { useMemo, useState } from 'react';
import { Scroll, Users, Upload, X, Plus } from 'lucide-react';
import TurnOrderSidebar, { type TurnOrderEntry } from './TurnOrderSidebar';
import type {
  ChakraNature,
  NinjaRank,
  NinjaSpecialty,
  NinjaClan,
  Jutsu as JutsuType,
  ClanFeature,
} from '../types/naruto';
import {
  CHAKRA_NATURES,
  NINJA_CLANS,
  NINJA_RANKS,
  NINJA_SPECIALTIES,
  XP_BY_CR,
} from '../data/naruto';
import { getJutsu as getJutsuFromLibrary } from '../data/jutsuLibrary';
import { getClanFeatures, getClanJutsu, getJutsu } from '../utils/generator';
import {
  ChakraWeapon,
  CHAKRA_WEAPON_NAMES,
  getChakraWeaponByName,
  searchChakraWeapons,
} from '../data/chakraWeapons';

// helpers
const rollDice = (sides: number) => Math.floor(Math.random() * sides) + 1;
const calculateModifier = (score: number) => Math.floor((score - 10) / 2);
const levelFromCR = (cr: number) => Math.floor((cr + 1) / 2);
const resolveClanFile = (clan: string) => String(clan).toLowerCase().replace(/\s+/g, '');
let generatedIdCounter = 0;
const generateId = () =>
  globalThis.crypto?.randomUUID?.() ?? `id-${Date.now()}-${generatedIdCounter++}`;

const rankFromCR = (cr: number): NinjaRank => {
  if (cr <= 4) return 'Genin';
  if (cr <= 8) return 'Chunin';
  if (cr <= 12) return 'Jonin';
  if (cr <= 16) return 'ANBU';
  return 'Kage';
};

const specialtyStatKey = (spec: NinjaSpecialty): keyof Record<string, number> => {
  if (spec === 'Ninjutsu') return 'int';
  if (spec === 'Genjutsu') return 'wis';
  if (spec === 'Taijutsu') return 'str';
  if (spec === 'Bukijutsu') return 'dex';
  if (spec === 'Fuinjutsu') return 'int';
  return 'int';
};

const ALLOWED_RANKS: Record<NinjaRank, Array<'E' | 'D' | 'C' | 'B' | 'A' | 'S'>> = {
  Genin: ['E', 'D'],
  Chunin: ['E', 'D', 'C'],
  Jonin: ['E', 'D', 'C', 'B'],
  ANBU: ['E', 'D', 'C', 'B', 'A'],
  Kage: ['E', 'D', 'C', 'B', 'A', 'S'],
};

const generateStats = (cr: number) => {
  const stats: Record<string, number> = {};
  const statNames = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  statNames.forEach((stat) => {
    const rolls = Array.from({ length: 4 }, () => rollDice(6));
    const sum = rolls.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0);
    stats[stat] = Math.max(sum, 8);
  });
  const bonusPoints = Math.ceil(cr / 2);
  const primary = statNames[Math.floor(Math.random() * statNames.length)];
  stats[primary] += bonusPoints;
  return stats;
};

async function loadClanFeatures(clan: NinjaClan | 'None'): Promise<ClanFeature[]> {
  if (!clan || clan === 'None') return [];
  try {
    const file = resolveClanFile(clan);
    const mod = await import(`../data/clans/${file}`);
    const featuresKey = Object.keys(mod).find((k) => /features$/i.test(k));
    const features = (featuresKey ? (mod as any)[featuresKey] : []) as unknown;
    return Array.isArray(features) ? (features as ClanFeature[]) : [];
  } catch {
    return [];
  }
}

interface NinjaCharacter {
  id: string;
  name: string;
  clan: NinjaClan | 'None';
  rank: NinjaRank;
  cr: number; // UI shows "Level"
  xp: number;
  chakraNatures: ChakraNature[];
  specialty: NinjaSpecialty;
  stats: Record<string, number>; // may contain .5 increments
  modifiers: Record<string, number>;
  hp: number; // current (can exceed max; excess is temp)
  maxHp: number;
  chakra: number; // current (can exceed max; excess is temp)
  maxChakra: number;
  ac: number;
  speed: number;
  jutsu: JutsuType[];
  clanFeatures: ClanFeature[];
  clanJutsu: JutsuType[];
  weapons: any[];
  abilities: string[];
  proficiencyBonus: number;
  baseStats?: Record<string, number>;
  baseCR?: number;
  chakraWeapons?: ChakraWeapon[];
}

const sortTurnOrderEntries = (entries: TurnOrderEntry[]) =>
  [...entries].sort((left, right) => {
    if (left.initiative === null && right.initiative === null) {
      return left.addedAt - right.addedAt;
    }

    if (left.initiative === null) {
      return 1;
    }

    if (right.initiative === null) {
      return -1;
    }

    if (left.initiative !== right.initiative) {
      return right.initiative - left.initiative;
    }

    return left.addedAt - right.addedAt;
  });

const NinjaGenerator: React.FC = () => {
  const [characters, setCharacters] = useState<NinjaCharacter[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showGenerator, setShowGenerator] = useState(true);
  const [turnOrderEntries, setTurnOrderEntries] = useState<TurnOrderEntry[]>([]);
  const [isTurnOrderCollapsed, setIsTurnOrderCollapsed] = useState(false);
  const [turnOrderCharacterId, setTurnOrderCharacterId] = useState<string | null>(null);
  const [turnOrderInitiative, setTurnOrderInitiative] = useState('');

  // Form state
  const [clan, setClan] = useState<NinjaClan | 'None'>(NINJA_CLANS[0] || 'None');
  const [rank, setRank] = useState<NinjaRank>(NINJA_RANKS[0] || ('Genin' as NinjaRank));
  const [selectedNatures, setSelectedNatures] = useState<ChakraNature[]>(
    [CHAKRA_NATURES[0]] as ChakraNature[]
  );
  const [specialty, setSpecialty] = useState<NinjaSpecialty>(NINJA_SPECIALTIES[0]);
  const [customName, setCustomName] = useState('');

  // Import character JSON UI
  const [importText, setImportText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);

  // Export cache per character
  const [exportedJsonById, setExportedJsonById] = useState<Record<string, string>>({});

  // HP/Chakra typed deltas
  const [hpDelta, setHpDelta] = useState<string>('');
  const [chakraDelta, setChakraDelta] = useState<string>('');

  // Chakra weapon add UI
  const [weaponQuery, setWeaponQuery] = useState('');
  const [weaponResults, setWeaponResults] = useState<ChakraWeapon[]>([]);

  const resetTurnOrderCharacterForm = () => {
    setTurnOrderCharacterId(null);
    setTurnOrderInitiative('');
  };

  const openTurnOrderCharacterForm = (characterId: string) => {
    const existingEntry = turnOrderEntries.find((entry) => entry.characterId === characterId);
    setTurnOrderCharacterId(characterId);
    setTurnOrderInitiative(
      typeof existingEntry?.initiative === 'number' ? String(existingEntry.initiative) : ''
    );
  };

  const addCharacterToTurnOrder = (characterId: string, initiative: number) => {
    const character = characters.find((entry) => entry.id === characterId);
    if (!character) return;

    setTurnOrderEntries((prev) => {
      const existingEntry = prev.find((entry) => entry.characterId === characterId);

      const nextEntries = existingEntry
        ? prev.map((entry) =>
            entry.id === existingEntry.id
              ? {
                  ...entry,
                  name: character.name,
                  initiative,
                }
              : entry
          )
        : [
            ...prev,
            {
              id: generateId(),
              name: character.name,
              initiative,
              note: '',
              addedAt: Date.now(),
              type: 'character' as const,
              characterId,
            },
          ];

      return sortTurnOrderEntries(nextEntries);
    });
  };

  const addPlayerTurn = (name: string, initiative: number) => {
    setTurnOrderEntries((prev) =>
      sortTurnOrderEntries([
        ...prev,
        {
          id: generateId(),
          name,
          initiative,
          note: '',
          addedAt: Date.now(),
          type: 'player',
        },
      ])
    );
  };

  const addPlayerToEnd = (name: string) => {
    setTurnOrderEntries((prev) =>
      sortTurnOrderEntries([
        ...prev,
        {
          id: generateId(),
          name,
          initiative: null,
          note: '',
          addedAt: Date.now(),
          type: 'player',
        },
      ])
    );
  };

  const removeTurnOrderEntry = (entryId: string) => {
    setTurnOrderEntries((prev) => prev.filter((entry) => entry.id !== entryId));
  };

  const updateTurnOrderEntryNote = (entryId: string, note: string) => {
    setTurnOrderEntries((prev) =>
      prev.map((entry) => (entry.id === entryId ? { ...entry, note } : entry))
    );
  };

  const handleNatureToggle = (nature: ChakraNature) => {
    setSelectedNatures((prev) =>
      prev.includes(nature) ? prev.filter((n) => n !== nature) : [...prev, nature]
    );
  };

  // Generate character
  const handleGenerate = async () => {
    const crRanges: Record<NinjaRank, [number, number]> = {
      Genin: [1, 4],
      Chunin: [5, 8],
      Jonin: [9, 12],
      ANBU: [13, 16],
      Kage: [17, 20],
    };
    const [minCR, maxCR] = crRanges[rank];
    const cr = Math.floor(Math.random() * (maxCR - minCR + 1)) + minCR;
    const lvl = levelFromCR(cr);

    const stats = generateStats(cr);
    const modifiers = Object.fromEntries(
      Object.entries(stats).map(([k, v]) => [k, calculateModifier(v)])
    ) as Record<string, number>;
    const proficiencyBonus = Math.floor((cr - 1) / 4) + 2;
    const conMod = modifiers.con ?? 0;
    const baseHP = Array.from({ length: cr }, () => rollDice(12)).reduce((a, b) => a + b, 0);
    const totalHP = baseHP + conMod * cr + 10 + conMod;
    const totalChakra = baseHP + conMod * cr + 10 + conMod;

    // Repo jutsu + clan jutsu
    const libraryJutsu = getJutsuFromLibrary(rank, specialty, selectedNatures);
    const clanJutsuList =
      clan && clan !== 'None' ? getClanJutsu(clan as NinjaClan, rank) : ([] as JutsuType[]);

    // Merge jutsu by unique name to avoid duplicates
    const seen = new Set<string>();
    const combinedJutsu: JutsuType[] = [];
    for (const j of [...libraryJutsu, ...clanJutsuList]) {
      if (seen.has(j.name)) continue;
      seen.add(j.name);
      combinedJutsu.push(j);
    }

    // Abilities as strings via repo util
    const abilityStrings =
      clan && clan !== 'None' ? getClanFeatures(clan as NinjaClan, lvl) : ([] as string[]);

    // Structured clan features loaded from clan module and filtered by level
    const allFeatures = await loadClanFeatures(clan);
    const filteredFeatures = allFeatures.filter((f) => (f?.level ?? 0) <= lvl);

    const weapons = [
      {
        name: 'Kunai',
        type: 'Thrown',
        damage: '1d4',
        properties: ['Thrown (30/60)', 'Light'],
        traits: [],
      },
    ];

    // AC progression: +0.5 per Level (floor)
    const ac = 11 + (modifiers.dex ?? 0) + Math.floor(0.5 * cr) + 3;

    const newChar: NinjaCharacter = {
      id: generateId(),
      name: customName || `${clan} ${rank}`,
      clan,
      rank,
      cr,
      xp: XP_BY_CR[cr] ?? 0,
      chakraNatures: selectedNatures,
      specialty,
      stats,
      modifiers,
      hp: totalHP,
      maxHp: totalHP,
      chakra: totalChakra,
      maxChakra: totalChakra,
      ac,
      speed: 30,
      jutsu: combinedJutsu,
      clanFeatures: filteredFeatures,
      clanJutsu: clanJutsuList,
      weapons,
      abilities: abilityStrings,
      proficiencyBonus,
      baseStats: { ...stats },
      baseCR: cr,
      chakraWeapons: [],
    };

    setCharacters((prev) => [...prev, newChar]);
    setActiveTab(newChar.id);
    setCustomName('');
  };

  const handleDelete = (id: string) => {
    const remainingCharacters = characters.filter((character) => character.id !== id);
    setCharacters(remainingCharacters);
    setTurnOrderEntries((prev) => prev.filter((entry) => entry.characterId !== id));

    if (turnOrderCharacterId === id) {
      resetTurnOrderCharacterForm();
    }

    if (activeTab === id) {
      setActiveTab(remainingCharacters[0]?.id || null);
    }
  };

  // Typed deltas
  const applyHpDelta = (id: string) => {
    const delta = Number(hpDelta || 0);
    if (!Number.isFinite(delta)) return;
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, hp: Math.max(0, c.hp + delta) } : c))
    );
    setHpDelta('');
  };

  const applyChakraDelta = (id: string) => {
    const delta = Number(chakraDelta || 0);
    if (!Number.isFinite(delta)) return;
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, chakra: Math.max(0, c.chakra + delta) } : c))
    );
    setChakraDelta('');
  };

  const handleHPChange = (id: string, newHP: number) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, hp: Math.max(0, newHP) } : c))
    );
  };

  const handleChakraChange = (id: string, newChakra: number) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, chakra: Math.max(0, newChakra) } : c))
    );
  };

  // Import pasted JSON (top) and enrich; includes optional chakra weapons
  const importFromText = async () => {
    if (!importText) return;
    try {
      const parsed = JSON.parse(importText);
      const list: any[] = Array.isArray(parsed) ? parsed : [parsed];

      const enriched: NinjaCharacter[] = [];
      for (const raw of list) {
        const id = raw.id || generateId();
        const cr = Number(raw.cr ?? 1);
        const lvl = levelFromCR(cr);
        const rawClan: NinjaClan | 'None' = raw.clan && NINJA_CLANS.includes(raw.clan) ? raw.clan : 'None';
        const rawRank: NinjaRank = raw.rank && NINJA_RANKS.includes(raw.rank) ? raw.rank : rankFromCR(cr);

        const abilityStrings =
          rawClan && rawClan !== 'None' ? getClanFeatures(rawClan as NinjaClan, lvl) : ([] as string[]);
        const clanJutsuList =
          rawClan && rawClan !== 'None' ? getClanJutsu(rawClan as NinjaClan, rawRank) : ([] as JutsuType[]);

        // Merge jutsu (avoid duplicate names)
        const mergedJutsu: JutsuType[] = [];
        const seen = new Set<string>();
        const existing: JutsuType[] = Array.isArray(raw.jutsu) ? raw.jutsu : [];
        for (const j of [...existing, ...clanJutsuList]) {
          if (!j?.name) continue;
          if (seen.has(j.name)) continue;
          seen.add(j.name);
          mergedJutsu.push(j);
        }

        // Structured features from clan module, filtered by level
        const allFeatures = await loadClanFeatures(rawClan);
        const filteredFeatures = allFeatures.filter((f) => (f?.level ?? 0) <= lvl);

        // Ensure stats/proficiency
        const stats = raw.stats || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
        const modifiers =
          raw.modifiers ||
          Object.fromEntries(
            Object.entries(stats).map(([k, v]) => [k, calculateModifier(Math.floor(Number(v) || 10))])
          );

        // AC progression from imported Level
        const ac = 11 + (modifiers.dex ?? 0) + Math.floor(0.5 * cr) + 3;

        // Optional: Chakra Weapons on the character (strings or objects)
        let chakraWeapons: ChakraWeapon[] | undefined = undefined;
        if (Array.isArray(raw.chakraWeapons)) {
          chakraWeapons = raw.chakraWeapons
            .map((cw: any) => {
              if (typeof cw === 'string') {
                const found = getChakraWeaponByName(cw);
                if (found) return found;
                return { name: cw, description: '' } as ChakraWeapon;
              } else if (cw && typeof cw === 'object' && cw.name) {
                const fromLib = getChakraWeaponByName(cw.name);
                return {
                  ...fromLib,
                  ...cw,
                  name: cw.name,
                  description: cw.description ?? fromLib?.description ?? '',
                } as ChakraWeapon;
              }
              return null;
            })
            .filter(Boolean) as ChakraWeapon[];
          if (!chakraWeapons.length) chakraWeapons = undefined;
        }

        const ch: NinjaCharacter = {
          id,
          name: String(raw.name || `${rawClan} ${rawRank}`),
          clan: rawClan,
          rank: rawRank,
          cr,
          xp: Number(raw.xp ?? XP_BY_CR[cr] ?? 0),
          chakraNatures: Array.isArray(raw.chakraNatures) ? raw.chakraNatures : [],
          specialty:
            raw.specialty && NINJA_SPECIALTIES.includes(raw.specialty) ? raw.specialty : 'Ninjutsu',
          stats,
          modifiers,
          hp: Number(raw.hp || 1),
          maxHp: Number(raw.maxHp || raw.hp || 1),
          chakra: Number(raw.chakra || 0),
          maxChakra: Number(raw.maxChakra || raw.chakra || 0),
          ac,
          speed: Number(raw.speed || 30),
          jutsu: mergedJutsu,
          clanFeatures: filteredFeatures,
          clanJutsu: clanJutsuList,
          weapons: Array.isArray(raw.weapons) ? raw.weapons : [],
          abilities: Array.isArray(raw.abilities) ? raw.abilities : abilityStrings,
          proficiencyBonus: Number(raw.proficiencyBonus || Math.floor((cr - 1) / 4) + 2),
          baseStats: raw.baseStats || { ...stats },
          baseCR: Number(raw.baseCR ?? cr),
          chakraWeapons,
        };

        enriched.push(ch);
      }

      setCharacters((prev) => [...prev, ...enriched]);
      setActiveTab(enriched[enriched.length - 1].id);
      setImportText('');
      setShowImportArea(false);
    } catch {
      alert('Failed to parse JSON. Ensure it is valid character JSON.');
    }
  };

  // Export single character JSON (per-character)
  const handleExportForChar = async (id: string) => {
    const ch = characters.find((c) => c.id === id);
    if (!ch) return;
    const json = JSON.stringify(ch, null, 2);
    setExportedJsonById((prev) => ({ ...prev, [id]: json }));
    try {
      await navigator.clipboard.writeText(json);
      alert('Character JSON copied to clipboard');
    } catch {
      // Fallback: manual copy from textarea
    }
  };

  // Level up/down core
  const applyCRChange = async (id: string, delta: 1 | -1) => {
    const current = characters.find((c) => c.id === id);
    if (!current) return;

    const newCR = Math.max(1, Math.min(20, current.cr + delta));
    if (newCR === current.cr) return;

    const newRank = rankFromCR(newCR);
    const lvl = levelFromCR(newCR);
    const prof = Math.floor((newCR - 1) / 4) + 2;

    // Prepare base stats
    const baseStats = current.baseStats ?? { ...current.stats };
    const baseCR = typeof current.baseCR === 'number' ? current.baseCR : current.cr;

    // Compute new stats from base with delta per level
    const specKey = specialtyStatKey(current.specialty);
    const levelDiff = newCR - baseCR;
    const newStats: Record<string, number> = { ...baseStats };
    for (const key of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
      if (typeof (newStats as any)[key] !== 'number') (newStats as any)[key] = 10;
    }
    newStats[specKey] = (newStats[specKey] ?? 10) + 0.5 * levelDiff;
    newStats['con'] = (newStats['con'] ?? 10) + 0.5 * levelDiff;

    const newModifiers = Object.fromEntries(
      Object.entries(newStats).map(([k, v]) => [k, calculateModifier(Math.floor(v))])
    ) as Record<string, number>;

    // HP/Chakra change per level step
    const hpStep = rollDice(12) + (newModifiers.con ?? 0);
    const chakraStep = rollDice(12) + (newModifiers.con ?? 0);
    const signedHp = delta === 1 ? hpStep : -hpStep;
    const signedChakra = delta === 1 ? chakraStep : -chakraStep;

    const newMaxHp = Math.max(1, current.maxHp + signedHp);
    const newMaxChakra = Math.max(0, current.maxChakra + signedChakra);
    const newHp = Math.max(0, current.hp + signedHp);
    const newChakra = Math.max(0, current.chakra + signedChakra);

    // XP
    const newXP = XP_BY_CR[newCR] ?? 0;

    // Jutsu updates:
    const newClanJutsu =
      current.clan && current.clan !== 'None'
        ? getClanJutsu(current.clan as NinjaClan, newRank)
        : ([] as JutsuType[]);

    const allowed = new Set(ALLOWED_RANKS[newRank]);
    const clanNames = new Set(newClanJutsu.map((j) => j.name));
    const filteredJutsu = current.jutsu.filter(
      (j) => allowed.has((j.rank as any) || 'D') || clanNames.has(j.name)
    );

    let finalJutsu = [...filteredJutsu];
    if (delta === 1 && [5, 9, 13, 17].includes(newCR)) {
      const pool = getJutsu(newRank, current.specialty, current.chakraNatures);
      const existing = new Set(finalJutsu.map((j) => j.name));

      let specialtyCandidates = pool.filter((j) => j.keywords?.includes(current.specialty));
      if (current.specialty === 'Ninjutsu') {
        specialtyCandidates = specialtyCandidates.filter(
          (j) => !j.nature || current.chakraNatures.includes(j.nature)
        );
      }
      const addRandom = (arr: JutsuType[]) => {
        const options = arr.filter((j) => !existing.has(j.name));
        if (options.length > 0) {
          const pick = options[Math.floor(Math.random() * options.length)];
          finalJutsu.push(pick);
          existing.add(pick.name);
        }
      };

      addRandom(specialtyCandidates);
      const elemental = pool.filter((j) => j.nature && current.chakraNatures.includes(j.nature));
      addRandom(elemental);
    }

    // Merge in clan jutsu (avoid duplicates)
    const afterNames = new Set(finalJutsu.map((j) => j.name));
    for (const cj of newClanJutsu) {
      if (!afterNames.has(cj.name)) {
        finalJutsu.push(cj);
      }
    }

    // Clan features as strings and structured features
    const newAbilities =
      current.clan && current.clan !== 'None'
        ? getClanFeatures(current.clan as NinjaClan, lvl)
        : ([] as string[]);
    const allFeatures = await loadClanFeatures(current.clan);
    const newStructuredFeatures = allFeatures.filter((f) => (f?.level ?? 0) <= lvl);

    // AC: +0.5 per Level (floor)
    const newAC = 11 + (newModifiers.dex ?? 0) + Math.floor(0.5 * newCR) + 3;

    const updated: NinjaCharacter = {
      ...current,
      cr: newCR,
      rank: newRank,
      xp: newXP,
      stats: newStats,
      modifiers: newModifiers,
      maxHp: newMaxHp,
      maxChakra: newMaxChakra,
      hp: newHp,
      chakra: newChakra,
      jutsu: finalJutsu,
      clanJutsu: newClanJutsu,
      abilities: newAbilities,
      clanFeatures: newStructuredFeatures,
      proficiencyBonus: prof,
      ac: newAC,
      baseStats: current.baseStats ?? { ...current.stats },
      baseCR: typeof current.baseCR === 'number' ? current.baseCR : current.cr,
    };

    setCharacters((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const activeCharacter = characters.find((c) => c.id === activeTab);
  const activeCharacterTurnOrderEntry = useMemo(
    () =>
      activeCharacter
        ? turnOrderEntries.find((entry) => entry.characterId === activeCharacter.id)
        : undefined,
    [activeCharacter, turnOrderEntries]
  );

  const submitCharacterTurnOrder = () => {
    if (!turnOrderCharacterId) return;

    const initiative = Number(turnOrderInitiative);
    if (!Number.isFinite(initiative)) {
      alert('Enter a numeric initiative count before adding this character.');
      return;
    }

    addCharacterToTurnOrder(turnOrderCharacterId, initiative);
    resetTurnOrderCharacterForm();
  };

  // Chakra weapon search
  const onSearchWeapons = (q: string) => {
    setWeaponQuery(q);
    setWeaponResults(searchChakraWeapons(q).slice(0, 10)); // top 10 suggestions
  };

  const addChakraWeaponToActive = (name: string) => {
    const weapon = getChakraWeaponByName(name);
    if (!weapon || !activeCharacter) return;
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== activeCharacter.id) return c;
        const exists = (c.chakraWeapons || []).some((w) => w.name === weapon.name);
        if (exists) return c;
        return { ...c, chakraWeapons: [...(c.chakraWeapons || []), weapon] };
      })
    );
    setWeaponQuery('');
    setWeaponResults([]);
  };

  const removeChakraWeapon = (id: string, name: string) => {
    setCharacters((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, chakraWeapons: (c.chakraWeapons || []).filter((w) => w.name !== name) }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scroll className="w-8 h-8 text-orange-600" />
              <h1 className="text-3xl font-bold text-gray-800">Naruto NPC Generator</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowImportArea((s) => !s)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                <Upload className="w-5 h-5 inline-block mr-2" />
                Paste Import JSON
              </button>
            </div>
          </div>

          {showImportArea && (
            <div className="mt-4">
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                rows={6}
                className="w-full border rounded p-2"
                placeholder="Paste character JSON here (single object or array)"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={importFromText}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Import JSON
                </button>
                <button
                  onClick={() => {
                    setImportText('');
                    setShowImportArea(false);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
          <div className="min-w-0 flex-1">
            {/* Generator Form */}
            {showGenerator && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Character</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Custom Name (Optional)</label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Leave blank for auto-name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Clan</label>
                    <select
                      value={clan}
                      onChange={(e) => setClan(e.target.value as NinjaClan)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="None">None</option>
                      {NINJA_CLANS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Rank</label>
                    <select
                      value={rank}
                      onChange={(e) => setRank(e.target.value as NinjaRank)}
                      className="w-full p-2 border rounded"
                    >
                      {NINJA_RANKS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Specialty</label>
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value as NinjaSpecialty)}
                      className="w-full p-2 border rounded"
                    >
                      {NINJA_SPECIALTIES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Chakra Natures</label>
                    <div className="flex flex-wrap gap-2">
                      {CHAKRA_NATURES.map((nature) => (
                        <button
                          type="button"
                          key={nature}
                          onClick={() => handleNatureToggle(nature)}
                          className={`px-4 py-2 rounded transition ${
                            selectedNatures.includes(nature)
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {nature}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  className="mt-4 w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
                >
                  Generate Character
                </button>
              </div>
            )}

            {/* Character Tabs */}
            {characters.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center gap-2 p-2 bg-gray-100 overflow-x-auto">
                  <Users className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  {characters.map((char) => (
                    <button
                      type="button"
                      key={char.id}
                      onClick={() => setActiveTab(char.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded transition flex-shrink-0 ${
                        activeTab === char.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {char.name}
                      <X
                        className="w-4 h-4 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(char.id);
                        }}
                      />
                    </button>
                  ))}
                </div>

            {/* Character Display */}
            {activeCharacter && (
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div className="text-lg font-bold">{activeCharacter.name}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => applyCRChange(activeCharacter.id, -1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      title="Level Down"
                    >
                      Lvl -
                    </button>
                    <div className="px-3 py-1 rounded bg-gray-100">
                      Level {activeCharacter.cr} • {activeCharacter.rank} • XP {activeCharacter.xp}
                    </div>
                    <button
                      onClick={() => applyCRChange(activeCharacter.id, +1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      title="Level Up"
                    >
                      Lvl +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end">
                    <button
                      onClick={() => openTurnOrderCharacterForm(activeCharacter.id)}
                      className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                    >
                      {activeCharacterTurnOrderEntry ? 'Update Turn Order' : 'Add to Turn Order'}
                    </button>
                    <button
                      onClick={() => handleExportForChar(activeCharacter.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Copy JSON
                    </button>
                    <button
                      onClick={() => handleDelete(activeCharacter.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {turnOrderCharacterId === activeCharacter.id && (
                  <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">Initiative Count</label>
                        <input
                          type="number"
                          value={turnOrderInitiative}
                          onChange={(event) => setTurnOrderInitiative(event.target.value)}
                          className="w-full rounded border px-3 py-2"
                          placeholder="Enter initiative"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={submitCharacterTurnOrder}
                          className="rounded bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                        >
                          Save Turn Order
                        </button>
                        <button
                          type="button"
                          onClick={resetTurnOrderCharacterForm}
                          className="rounded bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-6">
                  {/* Left: basic info, trackers, stats */}
                  <div className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="text-xl font-bold mb-2">{activeCharacter.name}</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-semibold">Clan:</span> {activeCharacter.clan}
                        </div>
                        <div>
                          <span className="font-semibold">Rank:</span> {activeCharacter.rank}
                        </div>
                        <div>
                          <span className="font-semibold">AC:</span> {activeCharacter.ac}
                        </div>
                        <div>
                          <span className="font-semibold">Speed:</span> {activeCharacter.speed}ft
                        </div>
                      </div>
                    </div>

                    {/* HP Tracker */}
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">HP</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={activeCharacter.hp}
                            onChange={(e) =>
                              handleHPChange(activeCharacter.id, Number(e.target.value) || 0)
                            }
                            className="w-24 text-center border rounded"
                          />
                          <span className="text-sm text-gray-600">
                            / {activeCharacter.maxHp}
                            {activeCharacter.hp > activeCharacter.maxHp && (
                              <span className="text-xs text-red-600">
                                {' '}
                                (+{activeCharacter.hp - activeCharacter.maxHp} temp)
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="number"
                          placeholder="+/- amount"
                          value={hpDelta}
                          onChange={(e) => setHpDelta(e.target.value)}
                          className="w-28 border rounded px-2 py-1"
                        />
                        <button
                          onClick={() => applyHpDelta(activeCharacter.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Apply
                        </button>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-4">
                        <div
                          className="bg-red-500 h-4 rounded-full transition-all"
                          style={{
                            width: `${Math.min(
                              100,
                              (activeCharacter.hp / Math.max(1, activeCharacter.maxHp)) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Chakra Tracker */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Chakra</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={activeCharacter.chakra}
                            onChange={(e) =>
                              handleChakraChange(activeCharacter.id, Number(e.target.value) || 0)
                            }
                            className="w-24 text-center border rounded"
                          />
                          <span className="text-sm text-gray-600">
                            / {activeCharacter.maxChakra}
                            {activeCharacter.chakra > activeCharacter.maxChakra && (
                              <span className="text-xs text-blue-600">
                                {' '}
                                (+{activeCharacter.chakra - activeCharacter.maxChakra} temp)
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="number"
                          placeholder="+/- amount"
                          value={chakraDelta}
                          onChange={(e) => setChakraDelta(e.target.value)}
                          className="w-28 border rounded px-2 py-1"
                        />
                        <button
                          onClick={() => applyChakraDelta(activeCharacter.id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Apply
                        </button>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-4">
                        <div
                          className="bg-blue-500 h-4 rounded-full transition-all"
                          style={{
                            width: `${Math.min(
                              100,
                              (activeCharacter.chakra / Math.max(1, activeCharacter.maxChakra)) *
                                100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Ability Scores</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(activeCharacter.stats).map(([key, value]) => (
                          <div key={key} className="text-center bg-white p-2 rounded">
                            <div className="text-xs text-gray-600 uppercase">{key}</div>
                            <div className="text-lg font-bold">{Math.floor(value)}</div>
                            <div className="text-sm text-gray-600">
                              ({activeCharacter.modifiers[key] >= 0 ? '+' : ''}
                              {activeCharacter.modifiers[key]})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Exported JSON */}
                    <div className="bg-white p-3 rounded">
                      <h4 className="font-bold mb-2">Exported JSON</h4>
                      <textarea
                        readOnly
                        rows={8}
                        className="w-full border p-2 rounded"
                        value={
                          exportedJsonById[activeCharacter.id] ||
                          JSON.stringify(activeCharacter, null, 2)
                        }
                      />
                    </div>
                  </div>

                  {/* Right: jutsu, clan features, weapons, chakra weapons */}
                  <div className="space-y-4">
                    {/* Jutsu */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Jutsu</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {activeCharacter.jutsu.map((jutsu, idx) => (
                          <details key={idx} className="bg-white p-3 rounded">
                            <summary className="flex justify-between items-start mb-1 cursor-pointer">
                              <div>
                                <span className="font-semibold">{jutsu.name}</span>
                                <div className="text-xs text-gray-500">
                                  Rank {jutsu.rank}
                                  {jutsu.keywords ? ` • ${jutsu.keywords.join(', ')}` : ''}
                                </div>
                              </div>
                              <div className="text-xs bg-purple-200 px-2 py-1 rounded">
                                Chakra: {jutsu.chakraCost}
                              </div>
                            </summary>
                            <div className="text-sm text-gray-600 mt-2">
                              <p>{jutsu.description}</p>
                              {jutsu.effects && (
                                <ul className="list-disc pl-5 mt-2 text-xs text-gray-700">
                                  {jutsu.effects.map((eff, i) => (
                                    <li key={i}>{eff}</li>
                                  ))}
                                </ul>
                              )}
                              <div className="mt-2 text-xs text-gray-500">
                                <strong>Casting Time:</strong> {jutsu.castingTime ?? '—'} •{' '}
                                <strong>Range:</strong> {jutsu.range ?? '—'} •{' '}
                                <strong>Duration:</strong> {jutsu.duration ?? '—'}
                              </div>
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>

                    {/* Clan Features */}
                    {activeCharacter.clanFeatures.length > 0 && (
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">{activeCharacter.clan} Features</h4>
                        <div className="space-y-2">
                          {activeCharacter.clanFeatures.map((feat, idx) => (
                            <details key={idx} className="bg-white p-3 rounded">
                              <summary className="font-semibold cursor-pointer">{feat.name}</summary>
                              <div className="text-sm text-gray-600 mt-2">{feat.description}</div>
                            </details>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Clan Jutsu */}
                    {activeCharacter.clanJutsu.length > 0 && (
                      <div className="bg-pink-50 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">{activeCharacter.clan} Jutsu</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {activeCharacter.clanJutsu.map((cj, idx) => (
                            <details key={idx} className="bg-white p-3 rounded">
                              <summary className="flex justify-between items-start mb-1 cursor-pointer">
                                <div>
                                  <span className="font-semibold">{cj.name}</span>
                                  <div className="text-xs text-gray-500">Rank {cj.rank}</div>
                                </div>
                                <div className="text-xs bg-pink-200 px-2 py-1 rounded">
                                  Chakra: {cj.chakraCost}
                                </div>
                              </summary>
                              <div className="text-sm text-gray-600 mt-2">
                                <p>{cj.description}</p>
                                {cj.effects && (
                                  <ul className="list-disc pl-5 mt-2 text-xs text-gray-700">
                                    {cj.effects.map((eff, i) => (
                                      <li key={i}>{eff}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </details>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mundane Weapons */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Weapons</h4>
                      <div className="space-y-2">
                        {activeCharacter.weapons.map((weapon, idx) => (
                          <div key={idx} className="bg-white p-3 rounded">
                            <div className="font-semibold">{weapon.name}</div>
                            <div className="text-sm text-gray-600">
                              Damage: {weapon.damage} | Type: {weapon.type}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {weapon.properties?.join(', ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chakra Weapons: Add + List */}
                    <div className="bg-orange-100 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Chakra Weapons</h4>

                      {/* Add box */}
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="text"
                          value={weaponQuery}
                          onChange={(e) => onSearchWeapons(e.target.value)}
                          className="flex-1 border rounded px-2 py-1"
                          placeholder="Search chakra weapons..."
                          list="chakra-weapon-names"
                        />
                        <datalist id="chakra-weapon-names">
                          {CHAKRA_WEAPON_NAMES.map((n) => (
                            <option key={n} value={n} />
                          ))}
                        </datalist>
                        <button
                          onClick={() => weaponQuery && addChakraWeaponToActive(weaponQuery)}
                          className="px-3 py-1 bg-orange-600 text-white rounded disabled:opacity-50"
                          disabled={!weaponQuery}
                          title="Add weapon by exact name"
                        >
                          <Plus className="w-4 h-4 inline-block" /> Add
                        </button>
                      </div>

                      {/* Live suggestions */}
                      {weaponQuery && weaponResults.length > 0 && (
                        <div className="border rounded p-2 bg-white max-h-40 overflow-y-auto mb-3">
                          {weaponResults.map((w) => (
                            <button
                              key={w.name}
                              onClick={() => addChakraWeaponToActive(w.name)}
                              className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                            >
                              <span className="font-medium">{w.name}</span>
                              <span className="text-xs text-gray-500">
                                {w.type ? ` • ${w.type}` : ''} {w.rank ? ` • ${w.rank}` : ''}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* List on character */}
                      {activeCharacter.chakraWeapons && activeCharacter.chakraWeapons.length > 0 ? (
                        <div className="space-y-2 max-h-72 overflow-y-auto">
                          {activeCharacter.chakraWeapons.map((cw) => (
                            <details key={cw.name} className="bg-white p-3 rounded">
                              <summary className="flex items-start justify-between cursor-pointer">
                                <div>
                                  <div className="font-semibold">{cw.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {cw.type ? `${cw.type}` : 'Weapon'}
                                    {cw.rank ? ` • ${cw.rank}` : ''}
                                    {cw.attunement ? ' • requires attunement' : ''}
                                  </div>
                                </div>
                                <button
                                  className="ml-2 text-xs text-red-600 hover:underline"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeChakraWeapon(activeCharacter.id, cw.name);
                                  }}
                                >
                                  remove
                                </button>
                              </summary>
                              <div className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
                                {cw.description || 'No description available.'}
                              </div>
                            </details>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-600">No chakra weapons added.</div>
                      )}
                    </div>

                    {/* Clan Abilities (string list) */}
                    {activeCharacter.abilities?.length > 0 && (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Clan Abilities</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {activeCharacter.abilities.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

            {characters.length === 0 && !showGenerator && (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">
                  No characters yet. Generate your first ninja!
                </p>
              </div>
            )}
          </div>

          <TurnOrderSidebar
            characters={characters.map((character) => ({
              id: character.id,
              name: character.name,
              hp: character.hp,
              maxHp: character.maxHp,
              chakra: character.chakra,
              maxChakra: character.maxChakra,
            }))}
            entries={turnOrderEntries}
            isCollapsed={isTurnOrderCollapsed}
            onAddPlayerTurn={addPlayerTurn}
            onAddPlayerToEnd={addPlayerToEnd}
            onRemoveEntry={removeTurnOrderEntry}
            onToggleCollapse={() => setIsTurnOrderCollapsed((current) => !current)}
            onUpdateEntryNote={updateTurnOrderEntryNote}
          />
        </div>
      </div>
    </div>
  );
};

export default NinjaGenerator;

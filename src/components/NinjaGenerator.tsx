import React, { useEffect, useState } from 'react';
import { Scroll, Users, Plus, Upload, X } from 'lucide-react';
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
} from '../data/naruto';
import { getJutsu as getJutsuFromLibrary } from '../data/jutsuLibrary';
import { getClanFeatures, getClanJutsu } from '../utils/generator';

// helpers
const rollDice = (sides: number) => Math.floor(Math.random() * sides) + 1;
const calculateModifier = (score: number) => Math.floor((score - 10) / 2);
const levelFromCR = (cr: number) => Math.floor((cr + 1) / 2);
const resolveClanFile = (clan: string) => String(clan).toLowerCase().replace(/\s+/g, '');

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

interface NinjaCharacter {
  id: string;
  name: string;
  clan: NinjaClan | 'None';
  rank: NinjaRank;
  cr: number;
  xp: number;
  chakraNatures: ChakraNature[];
  specialty: NinjaSpecialty;
  stats: Record<string, number>;
  modifiers: Record<string, number>;
  hp: number;
  maxHp: number;
  chakra: number;
  maxChakra: number;
  ac: number;
  speed: number;
  jutsu: JutsuType[];
  clanFeatures: ClanFeature[]; // structured features for display
  clanJutsu: JutsuType[]; // jutsu derived from clan and rank
  weapons: any[];
  abilities: string[]; // clan features as strings (compatibility)
  proficiencyBonus: number;
}

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

const NinjaGenerator: React.FC = () => {
  const [characters, setCharacters] = useState<NinjaCharacter[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showGenerator, setShowGenerator] = useState(true);

  // Form state
  const [clan, setClan] = useState<NinjaClan | 'None'>(NINJA_CLANS[0] || 'None');
  const [rank, setRank] = useState<NinjaRank>(NINJA_RANKS[0] || ('Genin' as NinjaRank));
  const [selectedNatures, setSelectedNatures] = useState<ChakraNature[]>(
    [CHAKRA_NATURES[0]] as ChakraNature[]
  );
  const [specialty, setSpecialty] = useState<NinjaSpecialty>(NINJA_SPECIALTIES[0]);
  const [customName, setCustomName] = useState('');

  // Import UI
  const [importText, setImportText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);

  // Per-character exported JSON preview (optional override; defaults to current JSON)
  const [exportedJsonById, setExportedJsonById] = useState<Record<string, string>>({});

  const handleNatureToggle = (nature: ChakraNature) => {
    setSelectedNatures((prev) =>
      prev.includes(nature) ? prev.filter((n) => n !== nature) : [...prev, nature]
    );
  };

  // Generate character using repo libraries for jutsu and clan data
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

    // Abilities as strings via repo util (compatibility with original UI expectations)
    const abilityStrings =
      clan && clan !== 'None' ? getClanFeatures(clan as NinjaClan, lvl) : ([] as string[]);

    // Structured clan features loaded from the clan module and filtered by level
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

    const newChar: NinjaCharacter = {
      id: `${Date.now()}-${Math.random()}`,
      name: customName || `${clan} ${rank}`,
      clan,
      rank,
      cr,
      xp: 0,
      chakraNatures: selectedNatures,
      specialty,
      stats,
      modifiers,
      hp: totalHP,
      maxHp: totalHP,
      chakra: totalChakra,
      maxChakra: totalChakra,
      ac: 11 + (modifiers.dex ?? 0) + cr + 3,
      speed: 30,
      jutsu: combinedJutsu,
      clanFeatures: filteredFeatures,
      clanJutsu: clanJutsuList,
      weapons,
      abilities: abilityStrings,
      proficiencyBonus,
    };

    setCharacters((prev) => [...prev, newChar]);
    setActiveTab(newChar.id);
    setCustomName('');
  };

  const handleDelete = (id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
    if (activeTab === id) setActiveTab(characters[0]?.id || null);
  };

  const handleHPChange = (id: string, newHP: number) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, hp: Math.max(0, Math.min(newHP, c.maxHp)) } : c))
    );
  };

  const handleChakraChange = (id: string, newChakra: number) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, chakra: Math.max(0, Math.min(newChakra, c.maxChakra)) } : c))
    );
  };

  // Import pasted JSON (top)
  const importFromText = async () => {
    if (!importText) return;
    try {
      const parsed = JSON.parse(importText);
      const list: any[] = Array.isArray(parsed) ? parsed : [parsed];

      const enriched: NinjaCharacter[] = [];
      for (const raw of list) {
        const id = raw.id || `${Date.now()}-${Math.random()}`;
        const cr = Number(raw.cr ?? 1);
        const lvl = levelFromCR(cr);
        const rawClan: NinjaClan | 'None' = raw.clan && NINJA_CLANS.includes(raw.clan) ? raw.clan : 'None';
        const rawRank: NinjaRank = raw.rank && NINJA_RANKS.includes(raw.rank) ? raw.rank : 'Genin';

        const abilityStrings =
          rawClan && rawClan !== 'None' ? getClanFeatures(rawClan as NinjaClan, lvl) : ([] as string[]);
        const clanJutsuList =
          rawClan && rawClan !== 'None' ? getClanJutsu(rawClan as NinjaClan, rawRank) : ([] as JutsuType[]);

        // Merge jutsu (avoid duplicate names)
        const mergedJutsu: JutsuType[] = [];
        const seen = new Set<string>();
        const existing: JutsuType[] = Array.isArray(raw.jutsu) ? raw.jutsu : [];
        for (const j of [...existing, ...clanJutsuList]) {
          if (seen.has(j.name)) continue;
          seen.add(j.name);
          mergedJutsu.push(j);
        }

        // Structured features from clan module, filtered by level
        const allFeatures = await loadClanFeatures(rawClan);
        const filteredFeatures = allFeatures.filter((f) => (f?.level ?? 0) <= lvl);

        const ch: NinjaCharacter = {
          id,
          name: String(raw.name || `${rawClan} ${rawRank}`),
          clan: rawClan,
          rank: rawRank,
          cr,
          xp: Number(raw.xp || 0),
          chakraNatures: Array.isArray(raw.chakraNatures) ? raw.chakraNatures : [],
          specialty: raw.specialty && NINJA_SPECIALTIES.includes(raw.specialty) ? raw.specialty : 'Ninjutsu',
          stats: raw.stats || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
          modifiers: raw.modifiers || { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
          hp: Number(raw.hp || 1),
          maxHp: Number(raw.maxHp || raw.hp || 1),
          chakra: Number(raw.chakra || 0),
          maxChakra: Number(raw.maxChakra || raw.chakra || 0),
          ac: Number(raw.ac || 10),
          speed: Number(raw.speed || 30),
          jutsu: mergedJutsu,
          clanFeatures: filteredFeatures,
          clanJutsu: clanJutsuList,
          weapons: Array.isArray(raw.weapons) ? raw.weapons : [],
          abilities: Array.isArray(raw.abilities) ? raw.abilities : abilityStrings,
          proficiencyBonus: Number(raw.proficiencyBonus || Math.floor((cr - 1) / 4) + 2),
        };

        enriched.push(ch);
      }

      setCharacters((prev) => [...prev, ...enriched]);
      setActiveTab(enriched[enriched.length - 1].id);
      setImportText('');
      setShowImportArea(false);
    } catch (err) {
      alert('Failed to parse JSON. Ensure it is valid character JSON.');
    }
  };

  const handleExportForChar = async (id: string) => {
    const ch = characters.find((c) => c.id === id);
    if (!ch) return;
    const json = JSON.stringify(ch, null, 2);
    setExportedJsonById((prev) => ({ ...prev, [id]: json }));
    try {
      await navigator.clipboard.writeText(json);
      alert('Character JSON copied to clipboard');
    } catch {
      // If clipboard fails, user can copy from textarea
    }
  };

  const activeCharacter = characters.find((c) => c.id === activeTab);

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

            {/* Import area toggle (top) */}
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
                    activeTab === char.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
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
                <div className="flex justify-between items-start mb-4">
                  <div className="text-lg font-bold">{activeCharacter.name}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleExportForChar(activeCharacter.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Copy JSON
                    </button>
                    <button
                      onClick={() =>
                        setCharacters((prev) => prev.filter((c) => c.id !== activeCharacter.id))
                      }
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                          <span className="font-semibold">CR:</span> {activeCharacter.cr}
                        </div>
                        <div>
                          <span className="font-semibold">XP:</span> {activeCharacter.xp}
                        </div>
                        <div>
                          <span className="font-semibold">AC:</span> {activeCharacter.ac}
                        </div>
                        <div>
                          <span className="font-semibold">Speed:</span> {activeCharacter.speed}ft
                        </div>
                      </div>
                    </div>

                    {/* HP and Chakra Trackers */}
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">HP</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleHPChange(activeCharacter.id, activeCharacter.hp - 1)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            -
                          </button>
                          <span>
                            {activeCharacter.hp} / {activeCharacter.maxHp}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleHPChange(activeCharacter.id, activeCharacter.hp + 1)}
                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-4">
                        <div
                          className="bg-red-500 h-4 rounded-full transition-all"
                          style={{ width: `${(activeCharacter.hp / activeCharacter.maxHp) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Chakra</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleChakraChange(activeCharacter.id, activeCharacter.chakra - 1)}
                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            -
                          </button>
                          <span>
                            {activeCharacter.chakra} / {activeCharacter.maxChakra}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleChakraChange(activeCharacter.id, activeCharacter.chakra + 1)}
                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-4">
                        <div
                          className="bg-blue-500 h-4 rounded-full transition-all"
                          style={{ width: `${(activeCharacter.chakra / activeCharacter.maxChakra) * 100}%` }}
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
                            <div className="text-lg font-bold">{value}</div>
                            <div className="text-sm text-gray-600">
                              ({activeCharacter.modifiers[key] >= 0 ? '+' : ''}
                              {activeCharacter.modifiers[key]})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Exported JSON area for this character */}
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
                      <div className="text-sm text-gray-500 mt-1">
                        Click "Copy JSON" to copy to clipboard. You can also copy from this textarea.
                      </div>
                    </div>
                  </div>

                  {/* Right: jutsu, clan features, weapons */}
                  <div className="space-y-4">
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

                    {/* Optional: show clan abilities as strings for parity with original App */}
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
            <p className="text-xl text-gray-600">No characters yet. Generate your first ninja!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NinjaGenerator;

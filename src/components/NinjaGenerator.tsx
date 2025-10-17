import React, { useEffect, useState } from 'react';
import { Scroll, Users, Plus, Download, Upload, X } from 'lucide-react';
import type {
  ChakraNature,
  NinjaRank,
  NinjaSpecialty,
  NinjaClan,
  Jutsu as JutsuType,
} from '../types/naruto';
import {
  CHAKRA_NATURES,
  NINJA_CLANS,
  NINJA_RANKS,
  NINJA_SPECIALTIES,
} from '../data/naruto';
import { getJutsu as getJutsuFromLibrary } from '../data/jutsuLibrary';

// small helpers
const rollDice = (sides: number) => Math.floor(Math.random() * sides) + 1;
const calculateModifier = (score: number) => Math.floor((score - 10) / 2);
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
  clanFeatures: { name: string; description: string }[];
  clanJutsu: JutsuType[];
  weapons: any[];
  abilities: string[];
  proficiencyBonus: number;
}

const NinjaGenerator: React.FC = () => {
  const [characters, setCharacters] = useState<NinjaCharacter[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showGenerator, setShowGenerator] = useState(true);

  // form state (defaults from repo data)
  const [clan, setClan] = useState<NinjaClan | 'None'>(NINJA_CLANS[0] || 'None');
  const [rank, setRank] = useState<NinjaRank>(NINJA_RANKS[0] || ('Genin' as NinjaRank));
  const [selectedNatures, setSelectedNatures] = useState<ChakraNature[]>(
    [CHAKRA_NATURES[0]] as ChakraNature[]
  );
  const [specialty, setSpecialty] = useState<NinjaSpecialty>(NINJA_SPECIALTIES[0]);
  const [customName, setCustomName] = useState('');

  const [clanFeatures, setClanFeatures] = useState<{ name: string; description: string }[]>([]);
  const [clanJutsu, setClanJutsu] = useState<JutsuType[]>([]);

  // dynamically import clan module (reads existing clan data files — no changes to them)
  useEffect(() => {
    if (!clan || clan === 'None') {
      setClanFeatures([]);
      setClanJutsu([]);
      return;
    }
    const file = String(clan).toLowerCase().replace(/\s+/g, '');
    import(`../data/clans/${file}`)
      .then((module) => {
        const featuresKey = Object.keys(module).find((k) => /features$/i.test(k));
        const jutsuKey = Object.keys(module).find((k) => /jutsu$/i.test(k));
        const f = featuresKey ? (module as any)[featuresKey] : [];
        const j = jutsuKey ? (module as any)[jutsuKey] : [];
        setClanFeatures(
          Array.isArray(f)
            ? f.map((x: any) => ({ name: x.name || 'Feature', description: x.description || '' }))
            : []
        );
        setClanJutsu(Array.isArray(j) ? j : []);
      })
      .catch(() => {
        setClanFeatures([]);
        setClanJutsu([]);
      });
  }, [clan]);

  const handleNatureToggle = (nature: ChakraNature) => {
    setSelectedNatures((prev) =>
      prev.includes(nature) ? prev.filter((n) => n !== nature) : [...prev, nature]
    );
  };

  const handleGenerate = () => {
    const crRanges: Record<NinjaRank, [number, number]> = {
      Genin: [1, 4],
      Chunin: [5, 8],
      Jonin: [9, 12],
      ANBU: [13, 16],
      Kage: [17, 20],
    };
    const [minCR, maxCR] = crRanges[rank];
    const cr = Math.floor(Math.random() * (maxCR - minCR + 1)) + minCR;
    const stats = generateStats(cr);
    const modifiers = Object.fromEntries(
      Object.entries(stats).map(([k, v]) => [k, calculateModifier(v)])
    ) as Record<string, number>;
    const proficiencyBonus = Math.floor((cr - 1) / 4) + 2;
    const conMod = modifiers.con ?? 0;
    const baseHP = Array.from({ length: cr }, () => rollDice(12)).reduce((a, b) => a + b, 0);
    const totalHP = baseHP + conMod * cr + 10 + conMod;
    const totalChakra = baseHP + conMod * cr + 10 + conMod;

    const libraryJutsu = getJutsuFromLibrary(rank, specialty, selectedNatures);
    const combinedJutsu: JutsuType[] = [...libraryJutsu, ...clanJutsu];

    const weapons = [
      {
        name: 'Kunai',
        type: 'Thrown',
        damage: '1d4',
        properties: ['Thrown (30/60)', 'Light'],
        traits: [],
      },
    ];
    const abilities = clan && clan !== 'None' ? [`${clan} Clan Abilities`] : [];

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
      clanFeatures: clanFeatures.map((f) => ({ name: f.name, description: f.description })),
      clanJutsu,
      weapons,
      abilities,
      proficiencyBonus,
    };

    setCharacters((prev) => [...prev, newChar]);
    setActiveTab(newChar.id);
    setCustomName('');
  };

  const handleDelete = (id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
    if (activeTab === id) {
      setActiveTab(characters[0]?.id || null);
    }
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

  const exportCharacters = () => {
    const data = JSON.stringify(characters, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ninja-characters.json';
    a.click();
  };

  const importCharacters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(String(event.target?.result));
        if (Array.isArray(imported)) setCharacters((prev) => [...prev, ...imported]);
        else alert('Imported file does not contain an array of characters');
      } catch {
        alert('Failed to import characters');
      }
    };
    reader.readAsText(file);
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
            <div className="flex gap-2">
              <button
                onClick={() => setShowGenerator(!showGenerator)}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {showGenerator ? 'Hide' : 'Show'} Generator
              </button>
              {characters.length > 0 && (
                <>
                  <button
                    onClick={exportCharacters}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Export
                  </button>
                  <label className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-2 cursor-pointer">
                    <Upload className="w-5 h-5" />
                    Import
                    <input type="file" accept=".json" onChange={importCharacters} className="hidden" />
                  </label>
                </>
              )}
            </div>
          </div>
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
                <select value={clan} onChange={(e) => setClan(e.target.value as NinjaClan)} className="w-full p-2 border rounded">
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
                <select value={rank} onChange={(e) => setRank(e.target.value as NinjaRank)} className="w-full p-2 border rounded">
                  {NINJA_RANKS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Specialty</label>
                <select value={specialty} onChange={(e) => setSpecialty(e.target.value as NinjaSpecialty)} className="w-full p-2 border rounded">
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
                        selectedNatures.includes(nature) ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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

            {activeCharacter && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Info */}
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
                  </div>

                  {/* Jutsu, Weapons, Abilities */}
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
                              <div className="text-xs bg-purple-200 px-2 py-1 rounded">Chakra: {jutsu.chakraCost}</div>
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
                                <strong>Casting Time:</strong> {jutsu.castingTime ?? '—'} • <strong>Range:</strong> {jutsu.range ?? '—'} • <strong>Duration:</strong> {jutsu.duration ?? '—'}
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
                                <div className="text-xs bg-pink-200 px-2 py-1 rounded">Chakra: {cj.chakraCost}</div>
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
                            <div className="text-sm text-gray-600">Damage: {weapon.damage} | Type: {weapon.type}</div>
                            <div className="text-xs text-gray-500 mt-1">{weapon.properties?.join(', ')}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Special Abilities</h4>
                      <ul className="space-y-1">
                        {activeCharacter.abilities.map((ability, idx) => (
                          <li key={idx} className="text-sm">{ability}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NinjaGenerator;

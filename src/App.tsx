import React, { useState } from 'react';
import {
  serializeCharacter,
  deserializeCharacter,
} from './utils/serialization'; // Import the serialization functions
import { rollDice, calculateModifier } from './utils/generator';
import { ScrollText, Swords, User } from 'lucide-react';
import {
  CHAKRA_NATURES,
  NINJA_CLANS,
  NINJA_RANKS,
  NINJA_SPECIALTIES,
  XP_BY_CR,
} from './data/naruto';
import {
  generateCharacter,
  generateStats,
  calculateMaxHp,
  calculateMaxChakra,
  getClanJutsu,
  getClanFeatures,
  getJutsu,
} from './utils/generator';
import type {
  NinjaCharacter,
  ChakraNature,
  NinjaClan,
  NinjaRank,
  NinjaSpecialty,
  Jutsu,
  TurnOrderEntry,
} from './types/naruto';
import { TurnOrderPanel } from './components/TurnOrderPanel';

interface JutsuDetailsProps {
  jutsu: Jutsu;
}

function JutsuDetails({ jutsu }: JutsuDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="bg-gray-50 p-2 rounded text-sm"
      role="button"
      aria-expanded={isExpanded}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="font-medium cursor-pointer flex justify-between items-center">
        <div>{jutsu.name}</div>
        <div className="text-gray-500 text-xs">
          {jutsu.clan ? `${jutsu.clan} • ` : ''}Rank {jutsu.rank}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-2 space-y-2 text-gray-600">
          <div className="font-medium text-gray-800">{jutsu.description}</div>

          <div className="grid grid-cols-2 gap-2">
            <div>Chakra Cost: {jutsu.chakraCost}</div>
            {jutsu.castingTime && <div>Casting Time: {jutsu.castingTime}</div>}
            {jutsu.range && <div>Range: {jutsu.range}</div>}
            {jutsu.duration && <div>Duration: {jutsu.duration}</div>}
          </div>

          {jutsu.damage && <div>Damage: {jutsu.damage}</div>}

          {jutsu.nature && <div>Nature: {jutsu.nature}</div>}

          {jutsu.components && jutsu.components.length > 0 && (
            <div>Components: {jutsu.components.join(', ')}</div>
          )}

          {jutsu.keywords && jutsu.keywords.length > 0 && (
            <div>Keywords: {jutsu.keywords.join(', ')}</div>
          )}

          {jutsu.effects && jutsu.effects.length > 0 && (
            <div className="mt-2">
              <div className="font-medium text-gray-800 mb-1">Effects:</div>
              <ul className="list-disc list-inside space-y-1">
                {jutsu.effects.map((effect, index) => (
                  <li key={`${jutsu.name}-effect-${index}`} className="text-sm">
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  const [character, setCharacter] = useState<NinjaCharacter | null>(null);
  const [characterName, setCharacterName] = useState<string>('');
  const [selectedClan, setSelectedClan] = useState<NinjaClan>('None');
  const [selectedRank, setSelectedRank] = useState<NinjaRank>('Genin');
  const [selectedNatures, setSelectedNatures] = useState<ChakraNature[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<NinjaSpecialty>('Ninjutsu');
  const [currentHp, setCurrentHp] = useState<number>(0);
  const [currentChakra, setCurrentChakra] = useState<number>(0);

  const [exportedCharacter, setExportedCharacter] = useState<string>('');
  const [importedCharacter, setImportedCharacter] = useState<string>('');

  // Turn order state
  const [turnOrder, setTurnOrder] = useState<TurnOrderEntry[]>([]);
  const [turnOrderOpen, setTurnOrderOpen] = useState<boolean>(false);
  const [showInitiativeInput, setShowInitiativeInput] = useState<boolean>(false);
  const [characterInitiative, setCharacterInitiative] = useState<string>('');

  const handleNatureToggle = (nature: ChakraNature) => {
    if (selectedNatures.includes(nature)) {
      setSelectedNatures(selectedNatures.filter((n) => n !== nature));
    } else if (selectedNatures.length < 2) {
      setSelectedNatures([...selectedNatures, nature]);
    }
  };

  const handleClanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (NINJA_CLANS.includes(value as NinjaClan)) {
      setSelectedClan(value as NinjaClan);
    }
  };

  const handleRankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (NINJA_RANKS.includes(value as NinjaRank)) {
      setSelectedRank(value as NinjaRank);
    }
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (NINJA_SPECIALTIES.includes(value as NinjaSpecialty)) {
      setSelectedSpecialty(value as NinjaSpecialty);
    }
  };

  const handleGenerate = () => {
    if (selectedNatures.length === 0) return;
    const newCharacter = generateCharacter(
      selectedClan,
      selectedRank,
      selectedNatures,
      selectedSpecialty
    );
    setCharacterName(newCharacter.name);
    setCurrentHp(newCharacter.hp);
    setCurrentChakra(newCharacter.chakra);
    setCharacter(newCharacter);
  };

  const handleExport = () => {
    if (character) {
      const serialized = serializeCharacter({ ...character, name: characterName });
      setExportedCharacter(serialized);
    }
  };

  const handleImport = () => {
    const deserialized = deserializeCharacter(importedCharacter);
    if (deserialized) {
      setCharacterName(deserialized.name);
      setCharacter(deserialized);
      setCurrentHp(deserialized.hp);
      setCurrentChakra(deserialized.chakra);
    } else {
      alert('Invalid character data.');
    }
  };

  const handleLevelUp = () => {
    if (!character) return;

    const newCR = character.cr + 1;
    const proficiencyBonus = Math.floor((newCR / 4) + 2);
    
    // Determine rank based on level
    let newRank: NinjaRank;
    if (newCR <= 4) newRank = 'Genin';
    else if (newCR <= 8) newRank = 'Chunin';
    else if (newCR <= 12) newRank = 'Jonin';
    else if (newCR <= 16) newRank = 'ANBU';
    else newRank = 'Kage';

    // Roll for new HP and Chakra
    const hpIncrease = rollDice(12) + character.modifiers.con;
    const chakraIncrease = rollDice(12) + character.modifiers.con;

    // Update stats based on specialty
    const specialtyStatMap = {
      Ninjutsu: 'int',
      Taijutsu: 'str', 
      Genjutsu: 'wis',
      Bukijutsu: 'dex',
      Fuinjutsu: 'int'
    };
    
    const updatedStats = { ...character.stats };
    const statToIncrease = specialtyStatMap[character.specialty];
    if (statToIncrease) {
      updatedStats[statToIncrease] += 0.5;
    }

    // Increase Constitution regardless of specialty
    updatedStats.con += 0.5;

    // Calculate new modifiers
    const updatedModifiers = Object.entries(updatedStats).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: calculateModifier(Math.floor(value))
      }),
      {}
    );
    // Calculate new attack modifiers and save DCs
    const attackMods = {
      ninjutsu: proficiencyBonus + updatedModifiers.int,
      taijutsu: proficiencyBonus + updatedModifiers.str,
      genjutsu: proficiencyBonus + updatedModifiers.wis
    };

    const saveDCs = {
      ninjutsu: 8 + proficiencyBonus + updatedModifiers.int,
      taijutsu: 8 + proficiencyBonus + updatedModifiers.str,
      genjutsu: 8 + proficiencyBonus + updatedModifiers.wis
    };

    // Only add jutsu at specific levels (5, 9, 13, 17)
    const existingJutsuNames = new Set(character.jutsu.map(j => j.name));
    let newJutsu = [...character.jutsu];
    
    const level = newCR;
    if ([5, 9, 13, 17].includes(level)) {
      // Get one specialty jutsu
      const rankFilteredJutsu = getJutsu(newRank, character.specialty, character.chakraNatures)
        .filter(j => !existingJutsuNames.has(j.name)); 
      
      // Get specialty jutsu
      let specialtyJutsu = rankFilteredJutsu.filter((j) =>
        j.keywords?.includes(character.specialty)
      );
      
      if (character.specialty === 'Ninjutsu') {
        specialtyJutsu = specialtyJutsu.filter(
          (j) => !j.nature || character.chakraNatures.includes(j.nature)
        );
      }
      
      const randomSpecialtyJutsu = specialtyJutsu.length > 0 
        ? [specialtyJutsu[Math.floor(Math.random() * specialtyJutsu.length)]]
        : [];
      
      // Get elemental jutsu
      const elementalJutsu = rankFilteredJutsu.filter(
        (j) => j.nature && character.chakraNatures.includes(j.nature)
      );

      const randomElementalJutsu = elementalJutsu.length > 0
        ? [elementalJutsu[Math.floor(Math.random() * elementalJutsu.length)]]
        : [];

      newJutsu = [...character.jutsu, ...randomSpecialtyJutsu, ...randomElementalJutsu];
    }

    const updatedCharacter = {
      ...character,
      cr: newCR,
      rank: newRank,
      xp: XP_BY_CR[newCR], // Update XP based on new CR
      stats: updatedStats,
      modifiers: updatedModifiers,
      maxHp: character.maxHp + hpIncrease,
      maxChakra: character.maxChakra + chakraIncrease,
      jutsu: newJutsu,
      attackMods,
      saveDCs,
      abilities: getClanFeatures(character.clan, Math.floor((newCR + 1) / 2)), // Get new clan features
    };

    setCharacter(updatedCharacter);
    setCurrentHp(currentHp + hpIncrease); // Increase current HP by the same amount
    setCurrentChakra(currentChakra + chakraIncrease); // Increase current Chakra by the same amount
  };

  const generateId = () => crypto.randomUUID();

  const insertByInitiative = (
    prev: TurnOrderEntry[],
    entry: TurnOrderEntry
  ): TurnOrderEntry[] => {
    const fixed = prev.filter((e) => !e.addedToEnd);
    const tail = prev.filter((e) => e.addedToEnd);
    const idx = fixed.findIndex((e) => e.initiative < entry.initiative);
    const updated =
      idx === -1
        ? [...fixed, entry]
        : [...fixed.slice(0, idx), entry, ...fixed.slice(idx)];
    return [...updated, ...tail];
  };

  const handleAddCharacterToTurnOrder = () => {
    if (!character || characterInitiative === '') return;
    const initiative = Number(characterInitiative);
    const entry: TurnOrderEntry = {
      id: generateId(),
      name: characterName || character.name,
      initiative,
      note: '',
      isCharacter: true,
      addedToEnd: false,
    };
    setTurnOrder((prev) => insertByInitiative(prev, entry));
    setShowInitiativeInput(false);
    setCharacterInitiative('');
    setTurnOrderOpen(true);
  };

  const handleAddPlayerToTurnOrder = (name: string, initiative: number) => {
    const entry: TurnOrderEntry = {
      id: generateId(),
      name,
      initiative,
      note: '',
      isCharacter: false,
      addedToEnd: false,
    };
    setTurnOrder((prev) => insertByInitiative(prev, entry));
  };

  const handleAddToEnd = (name: string) => {
    const entry: TurnOrderEntry = {
      id: generateId(),
      name,
      initiative: 0,
      note: '',
      isCharacter: false,
      addedToEnd: true,
    };
    setTurnOrder((prev) => [...prev, entry]);
  };

  const handleRemoveFromTurnOrder = (id: string) => {
    setTurnOrder((prev) => prev.filter((e) => e.id !== id));
  };

  const handleUpdateNote = (id: string, note: string) => {
    setTurnOrder((prev) =>
      prev.map((e) => (e.id === id ? { ...e, note } : e))
    );
  };

  return (
    <div className={`min-h-screen bg-gray-100 overflow-x-hidden transition-all duration-300 ${turnOrderOpen ? 'sm:pr-80' : ''}`}>
      <header className="bg-red-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            <Swords className="w-8 h-8" />
            <h1 className="text-2xl font-bold">
              Naruto 5e Adversary Generator
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Generator Controls */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Character Options
            </h2>

            <div className="space-y-4">
              {/* Clan Selection */}
              <div>
                <label
                  htmlFor="clan-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Clan
                </label>
                <select
                  id="clan-select"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  value={selectedClan}
                  onChange={handleClanChange}
                >
                  {NINJA_CLANS.map((clan) => (
                    <option key={clan} value={clan}>
                      {clan}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rank Selection */}
              <div>
                <label
                  htmlFor="rank-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ninja Rank
                </label>
                <select
                  id="rank-select"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  value={selectedRank}
                  onChange={handleRankChange}
                >
                  {NINJA_RANKS.map((rank) => (
                    <option key={rank} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chakra Natures */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chakra Natures (max 2)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CHAKRA_NATURES.map((nature) => (
                    <button
                      key={nature}
                      onClick={() => handleNatureToggle(nature)}
                      disabled={
                        !selectedNatures.includes(nature) &&
                        selectedNatures.length >= 2
                      }
                      className={`p-2 rounded-md text-sm ${
                        selectedNatures.includes(nature)
                          ? 'bg-red-600 text-white'
                          : selectedNatures.length >= 2
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      aria-pressed={selectedNatures.includes(nature)}
                    >
                      {nature}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specialty Selection */}
              <div>
                <label
                  htmlFor="specialty-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Specialty
                </label>
                <select
                  id="specialty-select"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  value={selectedSpecialty}
                  onChange={handleSpecialtyChange}
                >
                  {NINJA_SPECIALTIES.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={selectedNatures.length === 0}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Generate Character
              </button>
            </div>
          </div>

          {/* Character Sheet */}
          {character && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ScrollText className="w-5 h-5 mr-2" />
                Character Sheet
              </h2>

              <button
                onClick={handleLevelUp}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mb-2"
              >
                Level Up
              </button>

              {/* Add to Turn Order */}
              {!showInitiativeInput ? (
                <button
                  onClick={() => setShowInitiativeInput(true)}
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 mb-2"
                >
                  Add to Turn Order
                </button>
              ) : (
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    value={characterInitiative}
                    onChange={(e) => setCharacterInitiative(e.target.value)}
                    placeholder="Initiative count"
                    className="flex-1 border rounded px-2 py-1 text-sm"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddCharacterToTurnOrder();
                      if (e.key === 'Escape') {
                        setShowInitiativeInput(false);
                        setCharacterInitiative('');
                      }
                    }}
                  />
                  <button
                    onClick={handleAddCharacterToTurnOrder}
                    className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setShowInitiativeInput(false);
                      setCharacterInitiative('');
                    }}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="space-y-4">
                <div className="border-b pb-4">
                  <input
                    type="text"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    className="text-lg font-medium w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1"
                    placeholder="Enter character name..."
                  />
                  <p className="text-gray-600">
                    LVL {character.cr} • {character.rank.replace(/^(\w+)$/, '$1 Tier')} ({character.xp} XP)
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-sm text-gray-600">HP</div>
                    <div className="flex items-center justify-center gap-2">
                      <input
                        type="number"
                        value={currentHp}
                        onChange={(e) => setCurrentHp(Number(e.target.value))}
                        className="w-20 text-center border rounded"
                      />
                      <span className="text-gray-500">/ {character.maxHp}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-sm text-gray-600">AC</div>
                    <div className="font-bold">{character.ac}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-sm text-gray-600">Chakra</div>
                    <div className="flex items-center justify-center gap-2">
                      <input
                        type="number"
                        value={currentChakra}
                        onChange={(e) =>
                          setCurrentChakra(Number(e.target.value))
                        }
                        className="w-20 text-center border rounded"
                      />
                      <span className="text-gray-500">
                        / {character.maxChakra}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-sm text-gray-600">Speed</div>
                    <div className="font-bold">{character.speed}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded col-span-3">
                    <div className="text-sm text-gray-600">Attack Modifiers</div>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <div>
                        <span className="text-gray-500">Ninjutsu:</span>{' '}
                        <span className="font-bold">
                          {character.attackMods.ninjutsu >= 0 ? '+' : ''}
                          {character.attackMods.ninjutsu}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Taijutsu:</span>{' '}
                        <span className="font-bold">
                          {character.attackMods.taijutsu >= 0 ? '+' : ''}
                          {character.attackMods.taijutsu}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Genjutsu:</span>{' '}
                        <span className="font-bold">
                          {character.attackMods.genjutsu >= 0 ? '+' : ''}
                          {character.attackMods.genjutsu}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded col-span-3">
                    <div className="text-sm text-gray-600">Save DCs</div>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <div>
                        <span className="text-gray-500">Ninjutsu:</span>{' '}
                        <span className="font-bold">DC {character.saveDCs.ninjutsu}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Taijutsu:</span>{' '}
                        <span className="font-bold">DC {character.saveDCs.taijutsu}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Genjutsu:</span>{' '}
                        <span className="font-bold">DC {character.saveDCs.genjutsu}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-2 text-center">
                  {Object.entries(character.stats).map(([stat, value]) => (
                    <div key={stat} className="bg-gray-50 p-2 rounded">
                      <div className="text-sm text-gray-600 uppercase">
                        {stat}
                      </div>
                      <div className="font-bold">
                        {Math.floor(value)} ({character.modifiers[stat] >= 0 ? '+' : ''}
                        {character.modifiers[stat]})
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Clan Abilities</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {character.abilities.map((ability, index) => (
                      <li key={`ability-${index}`}>{ability}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Weapons</h4>
                  <div className="space-y-2">
                    {character.weapons.map((weapon, index) => (
                      <div
                        key={`weapon-${index}`}
                        className="bg-gray-50 p-2 rounded text-sm"
                      >
                        <div className="font-medium">{weapon.name}</div>
                        <div className="text-gray-600">
                          {weapon.damage} damage •{' '}
                          {weapon.properties.join(', ')}
                        </div>
                        <div className="text-gray-600">
                          Traits: {weapon.traits.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Jutsu</h4>
                  <div className="space-y-2">
                    {character.jutsu.map((jutsu, index) => (
                      <JutsuDetails key={`jutsu-${index}`} jutsu={jutsu} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Import/Export Character Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Import/Export Character
            </h2>
            <div className="space-y-4">
              <button
                onClick={handleExport}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Export Character
              </button>
              <textarea
                value={exportedCharacter}
                readOnly
                rows={5}
                className="w-full border-gray-300 rounded-md p-2"
                placeholder="Exported character data will appear here..."
              />
              <textarea
                value={importedCharacter}
                onChange={(e) => setImportedCharacter(e.target.value)}
                rows={5}
                className="w-full border-gray-300 rounded-md p-2"
                placeholder="Paste character data here to import..."
              />
              <button
                onClick={handleImport}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Import Character
              </button>
            </div>
          </div>
        </div>
      </main>

      <TurnOrderPanel
        isOpen={turnOrderOpen}
        onToggle={() => setTurnOrderOpen((v) => !v)}
        turnOrder={turnOrder}
        onRemove={handleRemoveFromTurnOrder}
        onUpdateNote={handleUpdateNote}
        onAddPlayer={handleAddPlayerToTurnOrder}
        onAddToEnd={handleAddToEnd}
        currentHp={currentHp}
        maxHp={character?.maxHp ?? 0}
        currentChakra={currentChakra}
        maxChakra={character?.maxChakra ?? 0}
        hasCharacter={character !== null}
      />
    </div>
  );
}

export default App;

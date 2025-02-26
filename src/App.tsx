import React, { useState } from 'react';
import { serializeCharacter, deserializeCharacter } from './utils/serialization'; // Import the serialization functions
import { ScrollText, Swords, User } from 'lucide-react';
import {
  CHAKRA_NATURES,
  NINJA_CLANS,
  NINJA_RANKS,
  NINJA_SPECIALTIES
} from './data/naruto';
import { generateCharacter } from './utils/generator';
import type { NinjaCharacter, ChakraNature, NinjaClan, NinjaRank, NinjaSpecialty, Jutsu } from './types/naruto';

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

          {jutsu.damage && (
            <div>Damage: {jutsu.damage}</div>
          )}
          
          {jutsu.nature && (
            <div>Nature: {jutsu.nature}</div>
          )}
          
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
                  <li key={`${jutsu.name}-effect-${index}`} className="text-sm">{effect}</li>
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
  const [selectedClan, setSelectedClan] = useState<NinjaClan>('None');
  const [selectedRank, setSelectedRank] = useState<NinjaRank>('Genin');
  const [selectedNatures, setSelectedNatures] = useState<ChakraNature[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<NinjaSpecialty>('Ninjutsu');
  const [currentHp, setCurrentHp] = useState<number>(0);
  const [currentChakra, setCurrentChakra] = useState<number>(0);
  
  const [exportedCharacter, setExportedCharacter] = useState<string>('');
  const [importedCharacter, setImportedCharacter] = useState<string>('');

  const handleNatureToggle = (nature: ChakraNature) => {
    if (selectedNatures.includes(nature)) {
      setSelectedNatures(selectedNatures.filter(n => n !== nature));
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
    setCurrentHp(newCharacter.hp);
    setCurrentChakra(newCharacter.chakra);
    setCharacter(newCharacter);
  };

  const handleExport = () => {
    if (character) {
      const serialized = serializeCharacter(character);
      setExportedCharacter(serialized);
    }
  };

  const handleImport = () => {
    const deserialized = deserializeCharacter(importedCharacter);
    if (deserialized) {
      setCharacter(deserialized);
      setCurrentHp(deserialized.hp);
      setCurrentChakra(deserialized.chakra);
    } else {
      alert("Invalid character data.");
    }
  };

  const handleLevelUp = () => {
  if (!character) return;

  // Determine new CR and rank
  const newCR = character.cr + 1; // Increment CR for simplicity
  const newRank = NINJA_RANKS[Math.min(NINJA_RANKS.indexOf(character.rank) + 1, NINJA_RANKS.length - 1)];

  // Update character stats and abilities
  const updatedCharacter = {
    ...character,
    cr: newCR,
    rank: newRank,
    xp: XP_BY_CR[newCR], // Update XP based on new CR
    stats: generateStats(newCR), // Re-generate stats
    maxHp: calculateMaxHp(newCR, character.modifiers.con), // Recalculate max HP
    maxChakra: calculateMaxChakra(newCR, character.modifiers.con), // Recalculate max Chakra
    jutsu: getClanJutsu(character.clan, newRank).concat(getJutsu(newRank, character.specialty, character.chakraNatures)), // Get new jutsu
    abilities: getClanFeatures(character.clan, Math.floor((newCR + 1) / 2)), // Get new clan features
  };

  setCharacter(updatedCharacter);
  setCurrentHp(updatedCharacter.maxHp); // Reset current HP to max
  setCurrentChakra(updatedCharacter.maxChakra); // Reset current Chakra to max
};

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            <Swords className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Naruto 5e Adversary Generator</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Generator Controls */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User  className="w-5 h-5 mr-2" />
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
                  {NINJA_CLANS.map(clan => (
                    <option key={clan} value={clan}>{clan}</option>
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
                  {NINJA_RANKS.map(rank => (
                    <option key={rank} value={rank}>{rank}</option>
                  ))}
                </select>
              </div>

              {/* Chakra Natures */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chakra Natures (max 2)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CHAKRA_NATURES.map(nature => (
                    <button
                      key={nature}
                      onClick={() => handleNatureToggle(nature)}
                      disabled={!selectedNatures.includes(nature) && selectedNatures.length >= 2}
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
                  {NINJA_SPECIALTIES.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
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

              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium">{character.name}</h3>
                  <p className="text-gray-600">
                    CR {character.cr} ({character.xp} XP)
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
                        onChange={(e) => setCurrentChakra(Number(e.target.value))}
                        className="w-20 text-center border rounded"
                      />
                      <span className="text-gray-500">/ {character.maxChakra}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-sm text-gray-600">Speed</div>
                    <div className="font-bold">{character.speed}</div>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-2 text-center">
                  {Object.entries(character.stats).map(([stat, value]) => (
                    <div key={stat} className="bg-gray-50 p-2 rounded">
                      <div className="text-sm text-gray-600 uppercase">{stat}</div>
                      <div className="font-bold">{value} ({character.modifiers[stat] >= 0 ? '+' : ''}{character.modifiers[stat]})</div>
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
                      <div key={`weapon-${index}`} className="bg-gray-50 p-2 rounded text-sm">
                        <div className="font-medium">{weapon.name}</div>
                        <div className="text-gray-600">
                          {weapon.damage} damage • {weapon.properties.join(', ')}
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
            <h2 className="text-xl font-semibold mb-4">Import/Export Character</h2>
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
    </div>
  );
}

export default App;

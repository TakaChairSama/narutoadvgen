import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ListOrdered, Plus, Trash2, UserPlus } from 'lucide-react';

export interface TurnOrderEntry {
  id: string;
  name: string;
  initiative: number | null;
  note: string;
  addedAt: number;
  type: 'character' | 'player';
  characterId?: string;
}

export interface TurnOrderCharacterSummary {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  chakra: number;
  maxChakra: number;
}

interface TurnOrderSidebarProps {
  characters: TurnOrderCharacterSummary[];
  entries: TurnOrderEntry[];
  isCollapsed: boolean;
  onAddPlayerTurn: (name: string, initiative: number) => void;
  onAddPlayerToEnd: (name: string) => void;
  onRemoveEntry: (entryId: string) => void;
  onToggleCollapse: () => void;
  onUpdateEntryNote: (entryId: string, note: string) => void;
}

const TurnOrderSidebar: React.FC<TurnOrderSidebarProps> = ({
  characters,
  entries,
  isCollapsed,
  onAddPlayerTurn,
  onAddPlayerToEnd,
  onRemoveEntry,
  onToggleCollapse,
  onUpdateEntryNote,
}) => {
  const [playerName, setPlayerName] = useState('');
  const [playerInitiative, setPlayerInitiative] = useState('');

  const entriesWithCharacters = useMemo(
    () =>
      entries.map((entry) => ({
        entry,
        character: entry.characterId
          ? characters.find((character) => character.id === entry.characterId)
          : undefined,
      })),
    [characters, entries]
  );

  const submitPlayerTurn = () => {
    const initiative = Number(playerInitiative);
    if (!playerName.trim() || !Number.isFinite(initiative)) {
      alert('Enter a player name and a valid initiative count.');
      return;
    }

    onAddPlayerTurn(playerName.trim(), initiative);
    setPlayerName('');
    setPlayerInitiative('');
  };

  const submitPlayerToEnd = () => {
    if (!playerName.trim()) {
      alert('Enter a player name before adding them to the turn order.');
      return;
    }

    onAddPlayerToEnd(playerName.trim());
    setPlayerName('');
    setPlayerInitiative('');
  };

  return (
    <aside
      className={`shrink-0 transition-all duration-300 ${
        isCollapsed ? 'xl:w-20' : 'xl:w-96'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden xl:sticky xl:top-4">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-between gap-2 bg-gray-900 px-4 py-3 text-white"
        >
          <span className="flex items-center gap-2 font-semibold">
            <ListOrdered className="w-5 h-5" />
            {!isCollapsed && 'Turn Order'}
          </span>
          {isCollapsed ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>

        {!isCollapsed && (
          <div className="p-4 space-y-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <h3 className="font-semibold text-gray-800 mb-3">Add Player Turn</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={playerName}
                  onChange={(event) => setPlayerName(event.target.value)}
                  className="w-full rounded border px-3 py-2"
                  placeholder="Player or ally name"
                />
                <input
                  type="number"
                  value={playerInitiative}
                  onChange={(event) => setPlayerInitiative(event.target.value)}
                  className="w-full rounded border px-3 py-2"
                  placeholder="Initiative count"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={submitPlayerTurn}
                    className="inline-flex items-center gap-2 rounded bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Player Turn
                  </button>
                  <button
                    type="button"
                    onClick={submitPlayerToEnd}
                    className="inline-flex items-center gap-2 rounded bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    <Plus className="w-4 h-4" />
                    Add to End
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {entriesWithCharacters.length > 0 ? (
                entriesWithCharacters.map(({ entry, character }) => (
                  <div key={entry.id} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                          {entry.initiative === null ? 'End of Order' : `Init ${entry.initiative}`}
                        </div>
                        <div className="text-base font-semibold text-gray-900">{character?.name ?? entry.name}</div>
                        <div className="text-xs text-gray-500">
                          {entry.type === 'character' ? 'Linked sheet' : 'Player turn'}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveEntry(entry.id)}
                        className="rounded p-1 text-gray-500 hover:bg-red-50 hover:text-red-600"
                        title="Remove from turn order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {character && (
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div className="rounded bg-red-50 px-3 py-2">
                          <div className="font-medium text-red-700">HP</div>
                          <div className="text-gray-800">
                            {character.hp} / {character.maxHp}
                          </div>
                        </div>
                        <div className="rounded bg-blue-50 px-3 py-2">
                          <div className="font-medium text-blue-700">Chakra</div>
                          <div className="text-gray-800">
                            {character.chakra} / {character.maxChakra}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-3">
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Note
                      </label>
                      <textarea
                        value={entry.note}
                        onChange={(event) => onUpdateEntryNote(entry.id, event.target.value)}
                        rows={2}
                        className="w-full rounded border px-3 py-2 text-sm"
                        placeholder="Add a combat note..."
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
                  No one is in the turn order yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default TurnOrderSidebar;

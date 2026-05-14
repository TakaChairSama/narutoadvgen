import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Plus, Trash2, Users } from 'lucide-react';
import type { TurnOrderEntry } from '../types/naruto';

interface TurnOrderPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  turnOrder: TurnOrderEntry[];
  onRemove: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  onAddPlayer: (name: string, initiative: number) => void;
  onAddToEnd: (name: string) => void;
  currentHp: number;
  maxHp: number;
  currentChakra: number;
  maxChakra: number;
  hasCharacter: boolean;
}

export function TurnOrderPanel({
  isOpen,
  onToggle,
  turnOrder,
  onRemove,
  onUpdateNote,
  onAddPlayer,
  onAddToEnd,
  currentHp,
  maxHp,
  currentChakra,
  maxChakra,
  hasCharacter,
}: TurnOrderPanelProps) {
  const [addMode, setAddMode] = useState<'player' | 'end' | null>(null);
  const [newName, setNewName] = useState('');
  const [newInitiative, setNewInitiative] = useState('');

  const handleAddPlayer = () => {
    if (!newName.trim() || newInitiative === '') return;
    const parsed = Number(newInitiative);
    if (!Number.isFinite(parsed)) return;
    onAddPlayer(newName.trim(), parsed);
    setNewName('');
    setNewInitiative('');
    setAddMode(null);
  };

  const handleAddToEnd = () => {
    if (!newName.trim()) return;
    onAddToEnd(newName.trim());
    setNewName('');
    setAddMode(null);
  };

  const cancelAdd = () => {
    setAddMode(null);
    setNewName('');
    setNewInitiative('');
  };

  return (
    <div
      className={`fixed right-0 top-0 h-screen z-40 transition-transform duration-300 w-80 bg-white shadow-xl flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Toggle tab – peeks out from the left edge of the panel */}
      <button
        onClick={onToggle}
        className="absolute -left-10 top-1/2 -translate-y-1/2 bg-red-700 text-white rounded-l-lg px-2 py-4 shadow-md hover:bg-red-800 flex flex-col items-center gap-1"
        title={isOpen ? 'Collapse Turn Order' : 'Expand Turn Order'}
      >
        {isOpen ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
        <span className="text-xs" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Turn Order
        </span>
      </button>

      {/* Header */}
      <div className="bg-red-700 text-white px-4 py-3 flex items-center gap-2 shrink-0">
        <Users className="w-5 h-5" />
        <h2 className="font-bold">Turn Order</h2>
      </div>

      {/* Entry list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {turnOrder.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-4">No combatants yet</p>
        )}
        {turnOrder.map((entry, index) => (
          <TurnOrderEntryCard
            key={entry.id}
            entry={entry}
            index={index}
            onRemove={onRemove}
            onUpdateNote={onUpdateNote}
            currentHp={currentHp}
            maxHp={maxHp}
            currentChakra={currentChakra}
            maxChakra={maxChakra}
            hasCharacter={hasCharacter}
          />
        ))}
      </div>

      {/* Add controls */}
      <div className="border-t p-3 space-y-2 shrink-0">
        {addMode === 'player' && (
          <div className="space-y-2 bg-gray-50 p-2 rounded">
            <p className="text-xs font-medium text-gray-600">Add Player Turn</p>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Player name"
              className="w-full border rounded px-2 py-1 text-sm"
            />
            <input
              type="number"
              value={newInitiative}
              onChange={(e) => setNewInitiative(e.target.value)}
              placeholder="Initiative count"
              className="w-full border rounded px-2 py-1 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddPlayer}
                className="flex-1 bg-red-600 text-white py-1 px-2 rounded text-sm hover:bg-red-700"
              >
                Add
              </button>
              <button
                onClick={cancelAdd}
                className="flex-1 bg-gray-300 text-gray-700 py-1 px-2 rounded text-sm hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {addMode === 'end' && (
          <div className="space-y-2 bg-gray-50 p-2 rounded">
            <p className="text-xs font-medium text-gray-600">Add to End of Order</p>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name"
              className="w-full border rounded px-2 py-1 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddToEnd}
                className="flex-1 bg-gray-600 text-white py-1 px-2 rounded text-sm hover:bg-gray-700"
              >
                Add to End
              </button>
              <button
                onClick={cancelAdd}
                className="flex-1 bg-gray-300 text-gray-700 py-1 px-2 rounded text-sm hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {addMode === null && (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setAddMode('player')}
              className="bg-red-600 text-white py-1 px-2 rounded text-sm hover:bg-red-700 flex items-center justify-center gap-1"
            >
              <Plus className="w-3 h-3" /> Player Turn
            </button>
            <button
              onClick={() => setAddMode('end')}
              className="bg-gray-600 text-white py-1 px-2 rounded text-sm hover:bg-gray-700 flex items-center justify-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add to End
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface TurnOrderEntryCardProps {
  entry: TurnOrderEntry;
  index: number;
  onRemove: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  currentHp: number;
  maxHp: number;
  currentChakra: number;
  maxChakra: number;
  hasCharacter: boolean;
}

function TurnOrderEntryCard({
  entry,
  index,
  onRemove,
  onUpdateNote,
  currentHp,
  maxHp,
  currentChakra,
  maxChakra,
  hasCharacter,
}: TurnOrderEntryCardProps) {
  return (
    <div className="bg-gray-50 rounded p-2 border border-gray-200">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded min-w-[20px] text-center">
            {index + 1}
          </span>
          <span className="font-medium text-sm truncate max-w-[140px]">{entry.name}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-500">
            Init: {entry.addedToEnd ? '—' : entry.initiative}
          </span>
          <button
            onClick={() => onRemove(entry.id)}
            className="text-red-400 hover:text-red-600"
            title="Remove from turn order"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {entry.isCharacter && hasCharacter && (
        <div className="flex gap-3 text-xs mb-1">
          <span className="text-red-600 font-medium">❤ {currentHp}/{maxHp}</span>
          <span className="text-blue-600 font-medium">✦ {currentChakra}/{maxChakra}</span>
        </div>
      )}

      <textarea
        value={entry.note}
        onChange={(e) => onUpdateNote(entry.id, e.target.value)}
        placeholder="Notes..."
        rows={2}
        className="w-full border rounded px-2 py-1 text-xs resize-none"
      />
    </div>
  );
}

import React from 'react';
import type { AbilityStat, ChakraNature, NinjaClan, NinjaSpecialty } from '../types/naruto';
import { CHAKRA_NATURES, NINJA_CLANS, NINJA_SPECIALTIES } from '../data/naruto';
import { ABILITY_STATS } from '../utils/characterData';

export interface BuildEditable {
  name: string;
  clan: NinjaClan | 'None';
  specialty: NinjaSpecialty;
  chakraNatures: ChakraNature[];
  stats: Record<string, number>;
  maxHp: number;
  maxChakra: number;
  ac: number;
  speed: number;
}

export type BuildPatch = Partial<BuildEditable>;

interface BuildEditorProps {
  value: BuildEditable;
  onChange: (patch: BuildPatch) => void;
}

const inputClass = 'w-full border rounded px-2 py-1 text-sm';

const BuildEditor: React.FC<BuildEditorProps> = ({ value, onChange }) => {
  const toggleNature = (nature: ChakraNature) => {
    const next = value.chakraNatures.includes(nature)
      ? value.chakraNatures.filter((n) => n !== nature)
      : [...value.chakraNatures, nature];
    onChange({ chakraNatures: next });
  };

  const setNumber = (raw: string, apply: (n: number) => BuildPatch, min = 0) => {
    const n = Number(raw);
    if (raw === '' || !Number.isFinite(n)) return;
    onChange(apply(Math.max(min, n)));
  };

  return (
    <div className="bg-amber-50 p-4 rounded-lg">
      <h4 className="font-bold mb-3">Edit Build</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <label className="block">
          <span className="block font-medium mb-1">Name</span>
          <input
            type="text"
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="block font-medium mb-1">Clan</span>
          <select
            value={value.clan}
            onChange={(e) => onChange({ clan: e.target.value as NinjaClan | 'None' })}
            className={inputClass}
          >
            <option value="None">None</option>
            {NINJA_CLANS.filter((c) => c !== 'None').map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block font-medium mb-1">Specialty</span>
          <select
            value={value.specialty}
            onChange={(e) => onChange({ specialty: e.target.value as NinjaSpecialty })}
            className={inputClass}
          >
            {NINJA_SPECIALTIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <div>
          <span className="block font-medium mb-1">Chakra Natures</span>
          <div className="flex flex-wrap gap-1">
            {CHAKRA_NATURES.map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => toggleNature(n)}
                className={`px-2 py-1 rounded text-xs ${
                  value.chakraNatures.includes(n)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3">
        <span className="block font-medium mb-1 text-sm">Ability Scores</span>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {ABILITY_STATS.map((stat: AbilityStat) => (
            <label key={stat} className="text-center">
              <span className="block text-xs uppercase text-gray-600">{stat}</span>
              <input
                type="number"
                min={1}
                max={30}
                value={Math.floor(value.stats[stat] ?? 10)}
                onChange={(e) =>
                  setNumber(
                    e.target.value,
                    (n) => ({ stats: { ...value.stats, [stat]: Math.min(30, n) } }),
                    1
                  )
                }
                className="w-full border rounded px-1 py-1 text-center text-sm"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-sm">
        <label className="block">
          <span className="block font-medium mb-1">Max HP</span>
          <input
            type="number"
            min={1}
            value={value.maxHp}
            onChange={(e) => setNumber(e.target.value, (n) => ({ maxHp: n }), 1)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="block font-medium mb-1">Max Chakra</span>
          <input
            type="number"
            min={0}
            value={value.maxChakra}
            onChange={(e) => setNumber(e.target.value, (n) => ({ maxChakra: n }))}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="block font-medium mb-1">AC</span>
          <input
            type="number"
            min={0}
            value={value.ac}
            onChange={(e) => setNumber(e.target.value, (n) => ({ ac: n }))}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="block font-medium mb-1">Speed (ft)</span>
          <input
            type="number"
            min={0}
            step={5}
            value={value.speed}
            onChange={(e) => setNumber(e.target.value, (n) => ({ speed: n }))}
            className={inputClass}
          />
        </label>
      </div>
    </div>
  );
};

export default BuildEditor;

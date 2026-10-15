import React, { useMemo, useState } from 'react';
import { Plus, Check, Search } from 'lucide-react';
import type {
  ChakraNature,
  Jutsu,
  JutsuRank,
  NinjaClan,
  NinjaRank,
  NinjaSpecialty,
} from '../types/naruto';
import { BASIC_JUTSU } from '../data/jutsuData';
import { CHAKRA_NATURES } from '../data/naruto';
import { getClanJutsu } from '../utils/generator';

const ALLOWED_RANKS: Record<NinjaRank, JutsuRank[]> = {
  Genin: ['D'],
  Chunin: ['D', 'C'],
  Jonin: ['D', 'C', 'B'],
  ANBU: ['D', 'C', 'B', 'A'],
  Kage: ['D', 'C', 'B', 'A', 'S'],
};

const ALL_RANKS: JutsuRank[] = ['D', 'C', 'B', 'A', 'S'];

interface JutsuBrowserProps {
  rank: NinjaRank;
  specialty: NinjaSpecialty;
  natures: ChakraNature[];
  clan: NinjaClan | 'None';
  known: Jutsu[];
  onAdd: (jutsu: Jutsu) => void;
  onRemove: (name: string) => void;
}

const selectClass = 'border rounded px-2 py-1 text-sm bg-white';

/**
 * Browsable jutsu library. With "Match build" on, the list is narrowed to what the
 * NPC's rank, specialty, chakra natures and clan allow; the other filters narrow further.
 */
const JutsuBrowser: React.FC<JutsuBrowserProps> = ({
  rank,
  specialty,
  natures,
  clan,
  known,
  onAdd,
  onRemove,
}) => {
  const [query, setQuery] = useState('');
  const [matchBuild, setMatchBuild] = useState(true);
  const [rankFilter, setRankFilter] = useState<JutsuRank | 'All'>('All');
  const [keywordFilter, setKeywordFilter] = useState('All');
  const [natureFilter, setNatureFilter] = useState<ChakraNature | 'All'>('All');
  const [sourceFilter, setSourceFilter] = useState<'All' | 'Library' | 'Clan'>('All');

  const clanJutsu = useMemo(
    () => (clan !== 'None' ? getClanJutsu(clan, 'Kage') : []),
    [clan]
  );

  const pool = useMemo(() => {
    const clanNames = new Set(clanJutsu.map((j) => j.name));
    const library = BASIC_JUTSU.filter((j) => !clanNames.has(j.name));
    return [...clanJutsu, ...library];
  }, [clanJutsu]);

  const keywordOptions = useMemo(
    () => Array.from(new Set(pool.flatMap((j) => j.keywords ?? []))).sort(),
    [pool]
  );

  const knownNames = useMemo(() => new Set(known.map((j) => j.name)), [known]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const allowed = new Set(ALLOWED_RANKS[rank]);
    return pool.filter((j) => {
      const isClan = clanJutsu.some((c) => c.name === j.name);

      if (sourceFilter === 'Clan' && !isClan) return false;
      if (sourceFilter === 'Library' && isClan) return false;
      if (rankFilter !== 'All' && j.rank !== rankFilter) return false;
      if (keywordFilter !== 'All' && !j.keywords?.includes(keywordFilter)) return false;
      if (natureFilter !== 'All' && j.nature !== natureFilter) return false;
      if (q && !`${j.name} ${j.description} ${(j.keywords ?? []).join(' ')}`.toLowerCase().includes(q))
        return false;

      if (matchBuild) {
        if (!allowed.has(j.rank)) return false;
        if (isClan) return true;
        // Elemental jutsu only if the NPC has that nature
        if (j.nature && !natures.includes(j.nature)) return false;
        const matchesSpecialty = j.keywords?.includes(specialty) ?? false;
        const matchesElement = !!j.nature && natures.includes(j.nature);
        return matchesSpecialty || matchesElement;
      }
      return true;
    });
  }, [
    pool,
    clanJutsu,
    query,
    rank,
    specialty,
    natures,
    matchBuild,
    rankFilter,
    keywordFilter,
    natureFilter,
    sourceFilter,
  ]);

  const clanNames = useMemo(() => new Set(clanJutsu.map((j) => j.name)), [clanJutsu]);

  return (
    <div className="bg-violet-50 p-4 rounded-lg">
      <h4 className="font-bold mb-1">Jutsu Library</h4>
      <p className="text-xs text-gray-600 mb-3">
        {matchBuild
          ? `Showing jutsu that fit a ${rank} ${specialty} specialist` +
            (natures.length ? ` with ${natures.join(' + ')}` : ' (no chakra natures)') +
            (clan !== 'None' ? ` from the ${clan} clan.` : '.')
          : 'Showing the whole library.'}
      </p>

      <div className="flex items-center gap-2 mb-2">
        <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, text or keyword..."
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
        <label className="flex items-center gap-1 font-medium">
          <input
            type="checkbox"
            checked={matchBuild}
            onChange={(e) => setMatchBuild(e.target.checked)}
          />
          Match build
        </label>
        <select
          aria-label="Rank filter"
          value={rankFilter}
          onChange={(e) => setRankFilter(e.target.value as JutsuRank | 'All')}
          className={selectClass}
        >
          <option value="All">Any rank</option>
          {ALL_RANKS.map((r) => (
            <option key={r} value={r}>
              {r}-Rank
            </option>
          ))}
        </select>
        <select
          aria-label="Keyword filter"
          value={keywordFilter}
          onChange={(e) => setKeywordFilter(e.target.value)}
          className={selectClass}
        >
          <option value="All">Any keyword</option>
          {keywordOptions.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <select
          aria-label="Nature filter"
          value={natureFilter}
          onChange={(e) => setNatureFilter(e.target.value as ChakraNature | 'All')}
          className={selectClass}
        >
          <option value="All">Any nature</option>
          {CHAKRA_NATURES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        {clan !== 'None' && (
          <select
            aria-label="Source filter"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value as 'All' | 'Library' | 'Clan')}
            className={selectClass}
          >
            <option value="All">All sources</option>
            <option value="Library">General library</option>
            <option value="Clan">{clan} clan only</option>
          </select>
        )}
      </div>

      <div className="text-xs text-gray-500 mb-2">
        {results.length} match{results.length === 1 ? '' : 'es'} • {known.length} known
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {results.length === 0 && (
          <div className="text-sm text-gray-500 bg-white rounded p-3">
            Nothing matches. Try turning off &ldquo;Match build&rdquo; or clearing a filter.
          </div>
        )}
        {results.map((j) => {
          const has = knownNames.has(j.name);
          return (
            <details key={j.name} className="bg-white p-3 rounded">
              <summary className="flex justify-between items-start gap-2 cursor-pointer">
                <div className="min-w-0">
                  <span className="font-semibold">{j.name}</span>
                  <div className="text-xs text-gray-500">
                    Rank {j.rank}
                    {j.nature ? ` • ${j.nature}` : ''}
                    {clanNames.has(j.name) ? ` • ${clan} clan` : ''}
                    {j.keywords?.length ? ` • ${j.keywords.join(', ')}` : ''}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs bg-violet-200 px-2 py-1 rounded">
                    Chakra: {j.chakraCost}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (has) onRemove(j.name);
                      else onAdd(j);
                    }}
                    className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 ${
                      has
                        ? 'bg-green-600 text-white hover:bg-red-600'
                        : 'bg-violet-600 text-white hover:bg-violet-700'
                    }`}
                    title={has ? 'Click to remove' : 'Add to this NPC'}
                  >
                    {has ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    {has ? 'Added' : 'Add'}
                  </button>
                </div>
              </summary>
              <div className="text-sm text-gray-600 mt-2">
                <p>{j.description}</p>
                {j.effects && (
                  <ul className="list-disc pl-5 mt-2 text-xs text-gray-700">
                    {j.effects.map((eff, i) => (
                      <li key={i}>{eff}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  <strong>Casting Time:</strong> {j.castingTime ?? '—'} • <strong>Range:</strong>{' '}
                  {j.range ?? '—'} • <strong>Duration:</strong> {j.duration ?? '—'}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
};

export default JutsuBrowser;

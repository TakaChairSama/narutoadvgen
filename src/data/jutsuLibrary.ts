import { Jutsu, JutsuRank, NinjaRank, NinjaSpecialty, ChakraNature } from '../types/naruto';
import { BASIC_JUTSU } from './jutsuData';

// Function to get jutsu counts based on rank
function getJutsuCounts(rank: NinjaRank): { specialty: number; elemental: number } {
  const counts = {
    Genin: { specialty: 2, elemental: 1 },
    Chunin: { specialty: 3, elemental: 2 },
    Jonin: { specialty: 4, elemental: 3 },
    ANBU: { specialty: 5, elemental: 4 },
    Kage: { specialty: 6, elemental: 5 }
  };
  return counts[rank];
}

// Function to get allowed jutsu ranks based on ninja rank
function getAllowedRanks(rank: NinjaRank): JutsuRank[] {
  const rankMap: Record<NinjaRank, JutsuRank[]> = {
    Genin: ['D'],
    Chunin: ['D', 'C'],
    Jonin: ['D', 'C', 'B'],
    ANBU: ['D', 'C', 'B', 'A'],
    Kage: ['D', 'C', 'B', 'A', 'S']
  };
  return rankMap[rank];
}

// Function to randomly select jutsu from a pool
function selectRandomJutsu(pool: Jutsu[], count: number): Jutsu[] {
  const selected: Jutsu[] = [];
  const poolCopy = [...pool];
  
  while (selected.length < count && poolCopy.length > 0) {
    const index = Math.floor(Math.random() * poolCopy.length);
    selected.push(poolCopy.splice(index, 1)[0]);
  }
  
  return selected;
}

// Main function to get jutsu based on rank, specialty, and elements
export function getJutsu(
  rank: NinjaRank,
  specialty: NinjaSpecialty,
  elements: ChakraNature[]
): Jutsu[] {
  const allowedRanks = getAllowedRanks(rank);
  const { specialty: specialtyCount, elemental: elementalCount } = getJutsuCounts(rank);

  // Filter jutsu by rank
  const rankFilteredJutsu = BASIC_JUTSU.filter(j => allowedRanks.includes(j.rank));

  // Get specialty jutsu
  const specialtyJutsu = rankFilteredJutsu.filter(j => 
    j.keywords?.includes(specialty)
  );

  // Get elemental jutsu
  const elementalJutsu = rankFilteredJutsu.filter(j => 
    j.nature && elements.includes(j.nature)
  );

  // Select random jutsu from each pool
  const selectedSpecialtyJutsu = selectRandomJutsu(specialtyJutsu, specialtyCount);
  const selectedElementalJutsu = selectRandomJutsu(elementalJutsu, elementalCount);

  // Combine and return selected jutsu
  return [...selectedSpecialtyJutsu, ...selectedElementalJutsu];
}
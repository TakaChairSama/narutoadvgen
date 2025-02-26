// Rank types
export type JutsuRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
export type ChakraNature = 'Fire' | 'Water' | 'Earth' | 'Wind' | 'Lightning';
export type NinjaRank = 'Genin' | 'Chunin' | 'Jonin' | 'ANBU' | 'Kage';
export type NinjaClan =
  // Noble Clans
  | 'Uchiha'
  | 'Hyuga'
  | 'Nara'
  | 'Akimichi'
  // Combat Clans
  | 'Aburame'
  | 'Inuzuka'
  | 'Yamanaka'
  | 'Uzumaki'
  // Kekkei Genkai Clans
  | 'Kaguya'
  | 'Yuki'
  | 'Kurama'
  | 'Jugo'
  // Elemental Clans
  | 'Bakuton'
  | 'Futton'
  | 'Jiton'
  | 'Ranton'
  | 'Shakuton'
  | 'Shoton'
  | 'Yoton'
  // Specialist Clans
  | 'Fuma'
  | 'Hatake'
  | 'Hebi'
  | 'Hoshigaki'
  | 'Hozuki'
  | 'Kuru'
  | 'Namikaze'
  | 'Ryu'
  | 'Sarutobi'
  | 'Senju'
  | 'Shikigami'
  | 'Tsuchigumo'
  // No Clan
  | 'None';

export type NinjaSpecialty =
  | 'Ninjutsu'
  | 'Genjutsu'
  | 'Taijutsu'
  | 'Fuinjutsu'
  | 'Bukijutsu'
  | 'Kenjutsu';

// Component types
export type JutsuComponent =
  | 'HS'
  | 'CM'
  | 'W'
  | 'M'
  | 'W (Any Thrown)'
  | 'W (Katana, Broadswords or Odachi)'
  | 'W (Broadsword, Kunai, Katana or Odachi)'
  | 'Blood Sacrifice'
  | 'CS'
  | 'W (Katana)'
  | 'NT'
  | 'W (any Shuriken or Chakram)';

export interface Jutsu {
  name: string;
  description: string;
  rank: JutsuRank;
  chakraCost: number;
  damage?: string;
  range?: string;
  duration?: string;
  nature?: ChakraNature;
  clan?: NinjaClan;
  keywords?: string[];
  components?: JutsuComponent[];
  castingTime?: string;
  effects?: string[];
}

export interface Weapon {
  name: string;
  type: string;
  damage: string;
  properties: string[];
  traits: string[];
  description: string;
}

export interface NinjaCharacter {
  name: string;
  clan: NinjaClan;
  rank: NinjaRank;
  cr: number;
  xp: number;
  chakraNatures: ChakraNature[];
  specialty: NinjaSpecialty;
  stats: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  modifiers: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  hp: number;
  maxHp: number;
  chakra: number;
  maxChakra: number;
  ac: number;
  speed: number;
  jutsu: Jutsu[];
  weapons: Weapon[];
  abilities: string[];
  proficiencyBonus: number;
  clanFeatures?: string[];
}

export interface ClanFeature {
  name: string;
  description: string;
  level: number;
  prerequisites?: string[];
  chakraCost?: number;
}

export interface ClanJutsu {
  name: string;
  rank: JutsuRank;
  chakraCost: number;
  description: string;
  components: JutsuComponent[];
  castingTime: string;
  range: string;
  duration: string;
  keywords: string[];
  effects: string[];
}

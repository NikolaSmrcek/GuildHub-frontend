export interface Account {
  id: string;
  email: string;
  displayName: string;
  isActive: boolean;
  isDeleted: boolean;
  characters?: Character[];
}

export interface Guild {
  id: string;
  name: string;
  realm: string;
  faction: string;
  guildType: string;
  isDeleted: boolean;
  characters?: Character[];
}

export interface Character {
  id: string;
  name: string;
  realm: string;
  faction: string;
  playerClass?: string;
  spec?: string;
  itemLevel?: number;
  accountId: string;
  account?: Account;
  guildId?: string;
  guild?: Guild;
  isDeleted: boolean;
  raidbotsReports?: RaidbotsReport[];
}

export interface RaidbotsReport {
  id: string;
  reportUrl: string;
  characterId: string;
  character?: Character;
  playerName: string;
  playerClass?: string;
  playerSpec?: string;
  playerDpsMean: number;
  isValid: boolean;
  rawData?: any;
  reportItems?: RaidbotsReportItem[];
  createdAt: string;
  updatedAt: string;
}

export interface RaidbotsReportItem {
  id: string;
  reportId: string;
  report?: RaidbotsReport;
  itemId: string;
  item?: Item;
  itemName: string;
  playerDpsMean: number;
  upgradeDpsMean: number;
  dpsImprovement: number;
  createdAt: string;
}

export interface Item {
  id: string;
  name: string;
  normalizedName: string;
  ilvl: number;
  sourcePatch: string;
}

export interface LootRequest {
  id: string;
  raidId: string;
  itemId: string;
  requesterId: string;
  priority: 'offspec' | 'main';
  reason: string;
  timestamp: string;
  status: 'open' | 'resolved' | 'withdrawn';
}

export interface CouncilVote {
  id: string;
  councilId: string;
  voterId: string;
  vote: 'yes' | 'no' | 'abstain';
  weight?: number;
  comment?: string;
  timestamp: string;
}

export interface DistributionRecord {
  id: string;
  raidId: string;
  itemId: string;
  recipientId: string;
  finalizedBy: string;
  rationale?: string;
  timestamp: string;
}

export type Difficulty = 'LFR' | 'Normal' | 'Heroic' | 'Mythic';

export interface PlayerPriority {
  id: string;
  displayName: string;
  role: string;
  priority: 'main' | 'offspec';
}

export interface ItemWithPriority extends Item {
  playersPriority: PlayerPriority[];
}

export interface DifficultyItems {
  items: ItemWithPriority[];
}

export type RaidBossMap = Record<string, Partial<Record<Difficulty, DifficultyItems>>>;
export type RaidCatalog = Record<string, RaidBossMap>;

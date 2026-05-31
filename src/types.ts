export interface Item {
  id: string;
  name: string;
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

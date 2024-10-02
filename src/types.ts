export interface Player {
  name: string;
  score: number;
  avatar: string; // avatar
}

export interface GameState {
  pits: number[];
  currentPlayer: number;
  players: Player[];
}

export interface PlayerScore {
  name: string;
  score: number;
}

export interface Announcement {
  id: string;
  content: string;
  date: string;
}

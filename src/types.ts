export interface Player {
  name: string;
  score: number;
  avatar: string; // 添加 avatar 属性
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

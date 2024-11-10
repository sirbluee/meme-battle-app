export interface MemeTemplate {
  id: string;
  url: string;
  name: string;
}

export interface GameState {
  currentRound: number;
  score: number;
  timeRemaining: number;
  playerCaption: string;
  aiCaptions: string[];
  currentMeme: MemeTemplate | null;
  phase: 'caption' | 'voting' | 'results';
}

export interface LeaderboardEntry {
  playerName: string;
  score: number;
  date: string;
  achievements: string[];
}
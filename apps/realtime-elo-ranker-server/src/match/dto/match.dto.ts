
export class MatchDto {
  winner: string | null; // L'ID du gagnant, ou null si match nul
  loser: string | null; // L'ID du perdant, ou null si match nul
  draw: boolean; // Indique si le match est un nul
}

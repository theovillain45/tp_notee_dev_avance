export class RankingEventDto {
    type: "RankingUpdate";
  
    player: {
      id: string;
      rank: number;
    };
  }
  
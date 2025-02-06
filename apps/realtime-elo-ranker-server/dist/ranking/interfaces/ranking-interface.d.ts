export interface RankingEvent {
    type: "RankingUpdate";
    player: {
        id: string;
        rank: number;
    };
}

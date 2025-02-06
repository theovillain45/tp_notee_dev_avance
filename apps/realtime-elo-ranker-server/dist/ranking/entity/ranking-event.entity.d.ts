import { Player } from 'src/player/entity/player.entity';
export declare class RankingEvent {
    id: string;
    type: string;
    player: Player;
    rank: number;
}

import { Player } from 'src/player/entity/player.entity';
export declare class Match {
    id: string;
    winner: Player | null;
    loser: Player | null;
    draw: boolean;
}

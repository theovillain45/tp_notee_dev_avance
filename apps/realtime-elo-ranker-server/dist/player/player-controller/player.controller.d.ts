import { PlayerService } from '../player-service/player.service';
import { PlayerDto } from '../dto/player.dto';
import { Player } from '../entity/player.entity';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    createPlayer(playerDto: PlayerDto): Promise<Player>;
    getAllPlayers(): Promise<Player[]>;
}

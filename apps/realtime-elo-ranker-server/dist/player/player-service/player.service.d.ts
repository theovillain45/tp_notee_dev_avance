import { Repository } from 'typeorm';
import { Player } from '../entity/player.entity';
import { PlayerDto } from '../dto/player.dto';
import { EventGateway } from '../../events/event.gateway';
export declare class PlayerService {
    private readonly playerRepository;
    private readonly eventGateway;
    constructor(playerRepository: Repository<Player>, eventGateway: EventGateway);
    createPlayer(playerDto: PlayerDto): Promise<Player>;
    getPlayers(): Promise<Player[]>;
    private calculateAverageElo;
}

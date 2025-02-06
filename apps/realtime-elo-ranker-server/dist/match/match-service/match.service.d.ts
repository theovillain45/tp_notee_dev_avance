import { Repository } from 'typeorm';
import { Player } from '../../player/entity/player.entity';
import { MatchDto } from '../dto/match.dto';
import { EventGateway } from '../../events/event.gateway';
import { Observable } from 'rxjs';
export declare class MatchService {
    private readonly playerRepository;
    private readonly eventGateway;
    constructor(playerRepository: Repository<Player>, eventGateway: EventGateway);
    processMatchResult(matchDto: MatchDto): Promise<Player[]>;
    onRankingUpdate(): Observable<any>;
}

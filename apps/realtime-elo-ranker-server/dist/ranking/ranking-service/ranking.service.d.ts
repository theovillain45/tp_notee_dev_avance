import { PlayerService } from '../../player/player-service/player.service';
import { Observable } from 'rxjs';
import { RankingEventDto } from '../dto/ranking-event.dto';
import { EventGateway } from '../../events/event.gateway';
import { Player } from '../../player/entity/player.entity';
export declare class RankingService {
    private readonly playerService;
    private readonly eventGateway;
    constructor(playerService: PlayerService, eventGateway: EventGateway);
    getRanking(): Promise<Player[]>;
    subscribeToRankingUpdates(): Observable<RankingEventDto>;
}

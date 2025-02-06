import { MatchService } from '../match-service/match.service';
import { Player } from 'src/player/entity/player.entity';
import { Observable } from 'rxjs';
import { MatchDto } from '../dto/match.dto';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    publishMatchResult(matchResult: MatchDto): Promise<Player[]>;
    rankingUpdates(): Observable<any>;
}

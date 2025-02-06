import { RankingService } from '../ranking-service/ranking.service';
import { Observable } from 'rxjs';
export declare class RankingController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    getRanking(): Promise<import("../../player/entity/player.entity").Player[]>;
    rankingUpdates(): Observable<any>;
}

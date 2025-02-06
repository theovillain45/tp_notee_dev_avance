import { Controller, Get, Sse } from '@nestjs/common';
import { RankingService } from '../ranking-service/ranking.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('api/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  async getRanking() {
    return this.rankingService.getRanking();
  }

  @Get('/events')
  @Sse()
  rankingUpdates(): Observable<any> {
    console.log('📡 Un client SSE s\'est connecté aux mises à jour du classement.');
    return this.rankingService.subscribeToRankingUpdates().pipe(
      map((event) => ({ data: event })) // ✅ Convertir pour SSE
    );
  }
}

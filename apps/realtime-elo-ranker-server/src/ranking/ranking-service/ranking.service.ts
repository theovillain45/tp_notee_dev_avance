import { Injectable } from '@nestjs/common';
import { PlayerService } from '../../player/player-service/player.service';
import { Observable } from 'rxjs';
import { RankingEventDto } from '../dto/ranking-event.dto'; // ✅ Utilisation du DTO au lieu de l'interface
import { EventGateway } from '../../events/event.gateway';
import { Player } from '../../player/entity/player.entity';

@Injectable()
export class RankingService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly eventGateway: EventGateway
  ) {}

  /**
   * 🔍 Retourne le classement trié par Elo (du plus fort au plus faible)
   */
  async getRanking(): Promise<Player[]> {
    return (await this.playerService.getPlayers()).sort(
      (a: { rank: number }, b: { rank: number }) => b.rank - a.rank
    );
  }

  /**
   * 👂 Souscrit aux mises à jour du classement en SSE
   */
  subscribeToRankingUpdates(): Observable<RankingEventDto> {
    console.log("👂 Souscription aux mises à jour du classement...");
    return this.eventGateway.onRankingUpdate() as Observable<RankingEventDto>;
  }
}

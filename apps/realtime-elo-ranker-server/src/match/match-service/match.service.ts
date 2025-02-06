import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../player/entity/player.entity';
import { MatchDto } from '../dto/match.dto';
import { EventGateway } from '../../events/event.gateway';
import { Observable } from 'rxjs';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>, // ✅ On garde uniquement les joueurs en base

    private readonly eventGateway: EventGateway,
  ) {}

  /**
   * ✅ Traite le résultat d'un match et met à jour le classement
   */
  async processMatchResult(matchDto: MatchDto): Promise<Player[]> {
    let winner: Player | null = null;
    let loser: Player | null = null;
  
    if (!matchDto.draw) {
      if (!matchDto.winner || !matchDto.loser) {
        console.error('❌ Erreur: winnerId et loserId sont null.');
        throw new Error('winnerId et loserId ne peuvent pas être null.');
      }
  
      winner = await this.playerRepository.findOne({ where: { id: matchDto.winner } });
      loser = await this.playerRepository.findOne({ where: { id: matchDto.loser } });
  
      if (!winner || !loser) {
        console.error('❌ Erreur: Joueur introuvable.', { winner, loser });
        throw new Error('Un ou plusieurs joueurs introuvables.');
      }
  
      // ✅ Calcul du classement Elo
      const K = 32;
      const expectedScore1 = 1 / (1 + Math.pow(10, (loser.rank - winner.rank) / 400));
      const expectedScore2 = 1 / (1 + Math.pow(10, (winner.rank - loser.rank) / 400));
  
      winner.rank += Math.round(K * (1 - expectedScore1));
      loser.rank += Math.round(K * (0 - expectedScore2));
  
      await this.playerRepository.save([winner, loser]);
    }
  
    // 📡 Récupérer les joueurs mis à jour
    const updatedPlayers = await this.playerRepository.find();
  
    console.log("📡 Mise à jour des joueurs :", updatedPlayers);
  
    // 🔥 Envoyer `updatedPlayers` une seule fois au `EventGateway`
    this.eventGateway.emitRankingUpdate({ updatedPlayers });
  
    return updatedPlayers;
  }
  
  

  /**
   * 📡 Écoute les mises à jour du classement en temps réel
   */
  onRankingUpdate(): Observable<any> {
    return this.eventGateway.onRankingUpdate();
  }
}

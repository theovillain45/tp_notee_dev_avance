import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entity/player.entity';
import { PlayerDto } from '../dto/player.dto';
import { EventGateway } from '../../events/event.gateway';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>, // Gestion via TypeORM
    private readonly eventGateway: EventGateway,
  ) {}

  /**
   * Créer un joueur et l'insérer en base de données SQLite
   */
  async createPlayer(playerDto: PlayerDto): Promise<Player> {
    const newPlayer = this.playerRepository.create({
      id: playerDto.id,
      rank: playerDto.rank ?? (await this.calculateAverageElo()),
    });

    const savedPlayer = await this.playerRepository.save(newPlayer);

    console.log('Joueur créé :', savedPlayer);
    console.log('Envoi de mise à jour du classement...');

    // Émettre un événement SSE avec le bon format
    this.eventGateway.emitRankingUpdate({
      type: 'RankingUpdate',
      player: { id: savedPlayer.id, rank: savedPlayer.rank },
    });

    return savedPlayer;
  }

  /**
   * Récupérer tous les joueurs depuis la base SQLite
   */
  async getPlayers(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  /**
   * Calculer le score Elo moyen des joueurs en base
   */
  private async calculateAverageElo(): Promise<number> {
    const players = await this.getPlayers();
    if (players.length === 0) return 1000;
    
    const totalElo = players.reduce((sum, player) => sum + player.rank, 0);
    return totalElo / players.length;
  }
}

import { Controller, Post, Body, Get, Sse } from '@nestjs/common';
import { MatchService } from '../match-service/match.service';
import { Match } from '../entity/match.entity';
import { Player } from 'src/player/entity/player.entity'; // Utilisation de l'entité TypeORM
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchDto } from '../dto/match.dto';

@Controller('api/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  /**
   * Publier le résultat d'un match et mettre à jour le classement en base
   */
  @Post()
  async publishMatchResult(@Body() matchResult: MatchDto): Promise<Player[]> {
    console.log('Match terminé, mise à jour du classement...');
  
    // Vérifier si `winner` et `loser` existent avant de les utiliser
    const matchDto: MatchDto = {
      winner: matchResult.winner ? (typeof matchResult.winner === 'object' ? matchResult.winner : matchResult.winner) : null,
      loser: matchResult.loser ? (typeof matchResult.loser === 'object' ? matchResult.loser : matchResult.loser) : null,
      draw: matchResult.draw,
    };
  
    return this.matchService.processMatchResult(matchDto);
  }
  
  

  /**
   * Route SSE pour écouter les mises à jour du classement en direct
   */
  @Get('/events')
  @Get('/ranking/events')
  @Sse()
  rankingUpdates(): Observable<any> {
    console.log('Un client SSE s\'est connecté aux mises à jour du classement.');
    return this.matchService.onRankingUpdate().pipe(
      map((event) => {
        if (!event || !event.updatedPlayers || event.updatedPlayers.length === 0) {
          console.error("Erreur : L'événement SSE est vide !");
          return { data: { type: "Error", message: "Invalid SSE event" } };
        }
  
        console.log("Envoi SSE au client :", event);
        return { data: event };
      })
    );
  }
}

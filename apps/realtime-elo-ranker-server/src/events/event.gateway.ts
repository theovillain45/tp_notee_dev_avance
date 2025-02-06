import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs'; // Importation de `fromEvent`

@Injectable()
export class EventGateway {
  constructor(private readonly eventEmitter: EventEmitter2) {}

/**
   * Émettre une mise à jour du classement (pour l'ajout et la mise à jour après un match)
   */
emitRankingUpdate(update: any) {
  console.log("Émission d'une mise à jour du classement :", update);

  // Cas 1 : Mise à jour du classement après un match (tableau `updatedPlayers`)
  if (update.updatedPlayers && Array.isArray(update.updatedPlayers)) {
    update.updatedPlayers.forEach((player: { id: any; rank: any; }) => {
      this.eventEmitter.emit('rankingUpdate', {
        type: 'RankingUpdate',
        player: { id: player.id, rank: player.rank }
      });
    });
    return;
  }

  // Cas 2 : Ajout d'un nouveau joueur (utilisation directe de `update`)
  if (update.player) {
    this.eventEmitter.emit('rankingUpdate', update);
    return;
  }

  // Si on arrive ici, `update` est invalide
  console.error("Erreur : Format d'événement `rankingUpdate` invalide :", update);
}


onRankingUpdate(): Observable<any> {
  console.log("Un client SSE s'est connecté aux mises à jour du classement.");
  return fromEvent(this.eventEmitter, 'rankingUpdate'); // Utilisation de `fromEvent`
}


    // Émettre un événement quand un match se termine
    emitMatchFinished(update: any) {
      console.log("Émission d'une mise à jour de match terminé :", update);
      this.eventEmitter.emit('matchFinished', update);
    }
  
    // Écouter l'événement en temps réel pour SSE
    onMatchFinished(): Observable<any> {
      return fromEvent(this.eventEmitter, 'matchFinished'); // SSE en temps réel
    }
    
}

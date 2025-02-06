import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';
import { RankingModule } from './ranking/ranking.module';
import { MatchModule } from './match/match.module';
import { EventsModule } from './events/events.module';
import { Player } from './player/entity/player.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite', // Base de données SQLite
      entities: [Player], // Ajoute l'entité Player
      synchronize: true, // Active les migrations automatiques 
    }),
    TypeOrmModule.forFeature([Player]), // Ajout du repository Player
    PlayerModule,
    RankingModule,
    MatchModule,
    EventsModule,
  ],
})
export class AppModule {}

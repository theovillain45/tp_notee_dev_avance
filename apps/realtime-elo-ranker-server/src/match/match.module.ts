import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchController } from './match-controller/match.controller';
import { MatchService } from './match-service/match.service';
import { Player } from 'src/player/entity/player.entity';
import { Match } from './entity/match.entity';
import { EventGateway } from '../events/event.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Match]), // ✅ Ajout de Player ici
  ],
  controllers: [MatchController],
  providers: [MatchService, EventGateway],
  exports: [MatchService], // ✅ Si un autre module a besoin de MatchService
})
export class MatchModule {}

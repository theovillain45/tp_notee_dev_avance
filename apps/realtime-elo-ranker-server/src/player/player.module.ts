import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player-controller/player.controller';
import { PlayerService } from './player-service/player.service';
import { EventGateway } from 'src/events/event.gateway';
import { Player } from './entity/player.entity'; // Import de l'entité Player

@Module({
  imports: [TypeOrmModule.forFeature([Player])], // Ajoute TypeORM
  controllers: [PlayerController],
  providers: [PlayerService, EventGateway],
  exports: [PlayerService],
})
export class PlayerModule {}

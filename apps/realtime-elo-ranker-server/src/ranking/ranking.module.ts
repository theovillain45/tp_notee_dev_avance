import { Module } from '@nestjs/common';
import { RankingController } from './ranking-controller/ranking.controller';
import { RankingService } from './ranking-service/ranking.service';
import { PlayerModule } from 'src/player/player.module';
import { EventGateway } from 'src/events/event.gateway';


@Module({
  controllers: [RankingController],
  providers: [RankingService, EventGateway],
  imports: [PlayerModule] // Assuming PlayerModule is imported and configured properly.
})
export class RankingModule {}
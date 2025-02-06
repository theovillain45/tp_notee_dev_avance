import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from '../ranking-service/ranking.service';
import { PlayerService } from '../../player/player-service/player.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../player/entity/player.entity';

describe('RankingController - Tests', () => {
  let rankingController: RankingController;
  let rankingService: RankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        {
          provide: RankingService,
          useValue: {
            getRanking: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: PlayerService,
          useValue: {
            getPlayers: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
      ],
    }).compile();

    rankingController = module.get<RankingController>(RankingController);
    rankingService = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(rankingController).toBeDefined();
  });
});

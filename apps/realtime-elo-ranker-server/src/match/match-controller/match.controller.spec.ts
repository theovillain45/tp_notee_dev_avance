import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from '../match-service/match.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../player/entity/player.entity';
import { EventGateway } from '../../events/event.gateway';

describe('MatchController - Tests', () => {
  let matchController: MatchController;
  let matchService: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        {
          provide: MatchService,
          useValue: {
            processMatchResult: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
        {
          provide: EventGateway,
          useValue: {
            emitRankingUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    matchController = module.get<MatchController>(MatchController);
    matchService = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(matchController).toBeDefined();
  });
});

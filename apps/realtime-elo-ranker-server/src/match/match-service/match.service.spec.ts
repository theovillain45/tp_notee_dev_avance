import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from '../match-service/match.service';
import { Repository } from 'typeorm';
import { Player } from '../../player/entity/player.entity';
import { EventGateway } from '../../events/event.gateway';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MatchService - Tests Unitaires', () => {
  let matchService: MatchService;
  let playerRepository: Repository<Player>;
  let eventGateway: EventGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
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

    matchService = module.get<MatchService>(MatchService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
    eventGateway = module.get<EventGateway>(EventGateway);
  });

  it('🧪 doit être défini', () => {
    expect(matchService).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entity/player.entity';
import { EventGateway } from '../../events/event.gateway';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('PlayerService - Tests unitaires', () => {
  let playerService: PlayerService;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository, //  Mock du repository
        },
        {
          provide: EventGateway,
          useValue: { emitRankingUpdate: jest.fn() },
        },
        {
          provide: EventEmitter2, //  Mock EventEmitter2
          useValue: { emit: jest.fn(), on: jest.fn() },
        },
      ],
    }).compile();

    playerService = module.get<PlayerService>(PlayerService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it(' Devrait être défini', () => {
    expect(playerService).toBeDefined();
  });

  it(' Devrait créer un joueur avec un Elo initial', async () => {
    const playerDto = { id: 'player1', rank: 1000 };
    const createdPlayer = { id: 'player1', rank: 1000 };

    jest.spyOn(playerRepository, 'create').mockReturnValue(createdPlayer);
    jest.spyOn(playerRepository, 'save').mockResolvedValue(createdPlayer);

    const result = await playerService.createPlayer(playerDto);
    expect(result).toEqual(createdPlayer);
  });
});

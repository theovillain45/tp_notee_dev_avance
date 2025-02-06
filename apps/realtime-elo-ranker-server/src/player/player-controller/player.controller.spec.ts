import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from '../player-service/player.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entity/player.entity';
import { EventGateway } from '../../events/event.gateway';

describe('PlayerController - Tests unitaire', () => {
  let playerController: PlayerController;
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository, // Mock du repository
        },
        {
          provide: EventGateway,
          useValue: {
            emitRankingUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    playerController = module.get<PlayerController>(PlayerController);
    playerService = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(playerController).toBeDefined();
  });

  it('should create a player', async () => {
    const playerDto = { id: 'player1', rank: 1000 };
    const createdPlayer = { id: 'player1', rank: 1000 };
  
    jest.spyOn(playerService, 'createPlayer').mockResolvedValue(createdPlayer);
  
    const result = await playerController.createPlayer(playerDto);
    expect(result).toEqual(createdPlayer);
  });
  
});


describe('PlayerController - Tests d\'intégration', () => {
  let playerController: PlayerController;
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
    })
      .useMocker((token) => {
        if (token === PlayerService) {
          return {
            createPlayer: jest.fn().mockResolvedValue({ id: 'player1', rank: 1200 }),
            getPlayers: jest.fn().mockResolvedValue([{ id: 'player1', rank: 1200 }]),
          };
        }
      })
      .compile();

    playerController = module.get<PlayerController>(PlayerController);
    playerService = module.get<PlayerService>(PlayerService);
  });

  it('🧪 Devrait créer un joueur avec succès', async () => {
    const player = await playerController.createPlayer({ id: 'player1', rank: 1200 });
    expect(player).toEqual({ id: 'player1', rank: 1200 });
  });

  it('🧪 Devrait récupérer tous les joueurs', async () => {
    const players = await playerController.getAllPlayers();
    expect(players).toHaveLength(1);
    expect(players[0].id).toBe('player1');
  });
});


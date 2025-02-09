import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from '../player-service/player.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entity/player.entity';
import { EventGateway } from '../../events/event.gateway';

describe('PlayerController - Tests Unitaires', () => {
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

  it(' Devrait être défini', () => {
    expect(playerController).toBeDefined();
  });

  it(' Devrait créer un joueur avec succès', async () => {
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
  let playerRepository: jest.Mocked<Partial<Repository<Player>>>;

  beforeEach(async () => {
    //  Mock du repository TypeORM
    playerRepository = {
      create: jest.fn().mockImplementation((dto) => ({ ...dto })), //  Retourne un objet Player
      save: jest.fn().mockImplementation((player) => Promise.resolve(player)), //  Simule la sauvegarde
      find: jest.fn().mockResolvedValue([{ id: 'player1', rank: 1200 }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useValue: playerRepository, //  Mock du repository
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

  it(' Devrait créer un joueur et l\'ajouter à la BD', async () => {
    const playerDto = { id: 'player1', rank: 1200 };

    const player = await playerController.createPlayer(playerDto);

    expect(player).toEqual(playerDto);
    expect(playerRepository.create).toHaveBeenCalledWith(playerDto);
    expect(playerRepository.save).toHaveBeenCalled();
  });

  it(' Devrait récupérer tous les joueurs correctement', async () => {
    const players = await playerController.getAllPlayers();

    expect(players).toHaveLength(1);
    expect(players[0].id).toBe('player1');
    expect(playerRepository.find).toHaveBeenCalled();
  });
});

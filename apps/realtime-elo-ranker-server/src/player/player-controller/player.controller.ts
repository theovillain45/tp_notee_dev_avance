import { Controller, Post, Get, Body } from '@nestjs/common';
import { PlayerService } from '../player-service/player.service';
import { PlayerDto } from '../dto/player.dto';
import { Player } from '../entity/player.entity';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async createPlayer(@Body() playerDto: PlayerDto): Promise<Player> {
    return await this.playerService.createPlayer(playerDto);
  }

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return await this.playerService.getPlayers();
  }
}

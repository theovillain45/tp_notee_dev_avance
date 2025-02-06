"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("../entity/player.entity");
const event_gateway_1 = require("../../events/event.gateway");
let PlayerService = class PlayerService {
    constructor(playerRepository, eventGateway) {
        this.playerRepository = playerRepository;
        this.eventGateway = eventGateway;
    }
    async createPlayer(playerDto) {
        const newPlayer = this.playerRepository.create({
            id: playerDto.id,
            rank: playerDto.rank ?? (await this.calculateAverageElo()),
        });
        const savedPlayer = await this.playerRepository.save(newPlayer);
        console.log('🔥 Joueur créé :', savedPlayer);
        console.log('📢 Envoi de mise à jour du classement...');
        this.eventGateway.emitRankingUpdate({
            type: 'RankingUpdate',
            player: { id: savedPlayer.id, rank: savedPlayer.rank },
        });
        return savedPlayer;
    }
    async getPlayers() {
        return await this.playerRepository.find();
    }
    async calculateAverageElo() {
        const players = await this.getPlayers();
        if (players.length === 0)
            return 1000;
        const totalElo = players.reduce((sum, player) => sum + player.rank, 0);
        return totalElo / players.length;
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_gateway_1.EventGateway])
], PlayerService);
//# sourceMappingURL=player.service.js.map
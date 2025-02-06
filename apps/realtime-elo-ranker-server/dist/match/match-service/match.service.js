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
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("../../player/entity/player.entity");
const event_gateway_1 = require("../../events/event.gateway");
let MatchService = class MatchService {
    constructor(playerRepository, eventGateway) {
        this.playerRepository = playerRepository;
        this.eventGateway = eventGateway;
    }
    async processMatchResult(matchDto) {
        let winner = null;
        let loser = null;
        if (!matchDto.draw) {
            if (!matchDto.winner || !matchDto.loser) {
                console.error('❌ Erreur: winnerId et loserId sont null.');
                throw new Error('winnerId et loserId ne peuvent pas être null.');
            }
            winner = await this.playerRepository.findOne({ where: { id: matchDto.winner } });
            loser = await this.playerRepository.findOne({ where: { id: matchDto.loser } });
            if (!winner || !loser) {
                console.error('❌ Erreur: Joueur introuvable.', { winner, loser });
                throw new Error('Un ou plusieurs joueurs introuvables.');
            }
            const K = 32;
            const expectedScore1 = 1 / (1 + Math.pow(10, (loser.rank - winner.rank) / 400));
            const expectedScore2 = 1 / (1 + Math.pow(10, (winner.rank - loser.rank) / 400));
            winner.rank += Math.round(K * (1 - expectedScore1));
            loser.rank += Math.round(K * (0 - expectedScore2));
            await this.playerRepository.save([winner, loser]);
        }
        const updatedPlayers = await this.playerRepository.find();
        console.log("📡 Mise à jour des joueurs :", updatedPlayers);
        this.eventGateway.emitRankingUpdate({ updatedPlayers });
        return updatedPlayers;
    }
    onRankingUpdate() {
        return this.eventGateway.onRankingUpdate();
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_gateway_1.EventGateway])
], MatchService);
//# sourceMappingURL=match.service.js.map
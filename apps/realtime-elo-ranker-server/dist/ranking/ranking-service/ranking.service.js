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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("../../player/player-service/player.service");
const event_gateway_1 = require("../../events/event.gateway");
let RankingService = class RankingService {
    constructor(playerService, eventGateway) {
        this.playerService = playerService;
        this.eventGateway = eventGateway;
    }
    async getRanking() {
        return (await this.playerService.getPlayers()).sort((a, b) => b.rank - a.rank);
    }
    subscribeToRankingUpdates() {
        console.log("👂 Souscription aux mises à jour du classement...");
        return this.eventGateway.onRankingUpdate();
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [player_service_1.PlayerService,
        event_gateway_1.EventGateway])
], RankingService);
//# sourceMappingURL=ranking.service.js.map
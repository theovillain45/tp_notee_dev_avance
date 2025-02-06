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
exports.RankingEvent = void 0;
const typeorm_1 = require("typeorm");
const player_entity_1 = require("../../player/entity/player.entity");
let RankingEvent = class RankingEvent {
};
exports.RankingEvent = RankingEvent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RankingEvent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'RankingUpdate' }),
    __metadata("design:type", String)
], RankingEvent.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => player_entity_1.Player, { nullable: false }),
    __metadata("design:type", player_entity_1.Player)
], RankingEvent.prototype, "player", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], RankingEvent.prototype, "rank", void 0);
exports.RankingEvent = RankingEvent = __decorate([
    (0, typeorm_1.Entity)()
], RankingEvent);
//# sourceMappingURL=ranking-event.entity.js.map
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
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Snippet = class Snippet extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Snippet.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Snippet.prototype, "content", void 0);
__decorate([
    typeorm_1.Column("timestamp", { default: new Date() }),
    __metadata("design:type", Date)
], Snippet.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 255 }),
    __metadata("design:type", String)
], Snippet.prototype, "language", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Snippet.prototype, "visibility", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Snippet.prototype, "title", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Snippet.prototype, "theme", void 0);
__decorate([
    typeorm_1.Column("text", { array: true }),
    __metadata("design:type", Array)
], Snippet.prototype, "tags", void 0);
__decorate([
    typeorm_1.Column("text"),
    typeorm_1.ManyToOne(() => User_1.User, user => user.snippets),
    __metadata("design:type", String)
], Snippet.prototype, "user", void 0);
Snippet = __decorate([
    typeorm_1.Entity("snippets")
], Snippet);
exports.Snippet = Snippet;
//# sourceMappingURL=Snippet.js.map
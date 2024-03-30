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
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const tba_entity_1 = require("../tba/tba.entity");
let User = class User extends sequelize_typescript_1.Model {
};
exports.User = User;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(190), allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "user_pw", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(50), allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "walletAddress", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => tba_entity_1.TBA, { foreignKey: 'user_id', as: 'userTBA' }),
    __metadata("design:type", Array)
], User.prototype, "tba", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true })
], User);
//# sourceMappingURL=user.entity.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("./user/user.entity");
const user_module_1 = require("./user/user.module");
const user_repo_1 = require("./user/user.repo");
const user_service_1 = require("./user/user.service");
const user_con_1 = require("./user/user.con");
const ticket_controller_1 = require("./ticket/ticket.controller");
const ticket_service_1 = require("./ticket/ticket.service");
const ticket_entity_1 = require("./ticket/ticket.entity");
const ticket_module_1 = require("./ticket/ticket.module");
const tba_entity_1 = require("./tba/tba.entity");
const tba_module_1 = require("./tba/tba.module");
const ticket_repo_1 = require("./ticket/ticket.repo");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: "./uploads",
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'mysql',
                host: process.env.DB_HOST,
                port: 3306,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                models: [user_entity_1.User, tba_entity_1.TBA, ticket_entity_1.Ticket],
                synchronize: true,
                autoLoadModels: true,
            }),
            user_entity_1.User, user_module_1.UserModule,
            tba_entity_1.TBA, tba_module_1.TBAModule, ticket_module_1.TicketModule
        ],
        controllers: [user_con_1.UserController, ticket_controller_1.TicketController],
        providers: [user_repo_1.UserRepository, user_service_1.UserService, ticket_service_1.TicketService, ticket_repo_1.TicketRepository],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
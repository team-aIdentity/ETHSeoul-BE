import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

// Model - Repository - Service - Controller - Client
import { User } from "./user/user.entity";
import { UserModule } from "./user/user.module";
import { UserRepository } from "./user/user.repo";
import { UserService } from "./user/user.service";
import { UserController } from "./user/user.con";
import { TicketController } from "./ticket/ticket.controller";
import { TicketService } from "./ticket/ticket.service";
import { Ticket } from "./ticket/ticket.entity";
import { TicketModule } from "./ticket/ticket.module";

@Module({
  imports: [
    MulterModule.register({
      dest: "./uploads",
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Ticket],
      synchronize: true, // 처음 table 생성한 뒤에는 false로 변경
      autoLoadModels: true,
    }),
    User,
    UserModule,
    TicketModule,
  ],
  controllers: [UserController, TicketController],
  providers: [UserRepository, UserService, TicketService],
})
export class AppModule {}

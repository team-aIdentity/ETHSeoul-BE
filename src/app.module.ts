import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// Model - Repository - Service - Controller - Client
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { UserRepository } from './user/user.repo';
import { UserService } from './user/user.service';
import { UserController } from './user/user.con';
import { TBA } from './tba/tba.entity';
import { TBAModule } from './tba/tba.module';
import { TBAController } from './tba/tba.con';
import { TBARepository } from './tba/tba.repo';
import { TBAService } from './tba/tba.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true
    }),
    SequelizeModule.forRoot({
      dialect : 'mysql',
      host : process.env.DB_HOST ,
      port : 3306,
      username : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
      models : [User, TBA],
      synchronize : true, // 처음 table 생성한 뒤에는 false로 변경
      autoLoadModels: true,
    }),
    User, UserModule,
    TBA, TBAModule
  ],
  controllers: [UserController, TBAController],
  providers: [UserRepository, UserService, TBARepository, TBAService],
})
export class AppModule {}

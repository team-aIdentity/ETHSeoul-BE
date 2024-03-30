import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TBAService } from "./tba.service";
import { TBAController } from "./tba.con";
import { TBA } from "./tba.entity";
import { TBARepository } from "./tba.repo";

@Module({
    imports : [SequelizeModule.forFeature([TBA])],
    providers : [TBARepository, TBAService],
    controllers : [TBAController],
    exports : [SequelizeModule]
})

export class TBAModule {}
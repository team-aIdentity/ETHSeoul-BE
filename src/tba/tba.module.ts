import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TBA } from "./tba.entity";

@Module({
    imports : [SequelizeModule.forFeature([TBA])],
    providers : [],
    controllers : [],
    exports : [SequelizeModule]
})

export class TBAModule {}
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TicketController } from "./ticket.controller";
import { Ticket } from "./ticket.entity";
import { TicketRepository } from "./ticket.repo";

@Module({
  imports: [SequelizeModule.forFeature([Ticket])],
  providers: [TicketRepository],
  controllers: [TicketController],
  exports: [SequelizeModule],
})
export class TicketModule {}

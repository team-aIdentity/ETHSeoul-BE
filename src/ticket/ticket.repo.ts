import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Ticket } from "./ticket.entity";

@Injectable()
export class TicketRepository {
  constructor(
    @InjectModel(Ticket)
    private ticketModel: typeof Ticket
  ) {}

  // 전체 유저 반환
  findAll(): Promise<Ticket[]> {
    return this.ticketModel.findAll();
  }

  // 특정 유저 반환 (id)
  findOneById(id: number): Promise<Ticket | null> {
    return this.ticketModel.findOne({ where: { id } });
  }

  // 유저 추가
  async create(ticketData: Partial<Ticket>): Promise<Ticket> {
    return this.ticketModel.create(ticketData);
  }

  // 유저 삭제 (id)
  async remove(id: number): Promise<void> {
    const ticket = await this.findOneById(id);
    await ticket.destroy();
  }

  async decreaseTicketAmount(id: number, amount: number): Promise<void> {
    const ticket = await this.ticketModel.findOne({ where: { id } });
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.ticket_amount -= amount;

    await ticket.save();
  }
}

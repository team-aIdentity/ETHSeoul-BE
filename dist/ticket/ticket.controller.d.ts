/// <reference types="multer" />
import { TicketRepository } from "./ticket.repo";
export declare class TicketController {
    private readonly ticketRepository;
    private ipfs;
    private contractAddress;
    private web3;
    private contract;
    constructor(ticketRepository: TicketRepository);
    issueTicket(image: Express.Multer.File, body: {
        amount: number;
        ticket_name: string;
        agent: string;
    }): Promise<{
        ipfsHash: string;
        transactionHash: any;
        uri: string;
    }>;
    transferTicket(body: {
        ticketId: number;
        to: string;
        amount: number;
    }): Promise<{
        transactionHash: any;
    }>;
}

export declare class TicketController {
    private ipfs;
    private contractAddress;
    private web3;
    private contract;
    constructor();
    issueTicket(image: Express.Multer.File, body: {
        amount: number;
    }): Promise<{
        ipfsHash: string;
        transactionHash: any;
    }>;
}

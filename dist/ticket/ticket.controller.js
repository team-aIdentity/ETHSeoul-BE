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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const ipfs_http_client_1 = require("ipfs-http-client");
const web3_1 = require("web3");
const ticket_repo_1 = require("./ticket.repo");
let TicketController = class TicketController {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
        this.ipfs = (0, ipfs_http_client_1.create)({ host: "localhost", port: 5001, protocol: "http" });
        this.contractAddress = "0x3D27ef41Ce71826C3DdA04D6aF12aCF62ED2D3d4";
        this.web3 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://bitter-orbital-moon.ethereum-sepolia.quiknode.pro/9f309bac50790fb0d5c092a40730960425ea39df/"));
        const abi = [
            {
                type: "constructor",
                inputs: [
                    {
                        name: "_counterContract",
                        type: "address",
                        internalType: "address",
                    },
                    { name: "_baseURI", type: "string", internalType: "string" },
                ],
                stateMutability: "nonpayable",
            },
            {
                type: "function",
                name: "balanceOf",
                inputs: [
                    { name: "account", type: "address", internalType: "address" },
                    { name: "id", type: "uint256", internalType: "uint256" },
                ],
                outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
                stateMutability: "view",
            },
            {
                type: "function",
                name: "balanceOfBatch",
                inputs: [
                    {
                        name: "accounts",
                        type: "address[]",
                        internalType: "address[]",
                    },
                    { name: "ids", type: "uint256[]", internalType: "uint256[]" },
                ],
                outputs: [{ name: "", type: "uint256[]", internalType: "uint256[]" }],
                stateMutability: "view",
            },
            {
                type: "function",
                name: "balanceOfTicket",
                inputs: [
                    { name: "ticketName", type: "string", internalType: "string" },
                ],
                outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
                stateMutability: "view",
            },
            {
                type: "function",
                name: "baseURI",
                inputs: [],
                outputs: [{ name: "", type: "string", internalType: "string" }],
                stateMutability: "view",
            },
            {
                type: "function",
                name: "counterContract",
                inputs: [],
                outputs: [
                    { name: "", type: "address", internalType: "contract Counter" },
                ],
                stateMutability: "view",
            },
            {
                type: "function",
                name: "hasTickets",
                inputs: [
                    { name: "ticketName", type: "string", internalType: "string" },
                    { name: "amount", type: "uint256", internalType: "uint256" },
                ],
                outputs: [{ name: "", type: "bool", internalType: "bool" }],
                stateMutability: "view",
            },
            {
                type: "function",
                name: "isApprovedForAll",
                inputs: [
                    { name: "account", type: "address", internalType: "address" },
                    { name: "operator", type: "address", internalType: "address" },
                ],
                outputs: [{ name: "", type: "bool", internalType: "bool" }],
                stateMutability: "view",
            },
            {
                type: "function",
                name: "issueTicket",
                inputs: [
                    { name: "ticketName", type: "string", internalType: "string" },
                    { name: "ticketId", type: "uint256", internalType: "uint256" },
                    { name: "amount", type: "uint256", internalType: "uint256" },
                ],
                outputs: [],
                stateMutability: "nonpayable",
            },
            {
                type: "function",
                name: "safeBatchTransferFrom",
                inputs: [
                    { name: "from", type: "address", internalType: "address" },
                    { name: "to", type: "address", internalType: "address" },
                    { name: "ids", type: "uint256[]", internalType: "uint256[]" },
                    { name: "values", type: "uint256[]", internalType: "uint256[]" },
                    { name: "data", type: "bytes", internalType: "bytes" },
                ],
                outputs: [],
                stateMutability: "nonpayable",
            },
            {
                type: "function",
                name: "safeTransferFrom",
                inputs: [
                    { name: "from", type: "address", internalType: "address" },
                    { name: "to", type: "address", internalType: "address" },
                    { name: "id", type: "uint256", internalType: "uint256" },
                    { name: "value", type: "uint256", internalType: "uint256" },
                    { name: "data", type: "bytes", internalType: "bytes" },
                ],
                outputs: [],
                stateMutability: "nonpayable",
            },
            {
                type: "function",
                name: "setApprovalForAll",
                inputs: [
                    { name: "operator", type: "address", internalType: "address" },
                    { name: "approved", type: "bool", internalType: "bool" },
                ],
                outputs: [],
                stateMutability: "nonpayable",
            },
            {
                type: "function",
                name: "setBaseURI",
                inputs: [{ name: "_baseURI", type: "string", internalType: "string" }],
                outputs: [],
                stateMutability: "nonpayable",
            },
            {
                type: "function",
                name: "supportsInterface",
                inputs: [
                    { name: "interfaceId", type: "bytes4", internalType: "bytes4" },
                ],
                outputs: [{ name: "", type: "bool", internalType: "bool" }],
                stateMutability: "view",
            },
            {
                type: "function",
                name: "uri",
                inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
                outputs: [{ name: "", type: "string", internalType: "string" }],
                stateMutability: "view",
            },
            {
                type: "event",
                name: "ApprovalForAll",
                inputs: [
                    {
                        name: "account",
                        type: "address",
                        indexed: true,
                        internalType: "address",
                    },
                    {
                        name: "operator",
                        type: "address",
                        indexed: true,
                        internalType: "address",
                    },
                    {
                        name: "approved",
                        type: "bool",
                        indexed: false,
                        internalType: "bool",
                    },
                ],
                anonymous: false,
            },
            {
                type: "event",
                name: "TicketIssued",
                inputs: [
                    {
                        name: "ticketName",
                        type: "string",
                        indexed: true,
                        internalType: "string",
                    },
                    {
                        name: "ticketId",
                        type: "uint256",
                        indexed: true,
                        internalType: "uint256",
                    },
                    {
                        name: "user",
                        type: "address",
                        indexed: true,
                        internalType: "address",
                    },
                    {
                        name: "amount",
                        type: "uint256",
                        indexed: false,
                        internalType: "uint256",
                    },
                ],
                anonymous: false,
            },
            {
                type: "event",
                name: "TransferBatch",
                inputs: [
                    {
                        name: "operator",
                        type: "address",
                        indexed: true,
                        internalType: "address",
                    },
                    {
                        name: "from",
                        type: "address",
                        indexed: true,
                        internalType: "address",
                    },
                    {
                        name: "to",
                        type: "address",
                        indexed: true,
                        internalType: "address",
                    },
                    {
                        name: "ids",
                        type: "uint256[]",
                        indexed: false,
                        internalType: "uint256[]",
                    },
                    {
                        name: "values",
                        type: "uint256[]",
                        indexed: false,
                        internalType: "uint256[]",
                    },
                ],
                anonymous: false,
            },
            {
                type: "event",
                name: "TransferSingle",
                inputs: [
                    {
                        name: "operator",
                        type: "address",
                        indexed: true,
                        internalType: "address",
                    },
                    {
                        name: "from",
                        type: "address",
                        indexed: true,
                        internalType: "address",
                    },
                    {
                        name: "to",
                        type: "address",
                        indexed: true,
                        internalType: "address",
                    },
                    {
                        name: "id",
                        type: "uint256",
                        indexed: false,
                        internalType: "uint256",
                    },
                    {
                        name: "value",
                        type: "uint256",
                        indexed: false,
                        internalType: "uint256",
                    },
                ],
                anonymous: false,
            },
            {
                type: "event",
                name: "URI",
                inputs: [
                    {
                        name: "value",
                        type: "string",
                        indexed: false,
                        internalType: "string",
                    },
                    {
                        name: "id",
                        type: "uint256",
                        indexed: true,
                        internalType: "uint256",
                    },
                ],
                anonymous: false,
            },
            {
                type: "error",
                name: "ERC1155InsufficientBalance",
                inputs: [
                    { name: "sender", type: "address", internalType: "address" },
                    { name: "balance", type: "uint256", internalType: "uint256" },
                    { name: "needed", type: "uint256", internalType: "uint256" },
                    { name: "tokenId", type: "uint256", internalType: "uint256" },
                ],
            },
            {
                type: "error",
                name: "ERC1155InvalidApprover",
                inputs: [
                    { name: "approver", type: "address", internalType: "address" },
                ],
            },
            {
                type: "error",
                name: "ERC1155InvalidArrayLength",
                inputs: [
                    { name: "idsLength", type: "uint256", internalType: "uint256" },
                    { name: "valuesLength", type: "uint256", internalType: "uint256" },
                ],
            },
            {
                type: "error",
                name: "ERC1155InvalidOperator",
                inputs: [
                    { name: "operator", type: "address", internalType: "address" },
                ],
            },
            {
                type: "error",
                name: "ERC1155InvalidReceiver",
                inputs: [
                    { name: "receiver", type: "address", internalType: "address" },
                ],
            },
            {
                type: "error",
                name: "ERC1155InvalidSender",
                inputs: [{ name: "sender", type: "address", internalType: "address" }],
            },
            {
                type: "error",
                name: "ERC1155MissingApprovalForAll",
                inputs: [
                    { name: "operator", type: "address", internalType: "address" },
                    { name: "owner", type: "address", internalType: "address" },
                ],
            },
        ];
        this.contract = new this.web3.eth.Contract(abi, this.contractAddress);
    }
    async issueTicket(image, body) {
        const imageBuffer = Buffer.from(image.buffer);
        const { cid } = await this.ipfs.add(imageBuffer);
        const uri = `http://localhost:5001/ipfs/${cid}`;
        const ticketName = body.ticket_name;
        const account = (await this.web3.eth.getAccounts())[0];
        const tx = await this.contract.methods
            .issueTicket(ticketName, body.amount, uri)
            .send({ from: account });
        this.ticketRepository.create({
            ticket_cid: cid.toString(),
            ticket_name: ticketName,
            ticket_amount: body.amount,
            ticket_agent: body.agent,
            ticket_uri: uri,
        });
        return {
            ipfsHash: cid.toString(),
            transactionHash: tx.transactionHash,
            uri: uri,
        };
    }
    async transferTicket(body) {
        const account = (await this.web3.eth.getAccounts())[0];
        const tx = await this.contract.methods
            .safeTransferFrom(account, body.to, body.ticketId, body.amount, "")
            .send({ from: account });
        await this.ticketRepository.decreaseTicketAmount(body.ticketId, body.amount);
        return {
            transactionHash: tx.transactionHash,
        };
    }
};
exports.TicketController = TicketController;
__decorate([
    (0, common_1.Post)("issuing"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image")),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "issueTicket", null);
__decorate([
    (0, common_1.Post)("transfer"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "transferTicket", null);
exports.TicketController = TicketController = __decorate([
    (0, common_1.Controller)("ticket"),
    __metadata("design:paramtypes", [ticket_repo_1.TicketRepository])
], TicketController);
//# sourceMappingURL=ticket.controller.js.map
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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const ipfs_http_client_1 = require("ipfs-http-client");
const web3_1 = require("web3");
let TicketController = class TicketController {
    constructor() {
        this.ipfs = (0, ipfs_http_client_1.create)({ host: 'localhost', port: 5001, protocol: 'http' });
        this.contractAddress = 'YOUR_CONTRACT_ADDRESS';
        this.web3 = new web3_1.default(new web3_1.default.providers.HttpProvider('http://localhost:8545'));
        const abi = [];
        this.contract = new this.web3.eth.Contract(abi, this.contractAddress);
    }
    async issueTicket(image, body) {
        const imageBuffer = Buffer.from(image.buffer);
        const { cid } = await this.ipfs.add(imageBuffer);
        const ticketName = 'TicketName';
        const ticketId = 1;
        const account = (await this.web3.eth.getAccounts())[0];
        const tx = await this.contract.methods.issueTicket(ticketName, ticketId, body.amount).send({ from: account });
        return {
            ipfsHash: cid.toString(),
            transactionHash: tx.transactionHash
        };
    }
};
exports.TicketController = TicketController;
__decorate([
    (0, common_1.Post)('issuing'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "issueTicket", null);
exports.TicketController = TicketController = __decorate([
    (0, common_1.Controller)('ticket'),
    __metadata("design:paramtypes", [])
], TicketController);
//# sourceMappingURL=ticket.controller.js.map
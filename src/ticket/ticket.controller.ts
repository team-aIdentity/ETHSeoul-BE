import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { create } from "ipfs-http-client";
import axios from "axios";
import Web3 from "web3"; // Import web3.js
import { TicketRepository } from "./ticket.repo";

@Controller("ticket")
export class TicketController {
  private ipfs = create({ host: "localhost", port: 5001, protocol: "http" });
  private contractAddress = "0x3D27ef41Ce71826C3DdA04D6aF12aCF62ED2D3d4"; // Replace with your contract address
  private web3: Web3;
  private contract: any; // Define contract variable

  constructor(private readonly ticketRepository: TicketRepository) {
    // Configure web3.js with your Ethereum node provider
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://bitter-orbital-moon.ethereum-sepolia.quiknode.pro/9f309bac50790fb0d5c092a40730960425ea39df/"
      )
    );
    // Define your contract ABI
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
    ]; // Replace with your contract ABI
    // Instantiate your contract
    this.contract = new this.web3.eth.Contract(abi, this.contractAddress);
  }

  @Post("issuing")
  @UseInterceptors(FileInterceptor("image"))
  async issueTicket(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: { amount: number; ticket_name: string; agent: string }
  ) {
    // Upload image to IPFS
    const imageBuffer = Buffer.from(image.buffer);
    const { cid } = await this.ipfs.add(imageBuffer);
    const uri = `http://localhost:5001/ipfs/${cid}`;

    // Call smart contract
    const ticketName = body.ticket_name; // Provide the ticket name
    const account = (await this.web3.eth.getAccounts())[0]; // Get the first account
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

  @Post("transfer")
  async transferTicket(
    @Body() body: { ticketId: number; to: string; amount: number }
  ) {
    const account = (await this.web3.eth.getAccounts())[0]; // Get the first account
    const tx = await this.contract.methods
      .safeTransferFrom(
        account, // Sender address
        body.to, // Receiver address
        body.ticketId, // Ticket ID
        body.amount, // Amount of tickets to transfer
        ""
      )
      .send({ from: account });

    // Decrease ticket amount in the database
    await this.ticketRepository.decreaseTicketAmount(
      body.ticketId,
      body.amount
    );

    return {
      transactionHash: tx.transactionHash,
    };
  }
}

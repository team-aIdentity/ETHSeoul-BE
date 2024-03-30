import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repo';
import { User } from './user.entity';

import { ethers } from 'ethers';
import Web3 from 'web3';
import { create } from 'ipfs-http-client';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
  private ipfs = create({host: 'localhost', port: 5001, protocol: 'http'})
  private web3: Web3;
  private walletFactoryAbi: [any];
  private profileAbi: [any];

  constructor(
    private readonly userRepository: UserRepository) {
      this.web3 = new Web3(new Web3.providers.HttpProvider("https://bitter-orbital-moon.ethereum-sepolia.quiknode.pro/9f309bac50790fb0d5c092a40730960425ea39df/"));
    }

    async findAllUsers(): Promise<User[]> {
      return this.userRepository.findAll();
    }

    async registerUser(user_id: string, user_pw: string, profile_img: any): Promise<ethers.TransactionReceipt | string | null> {
      const user = await this.userRepository.findOneByUserId(user_id);
      if(user) return 'duplicated user_id';

      try {
        // Wallet 생성
        const walletFactoryAbi = [{"type":"constructor","inputs":[{"name":"entryPoint","type":"address","internalType":"contract IEntryPoint"}],"stateMutability":"nonpayable"},{"type":"function","name":"createAccount","inputs":[{"name":"owners","type":"address[]","internalType":"address[]"},{"name":"salt","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"contract Wallet"}],"stateMutability":"nonpayable"},{"type":"function","name":"getAddress","inputs":[{"name":"owners","type":"address[]","internalType":"address[]"},{"name":"salt","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"walletImplementation","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract Wallet"}],"stateMutability":"view"}];
        const WalletFactoryContract = new this.web3.eth.Contract(walletFactoryAbi, '0x6584019E5249fe12337BB082B3339f8C96E4917e')
        const signer = process.env.PRIVATE_KEY
        const salt = "0x" + randomBytes(32).toString("hex");
        const createAccountTx = await WalletFactoryContract.methods.createAccount(signer, salt).send({ from: signer });
        const walletAddress: string = await WalletFactoryContract.methods.getAddress(signer, salt).call();
        const walletAddressStr = walletAddress.toString();

        // ERC721 생성
        // const ipfs = {
        //   hostname: 'http://localhost',
        //   port: 5001,
        //   path: '',
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // };
        const imageBuffer = Buffer.from(profile_img.buffer);
        const {cid} = await this.ipfs.add(imageBuffer);
        const profileAbi = [{"type":"constructor","inputs":[{"name":"baseURI","type":"string","internalType":"string"}],"stateMutability":"nonpayable"},{"type":"function","name":"_tokenId","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"approve","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"balanceOf","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getApproved","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"isApprovedForAll","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"operator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"nextId","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"ownerOf","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"safeMint","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"uri","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setApprovalForAll","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"approved","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setBaseURI","inputs":[{"name":"baseURI","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"supportsInterface","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"tokenURI","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"transferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"BatchMetadataUpdate","inputs":[{"name":"_fromTokenId","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"_toTokenId","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"MetadataUpdate","inputs":[{"name":"_tokenId","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ERC721IncorrectOwner","inputs":[{"name":"sender","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InsufficientApproval","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC721InvalidApprover","inputs":[{"name":"approver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidOperator","inputs":[{"name":"operator","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidReceiver","inputs":[{"name":"receiver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidSender","inputs":[{"name":"sender","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721NonexistentToken","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]}];
        const profileContract = new this.web3.eth.Contract(profileAbi, '0x19bf355f08cDB4D27A93d77824bb27abf28b7FF9');
        const safeMintTx = await profileContract.methods.safeMint(walletAddress, cid).send({ from: signer });

        const hash = bcrypt.hashSync(user_pw, 10); // 패스워드 10자리 해시화
        await this.userRepository.create({
          user_id: user_id,
          user_pw: hash,
          walletAddress: walletAddressStr,
        });

        return 'create wallet succeed'

      } catch (error) {
        console.log(error);
        return 'create wallet failed'
      }
    }

    async loginUser(user_id: string, user_pw: string): Promise<string | null> {
      // 맞게 입력했는지 확인
      const user = await this.userRepository.findOneByUserId(user_id);
      if(!user) {
        return 'wrong user_id'
      }else {
        const same = bcrypt.compareSync(user_pw, user.user_pw); // 입력한 패스워드와 해시값 비교
        if(same) {
          return 'login succeed : ' + user.walletAddress;
        }
      }
    }
}
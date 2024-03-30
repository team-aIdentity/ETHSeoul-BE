import { UserRepository } from './user.repo';
import { User } from './user.entity';
import { ethers } from 'ethers';
export declare class UserService {
    private readonly userRepository;
    private ipfs;
    private web3;
    private walletFactoryAbi;
    private profileAbi;
    constructor(userRepository: UserRepository);
    findAllUsers(): Promise<User[]>;
    registerUser(user_id: string, user_pw: string, profile_img: any): Promise<ethers.TransactionReceipt | string | null>;
    loginUser(user_id: string, user_pw: string): Promise<string | null>;
}

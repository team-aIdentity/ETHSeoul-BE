import { UserRepository } from './user.repo';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findAllUsers(): Promise<User[]>;
    registerUser(user_id: string, user_pw: string): Promise<string | null>;
    loginUser(user_id: string, user_pw: string): Promise<string | null>;
}

import { User } from './user.entity';
export declare class UserRepository {
    private userModel;
    constructor(userModel: typeof User);
    findAll(): Promise<User[]>;
    findOneById(id: number): Promise<User | null>;
    findOneByUserId(user_id: string): Promise<User | null>;
    create(userData: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
}

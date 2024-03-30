import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<import("src/user/user.entity").User[]>;
    signup(user_id: string, user_pw: string): Promise<string>;
    login(user_id: string, user_pw: string): Promise<string>;
}

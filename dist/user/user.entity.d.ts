import { Model } from "sequelize-typescript";
import { TBA } from "src/tba/tba.entity";
export declare class User extends Model {
    id: number;
    user_id: string;
    user_pw: string;
    walletAddress: string;
    tba: TBA[];
}

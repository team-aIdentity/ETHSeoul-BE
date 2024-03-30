import { Model } from "sequelize-typescript";
export declare class User extends Model {
    id: number;
    user_id: string;
    user_pw: string;
}

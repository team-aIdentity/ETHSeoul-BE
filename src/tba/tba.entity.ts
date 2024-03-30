import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/user/user.entity";

@Table({timestamps : true})
export class TBA extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({ type: DataType.STRING(50), allowNull: false })
    tbaName: string;

    @ForeignKey(() => User)
    @Column
    user_id: number;
  
    @BelongsTo(() => User)
    user: User;
}

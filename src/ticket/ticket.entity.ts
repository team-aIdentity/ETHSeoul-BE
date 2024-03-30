import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({ timestamps: true })
export class Ticket extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  // @Column({type: DataType.STRING(50), allowNull: false, unique: true})
  // user_id: string;

  // @Column({type: DataType.STRING(190), allowNull: false})
  // user_pw: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  ticket_cid: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  ticket_name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  ticket_amount: number;

  @Column({ type: DataType.STRING, allowNull: false })
  ticket_agent: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  ticket_uri: string;

  // HasMany
}

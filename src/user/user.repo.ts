import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  // 전체 유저 반환
  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  // 특정 유저 반환 (id)
  findOneById(id: number): Promise<User | null> {
    return this.userModel.findOne({where : {id}});
  }

  // 특정 유저 반환 (user_id)
  findOneByUserId(user_id: string): Promise<User | null> {
    return this.userModel.findOne({where : {user_id}});
  }

  // 유저 추가
  async create(userData: Partial<User>): Promise<User> {
    return this.userModel.create(userData);
  }

  // 유저 삭제 (id)
  async remove(id: number): Promise<void> {
    const user = await this.findOneById(id);
    await user.destroy();
  }
}
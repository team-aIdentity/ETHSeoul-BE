import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repo';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

    async findAllUsers(): Promise<User[]> {
      return this.userRepository.findAll();
    }

    async registerUser(user_id: string, user_pw: string): Promise<string | null> {
      const user = await this.userRepository.findOneByUserId(user_id);
      if(!user) {
        const hash = bcrypt.hashSync(user_pw, 10); // 패스워드 10자리 해시화
        await this.userRepository.create({
          user_id: user_id,
          user_pw: hash,
        });

        // wallet 생성
        return 'create success';
      }else {
        return 'duplicated user_id';
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
          // wallet 연결?
          return 'login success';
        }
      }
    }
}
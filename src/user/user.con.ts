import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 모든 유저 조회
  @Get('findAll')
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  // 회원가입
  @Post('signup')
  signup(@Body('user_id') user_id: string, @Body('user_pw') user_pw: string) {
    return this.userService.registerUser(user_id, user_pw);
  }

  // 로그인
  @Post('login')
  login(@Body('user_id') user_id: string, @Body('user_pw') user_pw: string) {
    return this.userService.loginUser(user_id, user_pw);
  }
}
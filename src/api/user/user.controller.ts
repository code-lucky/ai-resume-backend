import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from 'src/api/email/email.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedisService } from 'src/redis/redis.service';
import { RequireLogin } from 'src/decorator/custom.decorator';
import { LoginUserVo } from './vo/login-user.vo';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { userLoginByPasswordDto } from './dto/user-login-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserListVo } from './vo/user-list.vo';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  /**
   * 注册
   * @param user 
   * @returns 
   */
  @Post('register')
  async register(@Body()user: Object){
    console.log('user', user)
    // return await this.userService.createUser(user)
  }

  /**
   * 登录
   * @param user 
   * @returns 
   */
  @Post('login')
  async login(@Body()user: userLoginByPasswordDto){
    return 'login'
  }

  /**
   * 获取用户信息
   * @param userId 
   * @returns 
   */
  @Get(':userId')
  async getUserProfile(@Param('userId') userId: number){
    console.log('userId', userId)
    return ''
  }

  @Get('captcha/register')
  async captcha(@Query('email')email: String){
    console.log('email', email)
    return ''
  }
}

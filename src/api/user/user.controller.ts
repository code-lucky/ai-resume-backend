import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpStatus, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from 'src/api/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import { RequireLogin } from 'src/decorator/custom.decorator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update_paddword.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  /**
   * 注册
   * @param user 
   * @returns 
   */
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  /**
   * 登录
   * @param user 
   * @returns 
   */
  @Post('login')
  async userLogin(@Body() user: LoginDto) {
    const vo = await this.userService.login(user)
    vo.access_token = this.jwtService.sign({
      userId: vo.userInfo.id,
      username: vo.userInfo.user_name
    },{
      expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
    })

    vo.refresh_token = this.jwtService.sign({
      userId: vo.userInfo.id
    }, {
      expiresIn: this.configService.get('jwt_refresh_token_expres_time') || '7d'
    });
    return vo;
  }

  /**
   * 获取用户信息
   * @param userId 
   * @returns 
   */
  @Get('user')
  @RequireLogin()
  async getUserProfile(@Req() request: Request) {
    return await this.userService.getUserInfo(request.user.userId);
  }

  /**
   * 更新用户信息
   * @param user 
   * @returns 
   */
  @Post('update')
  @RequireLogin()
  async updateUser(@Req() request: Request,@Body() user: UpdateUserDto) {
    return await this.userService.updateUser(request.user.userId, user);
  }

  /**
   * 更新密码
   * @param request 
   * @param passwordDto 
   * @returns 
   */
  @Post('update/password')
  @RequireLogin()
  async updatePassword(@Req() request: Request, @Body() passwordDto: UpdatePasswordDto) {
    return await this.userService.updatePassword(request.user.userId, passwordDto);
  }

  /**
   * 获取验证码
   * @param email
   * @returns
   */
  @Get('captcha/register')
  async captcha(@Query('email') email: String) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`captcha_${email}`, code, 5 * 60);

    await this.emailService.sendMail({
      to: email,
      subject: '注册验证码',
      html: `<p>你的注册验证码是 ${code}</p>`
    });
    return '发送成功';
  }
}

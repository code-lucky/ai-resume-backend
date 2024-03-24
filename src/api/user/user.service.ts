import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RedisService } from 'src/redis/redis.service';
import { md5 } from 'src/utils/md5';
import { LoginDto } from './dto/login.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { UpdatePasswordDto } from './dto/update_paddword.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @Inject(RedisService)
  private redisService: RedisService;

  /**
   * 用户注册
   * @param user 
   * @returns 
   */
  async createUser(user: CreateUserDto) {
    // 获取注册验证码
    const captcha = await this.redisService.get(`captcha_${user.email}`);

    if (!captcha) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST);
    }

    if (user.captcha !== captcha) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }

    const findUser = await this.userRepository.findOneBy({ email: user.email });

    if (findUser) {
      throw new HttpException('邮箱已注册', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.email = user.email;
    newUser.password = md5(user.password);
    newUser.user_name = user.email;
    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      throw new HttpException('注册失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 用户登录
   * @param user 
   */
  async login(user: LoginDto) {
    const findUser = await this.userRepository.findOne({
      where: {
        email: user.email,
        isDelete: 0
      }
    });
    if (!findUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (findUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    
    const vo = new LoginUserVo();
    vo.userInfo = {
      id: findUser.id,
      user_name: findUser.user_name,
      email: findUser.email,
      head_pic: findUser.head_pic,
      phone_number: findUser.phone_number
    };

    return vo;
  }

  /**
   * 获取用户信息
   * @param userId 
   */
  async getUserInfo(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isDelete: 0
      }
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    return user;
  }


  /**
   * 更新用户信息
   * @param userId 
   * @param user 
   */
  async updatePassword(userId: number,passwordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isDelete: 0
      }
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== md5(passwordDto.old_password)) {
      throw new HttpException('原密码错误', HttpStatus.BAD_REQUEST);
    }

    if (passwordDto.new_password !== passwordDto.confirm_password) {
      throw new HttpException('两次密码不一致', HttpStatus.BAD_REQUEST);
    }

    user.password = md5(passwordDto.new_password);
    try {
      await this.userRepository.save(user);
      return '密码修改成功';
    } catch (error) {
      throw new HttpException('密码修改失败', HttpStatus.BAD_REQUEST);
    }
  }


  /**
   * 更新用戶信息
   * @param userId 
   * @param user 
   */
  async updateUser(userId: number, user: UpdateUserDto) {
    const findUser = await this.userRepository.findOne({
      where: {
        id: userId,
        isDelete: 0
      }
    });
    if (!findUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
     
    findUser.user_name = user.user_name;
    findUser.email = user.email;
    findUser.head_pic = user.head_pic;
    findUser.phone_number = user.phone_number;
    findUser.gender = user.gender;
    findUser.school = user.school;
    findUser.professional = user.professional;
    findUser.original = user.original;
    findUser.graduation = user.graduation;
    try {
      await this.userRepository.save(findUser);
      return '更新成功';
    } catch (error) {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }
}

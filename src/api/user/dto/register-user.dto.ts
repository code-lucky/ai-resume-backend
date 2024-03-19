import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserDto{

    @ApiProperty()
    @IsNotEmpty({
        message: '用户名不能为空'
    })
    username: string;
    
    @ApiProperty()
    @IsNotEmpty({
        message: '密码不能为空'
    })
    password: string;

    @ApiProperty()
    @IsNotEmpty({
        message: '邮箱不能为空'
    })
    @IsEmail({},{
        message: '邮箱格式不正确'
    })
    email: string;

    @ApiProperty()
    @IsNotEmpty({
        message: '验证码不能为空'
    })
    captcha: string;
}
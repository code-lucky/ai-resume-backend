import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class userLoginByPasswordDto{
    
    @ApiProperty()
    @IsNotEmpty({
        message: '用户名不能为空'
    })
    userName: string;

    @ApiProperty()
    @IsNotEmpty({
        message: '密码不能为空'
    })
    password: string;
}
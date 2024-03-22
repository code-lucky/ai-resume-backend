import { IsNotEmpty } from "class-validator";

export class UpdateUserDto{

    @IsNotEmpty({
        message: '用户名不能为空'
    })
    user_name: string;

    @IsNotEmpty({
        message: '邮箱不能为空'
    })
    email: string;

    @IsNotEmpty({
        message: '头像不能为空'
    })
    head_pic: string;
    
    phone_number: string;
}
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto{

    @IsNotEmpty({
        message: '用户id不能为空'
    })
    id: number;

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

    @IsNotEmpty({
        message: '手机号码不能为空'
    })
    phone_number: string;
}
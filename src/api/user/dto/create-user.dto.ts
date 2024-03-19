import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto{

    @ApiProperty()
    @IsNotEmpty()
    userName: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    roleId: number;

    @ApiProperty()
    @IsNotEmpty()
    status: number;
}
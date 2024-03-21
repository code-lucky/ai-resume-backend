import { ApiProperty } from "@nestjs/swagger";


export class UserInfoVo{
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  user_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  head_pic: string;

  @ApiProperty()
  phone_number: string;
}
import { ApiProperty } from "@nestjs/swagger";


export class UserInfoVo{
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  username: string;

  @ApiProperty()
  nickName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  headPic: string;

  @ApiProperty()
  phoneNumber: string;
}
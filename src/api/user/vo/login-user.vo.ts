import { ApiProperty } from "@nestjs/swagger";


class UserInfo{
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


export class LoginUserVo {

    @ApiProperty()
    userInfo: UserInfo;

    @ApiProperty()
    access_token: string;

    @ApiProperty()
    refresh_token: string;
    vo: { id: number; };
}
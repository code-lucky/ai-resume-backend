import { ApiProperty } from "@nestjs/swagger";


class UserInfo{
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  headPic: string;

  @ApiProperty()
  phoneNumber: string;
}


export class LoginUserVo {

    @ApiProperty()
    userInfo: UserInfo;

    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;
    vo: { id: number; };
}
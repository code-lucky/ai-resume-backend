import { ApiProperty } from "@nestjs/swagger";

class UserList{

    @ApiProperty()
    id:number;
    
    @ApiProperty()
    userName: String;

    @ApiProperty()
    roleName: String;

    @ApiProperty()
    status: number;

    @ApiProperty()
    createTime: Date;

    @ApiProperty()
    updateTime: Date;
}

export class UserListVo{

    @ApiProperty({
        type:[UserList]
    })
    userList: UserList[];
}
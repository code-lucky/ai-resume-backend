import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'user'
})
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_name',
        comment: '用户名称'
    })
    userName: string;

    @Column({
        comment: '用户密码'
    })
    password: string;

    @Column({
        name: 'head_pic',
        comment: '用户头像',
        nullable: true
    })
    headPic: string;

    @Column({
        name: 'phone_number',
        comment: '手机号码',
        length: 20,
        nullable: true
    })
    phoneNumber: string;

    @Column({
        comment: '邮箱',
        nullable: true
    })
    email: string;

    @Column({
        comment: '用户状态',
        default: 0
    })
    status: number;

    @Column({
        name: 'is_delete',
        comment: '用户逻辑删除0是正常状态，1是删除',
        default: 0
    })
    isDelete: number;

    @CreateDateColumn({
        name: 'create_time'
    })
    createTime: Date;

    @CreateDateColumn({
        name: 'update_time'
    })
    updateTime: Date;
}
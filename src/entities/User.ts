import { IsEmail, MinLength } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm";
import bcrypt from 'bcrypt'
import {classToPlain, Exclude} from 'class-transformer'


@Entity("users")
export class User extends BaseEntity {
    
    constructor(user: Partial<User>){
        super()
        Object.assign(this, user)
    }

    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;
    
    @Index()
    @IsEmail()
    @Column({unique:true})
    email: string;

  
    @Index()
    @MinLength(3,{message:'Username must be at least 3 charactors.'})
    @Column({unique:true})
    username: string;

    
    @Exclude()
    @Index()
    @MinLength(6)
    @Column()
    password: string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,6)
    }
  

    toJSON(){
        return classToPlain(this)
    }
}

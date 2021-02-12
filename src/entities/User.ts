import { IsEmail, MinLength } from "class-validator";
import { Entity as TOEntity, Column, Index, CreateDateColumn, BeforeInsert, OneToMany,JoinColumn} from "typeorm";
import bcrypt from 'bcrypt'
import {Exclude} from 'class-transformer'
import Post from './Post'

import Entity from './Entity'

@TOEntity("users")

export default class User extends Entity {
    
    constructor(user: Partial<User>){
        super()
        Object.assign(this, user)
    }

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

   @OneToMany(()=>Post, post => post.user)
    posts:Post[]

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,6)
    }
  
}


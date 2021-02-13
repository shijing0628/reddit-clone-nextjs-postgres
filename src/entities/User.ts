import { IsEmail, Length, MinLength } from "class-validator";
import { Entity as TOEntity, Column, Index,  BeforeInsert, OneToMany} from "typeorm";
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
    @IsEmail(undefined,{message:'Must be a valid email address'})
    @Length(1,255,{message:'Email is empty'})
    @Column({unique:true})
    email: string;

  
    @Index()
    @MinLength(3,{message:'Must be at least 3 charactors.'})
    @Column({unique:true})
    username: string;

    
    @Exclude()
    @Index()
    @MinLength(6,{message:'Must be at least 6 charactors.'})
    @Column()
    password: string;

   @OneToMany(()=>Post, post => post.user)
    posts:Post[]

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,6)
    }
  
}


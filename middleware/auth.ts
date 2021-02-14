import {Request,Response,NextFunction} from 'express';
import User from "../src/entities/User";

export default async(_:Request,res:Response,next:NextFunction)=>{
 try{
   const user:User | undefined = res.locals.user

   if(!user) throw new Error("unauthenticated")
   return next()

 }catch(err){
 
  next(err);

}
}



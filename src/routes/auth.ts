import { Request, Response,Router } from "express";
import { User } from "../entities/User";

const router = Router()

const register = async(req:Request,res:Response) => {
  const{email,username,password} = req.body;
  try {
   //validate data

   //create user
    const user= new User({email, username,password})
    await user.save()

   //return user
   return res.json(user)
  }catch(err){
   return res.status(500).json(err)
  }
}
router.post('/register',register)
export default router
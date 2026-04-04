import express , { NextFunction , Request , Response  } from "express" ; 
import UserModel from "../Models/UserModel" ; 
import bcrypt from "bcrypt" ; 
import jwt from  "jsonwebtoken" ;  

const JWT_TOKEN = process.env.JWT_TOKEN as string ; 

export const signup = async (req : Request , res : Response ) =>{ 
  console.log("hi i am here ghgf ")
    try {
  const { username , email , password} = req.body ; 
    if(!username || ! email || !password) {
         return res.status(400).json({"message" : "All fields required"}) ; 
    } 
    const user = await UserModel.findOne({ email }) ; 
    if(user) {
         return res.status(400).json({"message" : "User already exist"}) ;
    }

    const hashpassword = await bcrypt.hash(password ,10) ; 
    const newUser = UserModel.create({
        username , 
        email , 
        password : hashpassword 
    })
    return res.status(201).json({"message" : "User created successfully"}) ;  
    }catch(err){
   console.log(err) ; 
   return res.status(400).json({"message" : "Internal Server Error "}) ;   
      
    }
    
} 
export const signin = async (req : Request , res :  Response ) =>{
    try {
      const {email , password} = req.body ; 
      if(!email || !password) {
         res.status(400).json({"message" : " All fields required"} ) 
      }
       const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      JWT_TOKEN,
      { expiresIn: "7d" }
    );
   
    res.json({ token });
    }catch(err) { 
        console.log(err);
        return res.status(500).json({"message":"signin failed "}) ;   
    }
}



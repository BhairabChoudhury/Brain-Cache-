import express , {NextFunction , Request , Response } from 'express' ; 
import jwt from  "jsonwebtoken" ; 

   
const JWT_TOKEN = process.env.JWT_TOKEN  as string ; 

export const UserMiddleware = async (req : Request , res : Response , next : NextFunction )=>{

     const token = req.headers["Authorization"] as string ;
      if(!token) {
         return  res.status(401).json({"message" :"Unothorized User"})
      }
    try{
        const decoded = jwt.verify(token, JWT_TOKEN) ;
        //@ts-ignore
        req.userId = decoded.id  ;
        next() ;
        
    }catch(err){
        console.log(err) ; 
        res.status(401).json({"message" :"Unothorized User"})
    }
}
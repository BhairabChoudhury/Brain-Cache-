

// Exporting a function named `random` that generates a random string of a given length.
//  export function random(len: number) {
//     // Define a string containing possible characters for the random string.
//     let options = "erdctfbghujmrdtfbghunjmrxctfvygbhun";
//     let length = options.length;

//     // Initialize an empty string to store the result.
//     let ans = "";

//     // Loop `len` times to construct the random string.
//     for (let i = 0; i < len; i++) {
//         // Generate a random index and append the corresponding character from `options` to `ans`.
//         ans += options[Math.floor(Math.random() * length)];
//     }

//     // Return the final random string.
//     return ans;
// }

/*
Notes:
1. This function generates a random string by selecting random characters from a predefined set.
2. Avoid creating a `utils.ts` file to store miscellaneous functions or data without clear organization.
   - Storing unrelated or arbitrary functions and data in `utils.ts` is considered a bad practice.
   - Instead, organize functions into specific modules or files based on their purpose and usage.
3. Always aim for clean and modular code structure to improve maintainability and readability.
*/
// Importing required types and modules from "express" and "jsonwebtoken".
import { NextFunction, Request, Response } from "express";
// import { JWT} from "./config"; // Importing the JWT secret key from a configuration file.
import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library for token verification.

// Middleware to validate user authentication using a JWT token.
  export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Extract the "authorization" header from the request.
    const header = req.headers["authorization"];
    
    // Verify the JWT token using the secret key.
    const decoded = jwt.verify(header as string, JWT);
    console.log("dskfjkopdk") ;
    // If the token is successfully decoded, attach the user ID to the request object.
    if (decoded) {
        
        // @ts-ignore
        req.userId = decoded.id; // Store the decoded user ID for later use in request handling.
        next(); // Call the next middleware or route handler.
    } else {
        // If the token is invalid, send a 401 Unauthorized response.
        res.status(401).json({ message: "Unauthorized User" });
    }
    
};

 
/*
import express,{ Request,Response}from 'express' ;
import mongoose from "mongoose" 
import jwt from "jsonwebtoken" 
import { ContentModel, LinkModel, UserModel } from './db';
import {z} from 'zod' 
import bcrypt from 'bcrypt' ;
import {JWT} from './config'
import { random } from './utils';
import { userMiddleware } from './middleware';
//@ts-ignore  2
import cors  from "cors" ;
const app = express();
app.use(express.json());
//@ts-ignore
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ no slash at the end
  })
);
 mongoose.connect("mongodb+srv://Rocky:8101866244@cluster0.ey9q8vn.mongodb.net/Brainly-Project" )
 .then(()=>console.log("Mongo Db successfully Conected "))
 .catch(err=>console.log("error catch",err)) ;
  
app.post("/api/v1/signup", async (req :Request,res:Response)=>{
     
 const requiredBody = z.object({
     username :z.string().min(3).max(20) ,// remember think 
      password:z.string().min(3) //remember think 
 })

 const process = requiredBody.safeParse(req.body) ;
 if(!process.success){
     res.json({
       message :" Incorect  Form" 
     })
     return ; 
 }

 const username  = req.body.username ;
const password = req.body.password ;

 try{
const hashedPassword = await bcrypt .hash(password,10) ;
  await UserModel.create({
    username :username,
    password :hashedPassword 
})
 }catch(err){
         res.json({message:"User already exist"});

 } 

  res.json({ message:"You have loged in successfully"})
 
})

app.post("/api/v1/signin", async (req:Request,res :Response)=>{
   const requiredBody =z.object({
     username :z.string().min(4).max(20),
     password :z.string().min(5) 
   })
  
   const process = requiredBody.safeParse(req.body) ;
    
   if(!process.success){  
        res.json({
       message :"Incorrect  Formate" 
     })
     return ;
   }
   const username = req.body.username ; 
   const password =req.body.password ; 
  
     // Find a user with the provided credentials.
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      // Generate a JWT token with the user's ID.
        const token = jwt.sign({ id: existingUser._id }, JWT);
        res.json({ token }); // Send the token in response.
    } else {
        // Send error response for invalid credentials.
        res.status(403).json({ message: "Incorrect credentials" });
    }
}) 


app.post("/api/v1/content",userMiddleware, async (req :Request,res :Response)=>{
   console.log("BODY h erkejqlm qklm") ;

        
 const  {title ,link,type}  = req.body ;
 //@ts-ignore
   // userId = req.userId ;
  await ContentModel.create ({
     title ,
     link ,
       type ,
     // @ts-ignore
     userId:req.userId 
  })
  return res.json({
     message:"Content added" 
  })
}) 

app.get("/api/v1/content",userMiddleware, async (req :Request,res:Response)=>{
     
 
   //@ts-ignore
    const userId = req.userId;  // User ID is fetched from middleware
    // Fetch all content associated with the user ID and populate username
    // The `populate` function is used to include additional details from the referenced `userId`.
    // For example, it will fetch the username linked to the userId.
    // Since we specified "username", only the username will be included in the result, 
    // and other details like password won’t be fetched. 
    const content = await ContentModel.find({ userId: userId }).populate("userId", "username");
    res.json(content);  // Send the content as response

})

app.delete("/api/v1/content",userMiddleware,async(req:Request,res:Response)=>{
   
  const contentId = req.body.contentId ;
  //@ts-ignore 
  const userId =req.userId ;
  await ContentModel.deleteMany({
     contentId ,
    userId 
  })
   res.json({message:"Deleted"}) ;
})
app.post("/api/v1/brain/share",userMiddleware, async(req,res)=>{
  const share  =req.body.share ; /// boolean value  
  // @ts-ignore
   const userId = req.userId ;
  if(share){
    // @ts.ignore
     const existingLink =  await LinkModel.findOne({userId});
     if(existingLink){
        res.json({
           hash:existingLink.hash
        })
        return ;
     }
  

  const hash = random(10) ;// Generate new hash for shareable link 
   await LinkModel.create({hash,userId});
   res.json({hash}) ;
    } else {
      await UserModel.deleteOne({userId}) ;
      res.json({message:"Remove Link"}) ;
    }
})
app.get("/api/v1/brain/:shareLink", async (req,res)=>{ // this url hit by any one 
  
  const hash = req.params.shareLink
  // find the link using by provided hash ;
  const link = await LinkModel.findOne({hash }) ; 

  if(!link){
     res.status(404).json({ message:"Invalid share Link"})
    return ;
  }
  // Fetch content and user details for the shareable link.
  const content = await ContentModel.find({userId:link.userId}) ;
  const user = await UserModel.findOne({_id:link.userId}) ;
  if (!user) {
        res.status(404).json({ message: "User not found" }); // Handle missing user case.
        return;
    }

    res.json({
        username: user.username,
        content
    }); // Send user and content details in response.
})

app.listen(3000, () => {
  console.log(" Server running on http://localhost:3000");
});  


*/
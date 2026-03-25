import mongoose from "mongoose";
import dotenv from "dotenv" ; 
dotenv.config() ;  
async function connectDB(){
    await mongoose.connect(process.env.MONGO_URL as string)   // for typescipt , this is  a string 
.then(()=>console.log("Mongo Db successfully Conected "))
.catch(err=>console.log("error catch",err)) ;   
} 

export default connectDB 


import express from "express" 
import mongoose from "mongoose" 
import connectDB from "./Config/db";
import authroutes from "./routes/authroutes" ; 
const app = express() ; 

app.use(express.json()) ;
connectDB() ; 
console.log("App is running") ; 
app.use("/api/v1/",authroutes) ; 





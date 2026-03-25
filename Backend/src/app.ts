import express from "express" 
import mongoose from "mongoose" 
import connectDB from "./Config/db";
const app = express() ; 

app.use(express.json()) ;
connectDB() ; 




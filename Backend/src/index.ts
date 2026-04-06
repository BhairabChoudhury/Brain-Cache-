import express from "express" 
import mongoose from "mongoose" 
import connectDB from "./Config/db";
import authroutes from "./routes/authroutes" ; 
import contentroutes from "./routes/contentroutes" ; 
const app = express() ; 

app.use(express.json()) ;
connectDB() ; 
console.log("App is running") ; 
app.use("/api/auth/",authroutes) ; 
app.use("/api/content/",contentroutes) ; 

const PORT = process.env.PORT || 8000 ; 
app.listen(PORT,()=>{
     console.log(`Server is running on port ${PORT}`) ; 
})





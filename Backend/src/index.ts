import dotenv from "dotenv";
dotenv.config({ path: ".ENV" });

import express from "express"
import cors from "cors";
import connectDB from "./Config/db";
import authroutes from "./routes/authroutes" ; 
import contentroutes from "./routes/contentroutes" ; 
import searchRoute from "./routes/searchRoute" ; 
import chatRoutes from "./routes/chatRoutes";

const app = express() ; 

app.use(cors());
app.use(express.json()) ;
connectDB() ; 
console.log("App is running") ; 
app.use("/api/auth/",authroutes) ; 
app.use("/api/content/",contentroutes) ; 
app.use("/api/search/",searchRoute) ; 
app.use("/api/chat/",chatRoutes);

const PORT = process.env.PORT || 8000 ; 
app.listen(PORT,()=>{
     console.log(`Server is running on port ${PORT}`) ; 
})






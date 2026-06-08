import dotenv from "dotenv";
dotenv.config({ path: ".ENV" });
import cors from "cors" ;
import express from "express"
import connectDB from "./Config/db";
import authroutes from "./routes/authroutes" ; 
import contentroutes from "./routes/contentroutes" ; 
import searchRoute from "./routes/searchRoute" ; 
import chatRoutes from "./routes/chatRoutes";

const app = express() ; 

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json()) ;
connectDB() ; 
console.log("App is running") ; 
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});
app.use("/api/auth/",authroutes) ; 
app.use("/api/content/",contentroutes) ; 
app.use("/api/search/",searchRoute) ; 
app.use("/api/chat/",chatRoutes);

const PORT = process.env.PORT || 8000 ; 
app.listen(PORT,()=>{
     console.log(`Server is running on port ${PORT}`) ; 
})






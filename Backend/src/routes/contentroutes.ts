import express, { Router } from "express" ; 
//import { createContent } from "../controllers/contentcontroller" ; 
import  { upload } from "../Middleware/uploadMiddleware" ; 
import { UserMiddleware } from "../Middleware/AuthMiddleware" ; 
const router = express.Router() ; 

router.post("/create" , upload.single("file") , UserMiddleware , ) ; 
router.get("/get", UserMiddleware ) ;

export default router ;  
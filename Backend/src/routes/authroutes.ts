import express from "express" 
import { UserMiddleware } from "../Middleware/AuthMiddleware"; 
import { signup , signin } from "../controllers/authcontroller"; 
const router = express.Router() ; 

router.post("/signup",signup)
router.post("/signin",signin)

export default router ;  
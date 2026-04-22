import express from "express";
import { searchContentForAiAnswer } from "../controllers/searchCon";
import { UserMiddleware } from "../Middleware/AuthMiddleware";
import { searchNote } from "../controllers/searchCon";
const router = express.Router();

router.post("/searchAi", UserMiddleware , searchContentForAiAnswer); 
router.get("/searchNote", UserMiddleware , searchNote); 
export default router;
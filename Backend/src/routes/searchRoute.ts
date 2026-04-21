import express from "express";
import { searchContentForAiAnswer } from "../controllers/searchCon";
import { UserMiddleware } from "../Middleware/AuthMiddleware";

const router = express.Router();

router.post("/searchAi", UserMiddleware , searchContentForAiAnswer); 

export default router;
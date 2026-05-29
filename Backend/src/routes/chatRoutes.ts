import express from "express";
import { UserMiddleware } from "../Middleware/AuthMiddleware";
import {
  createSession,
  getSessions,
  getSessionById,
  deleteSession,
  addMessageToSession
} from "../controllers/chatController";

const router = express.Router();

// All routes are protected by user middleware
router.post("/session", UserMiddleware, createSession);
router.get("/sessions", UserMiddleware, getSessions);
router.get("/session/:sessionId", UserMiddleware, getSessionById);
router.delete("/session/:sessionId", UserMiddleware, deleteSession);
router.post("/session/:sessionId/message", UserMiddleware, addMessageToSession);

export default router;

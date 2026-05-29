"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
const chatController_1 = require("../controllers/chatController");
const router = express_1.default.Router();
// All routes are protected by user middleware
router.post("/session", AuthMiddleware_1.UserMiddleware, chatController_1.createSession);
router.get("/sessions", AuthMiddleware_1.UserMiddleware, chatController_1.getSessions);
router.get("/session/:sessionId", AuthMiddleware_1.UserMiddleware, chatController_1.getSessionById);
router.delete("/session/:sessionId", AuthMiddleware_1.UserMiddleware, chatController_1.deleteSession);
router.post("/session/:sessionId/message", AuthMiddleware_1.UserMiddleware, chatController_1.addMessageToSession);
exports.default = router;
//# sourceMappingURL=chatRoutes.js.map
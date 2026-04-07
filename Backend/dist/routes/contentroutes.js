"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import { createContent } from "../controllers/contentcontroller" ; 
const uploadMiddleware_1 = require("../Middleware/uploadMiddleware");
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
const router = express_1.default.Router();
router.post("/create", uploadMiddleware_1.upload.single("file"), AuthMiddleware_1.UserMiddleware);
router.get("/get", AuthMiddleware_1.UserMiddleware);
router.delete("/delete/:id", AuthMiddleware_1.UserMiddleware);
exports.default = router;
//# sourceMappingURL=contentroutes.js.map
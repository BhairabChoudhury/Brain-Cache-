"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized User" });
        }
        // Format: "Bearer token"
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        // attach userId to request
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized User" });
    }
};
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map
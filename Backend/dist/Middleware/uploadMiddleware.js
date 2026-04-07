"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
// 📁  Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
// 🗂 Storage config
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
        cb(null, uniqueName);
    }
});
// 🔍 File filter (PDF + Image only)
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg"
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only PDF and Image files are allowed"));
    }
};
// 🚀 Multer instance
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});
//# sourceMappingURL=uploadMiddleware.js.map
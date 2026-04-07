"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.getAllContent = exports.createContent = void 0;
const ContentModel_1 = __importDefault(require("../Models/ContentModel"));
// Assume you have some file upload + text extraction utils
const pdf_1 = require("../utils/pdf");
const orc_1 = require("../utils/orc");
// 🔵 Mock Chroma function (you will replace later)
const addToVectorDB = (text, contentId) => __awaiter(void 0, void 0, void 0, function* () {
    // send text + id to Chroma
    console.log("Embedding stored for:", contentId);
});
// ➕ CREATE CONTENT
const createContent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, type, content, url, file, userId } = data;
    let fileUrl = "";
    let extractedText = "";
    let URL = "";
    // 🧠 TYPE HANDLING
    if (type === "note") {
        if (!content)
            throw new Error("Content required for note");
        extractedText = content;
    }
    else if (type === "link") {
        if (!url)
            throw new Error("URL required");
        URL = url; // later you can fetch metadata
    }
    else if (type === "pdf") {
        if (!file)
            throw new Error("PDF file required");
        // 1. Upload file (local/cloud)
        // fileUrl = await uploadFile(file);
        fileUrl = `/uploads/${file.originalname}`;
        // 2. Extract text from PDF
        extractedText = yield (0, pdf_1.extractTextFromPDF)(file.path);
        // extractedText = "Sample extracted PDF text"; // placeholder
    }
    else if (type === "image") {
        if (!file)
            throw new Error("Image file required");
        // fileUrl = await uploadFile(file);
        fileUrl = `/uploads/${file.originalname}`;
        // OCR 
        extractedText = yield (0, orc_1.extractTextFromImage)(file.path);
    }
    else {
        throw new Error("Invalid content type");
    }
    // 🗄️ Save in MongoDB
    const newContent = yield ContentModel_1.default.create({
        title,
        type,
        URL,
        fileUrl,
        extractedText,
        userId
    });
    // 🤖 Send to Vector DB (Chroma)
    if (extractedText) {
        yield addToVectorDB(extractedText, String(newContent._id)); //  send  text and id  of contend to vector db  
    }
    return newContent;
});
exports.createContent = createContent;
// 🔍 GET ALL CONTENT
const getAllContent = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ContentModel_1.default.find({ userId }).sort({ createdAt: -1 });
});
exports.getAllContent = getAllContent;
// ❌ DELETE CONTENT
const deleteContent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ContentModel_1.default.findByIdAndDelete(id);
});
exports.deleteContent = deleteContent;
/*
file look like this
{
  fieldname: "file",
  originalname: "resume.pdf",
  filename: "123456-resume.pdf",
  path: "uploads/123456-resume.pdf",
  mimetype: "application/pdf",
  size: 24567
}
*/ 
//# sourceMappingURL=contentservices.js.map
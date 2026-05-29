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
exports.addMessageToSession = exports.deleteSession = exports.getSessionById = exports.getSessions = exports.createSession = void 0;
const ChatSession_1 = __importDefault(require("../Models/ChatSession"));
const SearchEm_1 = require("../Ai/SearchEm");
const ContentModel_1 = __importDefault(require("../Models/ContentModel"));
const GenerateAnswer_1 = require("../Ai/GenerateAnswer");
// Create a new blank chat session
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const newSession = new ChatSession_1.default({
            userId,
            title: "New Chat",
            messages: []
        });
        yield newSession.save();
        res.status(201).json({
            success: true,
            data: newSession
        });
    }
    catch (error) {
        console.error("Create Chat Session Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.createSession = createSession;
// Get all chat sessions for the logged-in user
const getSessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const sessions = yield ChatSession_1.default.find({ userId }).sort({ updatedAt: -1 });
        res.status(200).json({
            success: true,
            data: sessions
        });
    }
    catch (error) {
        console.error("Get Chat Sessions Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.getSessions = getSessions;
// Get a specific chat session by ID
const getSessionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { sessionId } = req.params;
        const session = yield ChatSession_1.default.findOne({ _id: sessionId, userId });
        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Chat session not found"
            });
        }
        res.status(200).json({
            success: true,
            data: session
        });
    }
    catch (error) {
        console.error("Get Chat Session By ID Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.getSessionById = getSessionById;
// Delete a specific chat session
const deleteSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { sessionId } = req.params;
        const deleted = yield ChatSession_1.default.findOneAndDelete({ _id: sessionId, userId });
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Chat session not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Chat session deleted successfully"
        });
    }
    catch (error) {
        console.error("Delete Chat Session Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.deleteSession = deleteSession;
// Send a message and generate RAG response in a session
const addMessageToSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { sessionId } = req.params;
        const { message } = req.body;
        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }
        // Find session
        const session = yield ChatSession_1.default.findOne({ _id: sessionId, userId });
        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Chat session not found"
            });
        }
        // Perform RAG Vector Search
        let context = "";
        let referencedNotes = [];
        try {
            const contentIds = yield (0, SearchEm_1.searchEmbedding)(message);
            if (contentIds && contentIds.length > 0) {
                const contents = yield ContentModel_1.default.find({
                    _id: { $in: contentIds },
                    userId
                });
                context = contents.map(c => c.extractedText).join("\n\n");
                referencedNotes = contents.map(c => ({
                    _id: c._id,
                    title: c.title,
                    type: c.type
                }));
            }
        }
        catch (searchError) {
            console.error("RAG Search failed, proceeding with direct LLM query:", searchError);
        }
        // Generate AI response
        let answer = "";
        try {
            answer = yield (0, GenerateAnswer_1.generateAnswer)(context, message);
        }
        catch (genError) {
            console.error("Gemini generation failed:", genError);
            answer = "I'm sorry, I encountered an issue generating a response. " + genError.message;
        }
        // Push messages
        session.messages.push({
            sender: "user",
            text: message,
            createdAt: new Date()
        });
        session.messages.push({
            sender: "ai",
            text: answer,
            createdAt: new Date()
        });
        // Auto-update session title if it's the first exchange
        if (session.title === "New Chat" && session.messages.length <= 2) {
            const textTitle = message.trim();
            session.title = textTitle.length > 35 ? textTitle.substring(0, 35) + "..." : textTitle;
        }
        yield session.save();
        res.status(200).json({
            success: true,
            data: {
                session,
                answer,
                referencedNotes
            }
        });
    }
    catch (error) {
        console.error("Add Message Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.addMessageToSession = addMessageToSession;
//# sourceMappingURL=chatController.js.map
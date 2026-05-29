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
exports.searchNote = exports.searchContentForAiAnswer = void 0;
const SearchEm_1 = require("../Ai/SearchEm");
const ContentModel_1 = __importDefault(require("../Models/ContentModel"));
const GenerateAnswer_1 = require("../Ai/GenerateAnswer");
const searchContentForAiAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ message: " Query Required" });
        }
        // console.log(query) ;
        //  1. Vector Search
        const contentIds = yield (0, SearchEm_1.searchEmbedding)(query);
        console.log(contentIds);
        // 2. Fetch from MongoDB
        const contents = yield ContentModel_1.default.find({
            _id: { $in: contentIds },
            userId: req.userId,
        });
        //  3. Combine context
        const context = contents.map(c => c.extractedText).join("\n\n");
        //  4. Generate AI answer
        const answer = yield (0, GenerateAnswer_1.generateAnswer)(context, query);
        // console.log(answer) ;
        res.json({
            answer
        });
    }
    catch (err) {
        console.error("Search Error Details:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ message: "Internal Server Error or Search fails", error: errorMessage });
    }
});
exports.searchContentForAiAnswer = searchContentForAiAnswer;
//  searching   for  Note from  title and content  using   regex  in  mogo db data base 
const searchNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const keywords = req.query.search ?
            {
                $or: [
                    { title: { $regex: req.query.search, $options: "i" } },
                    { type: { $regex: req.query.search, $options: "i" } }
                ]
            } : {};
        const contents = yield ContentModel_1.default.find(Object.assign(Object.assign({}, keywords), { userId: userId }));
        res.json({
            contents
        });
    }
    catch (err) {
        console.error("Search Error Details:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({ message: "Internal Server Error or Search fails", error: errorMessage });
    }
});
exports.searchNote = searchNote;
//# sourceMappingURL=searchCon.js.map
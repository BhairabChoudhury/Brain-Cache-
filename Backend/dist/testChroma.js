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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" }); // Load configuration from .env
const aiservics_1 = require("./Services/aiservics");
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Checking Vector DB / ChromaDB using actual services...");
        console.log("CHROMA_HOST:", process.env.CHROMA_HOST || "localhost (default)");
        console.log("CHROMA_PORT:", process.env.CHROMA_PORT || "8000 (default)");
        try {
            console.log("Getting or creating collection 'second_brain'...");
            const col = yield (0, aiservics_1.collection)();
            console.log("Collection successfully retrieved/created.");
            const countBefore = yield col.count();
            console.log("Current document count in collection:", countBefore);
            console.log("Adding a test document...");
            const testId = "test_doc_" + Date.now();
            yield col.add({
                ids: [testId],
                documents: ["Hello from Second Brain test script! This verifies if vector search is functioning."],
                metadatas: [{ source: "test_script" }]
            });
            console.log("Test document added successfully with ID:", testId);
            console.log("Querying ChromaDB for 'vector search'...");
            const queryResult = yield col.query({
                queryTexts: ["vector search"],
                nResults: 1
            });
            console.log("Query Result:", JSON.stringify(queryResult, null, 2));
            console.log("Cleaning up test document...");
            yield col.delete({ ids: [testId] });
            console.log("Test document deleted successfully.");
            console.log("\n>>> INTEGRATED VECTOR DB IS WORKING PERFECTLY! <<<");
        }
        catch (error) {
            console.error("\n>>> INTEGRATED VECTOR DB IS NOT WORKING! <<<");
            console.error("Error details:", error);
        }
    });
}
test();
//# sourceMappingURL=testChroma.js.map
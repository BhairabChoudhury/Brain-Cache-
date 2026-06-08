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
Object.defineProperty(exports, "__esModule", { value: true });
exports.collection = void 0;
const chromadb_1 = require("chromadb");
const client = new chromadb_1.ChromaClient({
    host: process.env.CHROMA_HOST || "localhost",
    port: process.env.CHROMA_PORT ? parseInt(process.env.CHROMA_PORT, 10) : 8000
});
const COLLECTION_NAME = "second_brain";
const collection = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield client.getOrCreateCollection({ name: COLLECTION_NAME });
});
exports.collection = collection;
//# sourceMappingURL=aiservics.js.map
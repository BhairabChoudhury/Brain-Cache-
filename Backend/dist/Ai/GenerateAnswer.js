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
exports.generateAnswer = void 0;
const generative_ai_1 = require("@google/generative-ai");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const generateAnswer = (context, query) => __awaiter(void 0, void 0, void 0, function* () {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const prompt = `
  Answer the question using the context below.

  Context:
  ${context}

  Question:
  ${query}
  `;
    const result = yield model.generateContent(prompt);
    const response = yield result.response;
    return response.text();
});
exports.generateAnswer = generateAnswer;
//# sourceMappingURL=GenerateAnswer.js.map
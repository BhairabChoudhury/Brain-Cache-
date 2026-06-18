import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export const generateAnswer = async (context: string, query: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest"});

  const prompt = `
You are an AI assistant for a personal knowledge base.

Use only the provided context to answer the user's question.

If the answer is not present in the context, clearly state that the information was not found.

  Context:
  ${context}

  Question:
  ${query}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
};
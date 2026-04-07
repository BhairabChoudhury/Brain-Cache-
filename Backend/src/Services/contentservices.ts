import ContentModel from "../Models/ContentModel";
// Assume you have some file upload + text extraction utils
import { extractTextFromPDF } from "../utils/pdf";
import { extractTextFromImage } from "../utils/orc";

// 🔵 Mock Chroma function (you will replace later)
const addToVectorDB = async (text: string, contentId: string) => {
  // send text + id to Chroma
  console.log("Embedding stored for:", contentId);
};

interface CreateContentInput { // model of data which i recive from controller  
  title: string;
  type: "note" | "link" | "pdf" | "image";
  content?: string;
  url?: string;
  file?: any ; // file which is comming from multer middleware 
  userId: string;
}

// ➕ CREATE CONTENT
export const createContent = async (data: CreateContentInput) => {
  const { title, type, content, url, file, userId } = data;

  let fileUrl = "";
  let extractedText = "";
  let URL = "" ; 
  // 🧠 TYPE HANDLING
  if (type === "note" ) {
    if (!content) throw new Error("Content required for note");
    extractedText = content;
  }

  else if (type === "link" ) {
    if (!url) throw new Error("URL required");
    URL = url; // later you can fetch metadata
  }

  else if (type === "pdf") {
    if (!file) throw new Error("PDF file required");

    // 1. Upload file (local/cloud)
    // fileUrl = await uploadFile(file);
    fileUrl = `/uploads/${file.originalname}`;

    // 2. Extract text from PDF
    extractedText = await extractTextFromPDF(file.path);
    // extractedText = "Sample extracted PDF text"; // placeholder
  }

  else if (type === "image") {
    if (!file) throw new Error("Image file required");

    // fileUrl = await uploadFile(file);
    fileUrl = `/uploads/${file.originalname}`;

    // OCR 
    extractedText = await extractTextFromImage(file.path) ; 
  }

  else {
    throw new Error("Invalid content type");
  }

  // 🗄️ Save in MongoDB
  const newContent = await ContentModel.create({
    title,
    type,
    URL,
    fileUrl,
    extractedText,
    userId
  });

  // 🤖 Send to Vector DB (Chroma)
  if (extractedText) {
    await addToVectorDB(extractedText, String(newContent._id)); //  send  text and id  of contend to vector db  
  }

  return newContent;
};

// 🔍 GET ALL CONTENT
export const getAllContent = async (userId: string) => {
  return await ContentModel.find({ userId }).sort({ createdAt: -1 });
};

// ❌ DELETE CONTENT
export const deleteContent = async (id: string) => {
  return await ContentModel.findByIdAndDelete(id);
};

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
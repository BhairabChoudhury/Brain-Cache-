import Tesseract from "tesseract.js";

export const extractTextFromImage = async (imagePath: string): Promise<string> => {
  try {
    const result = await Tesseract.recognize(
      imagePath,
      "eng", // language (can add more later)
      {
        logger: m => console.log(m) // optional progress log
      }
    );

    return result.data.text;
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Failed to extract text from image");
  }
};
import { Request, Response } from "express";
import ChatSessionModel from "../Models/ChatSession";
import { searchEmbedding } from "../Ai/SearchEm";
import ContentModel from "../Models/ContentModel";
import { generateAnswer } from "../Ai/GenerateAnswer";
import { success } from "zod";

// Create a new blank chat session
export const createSession = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const newSession = new ChatSessionModel({
      userId,
      title: "New Chat",
      messages: []
    });

    await newSession.save();

    res.status(201).json({
      success: true,
      data: newSession
    });
  } catch (error: any) {
    console.error("Create Chat Session Error:", error);
    //  this error is not comming from the server
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
};

// Get all chat sessions for the logged-in user
export const getSessions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const sessions = await ChatSessionModel.find({ userId }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: sessions
    });
  } catch (error: any) {
    console.error("Get Chat Sessions Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get a specific chat session by ID
export const getSessionById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { sessionId } = req.params;

    const session = await ChatSessionModel.findOne({ _id: sessionId, userId });

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
  } catch (error: any) {
    console.error("Get Chat Session By ID Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a specific chat session
export const deleteSession = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { sessionId } = req.params;

    const deleted = await ChatSessionModel.findOneAndDelete({ _id: sessionId, userId });

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
  } catch (error: any) {
    console.error("Delete Chat Session Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Send a message and generate RAG response in a session
export const addMessageToSession = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { sessionId } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    // Find session
    const session = await ChatSessionModel.findOne({ _id: sessionId, userId });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Chat session not found"
      });
    }

    // Perform RAG Vector Search
    let context = "";
    let referencedNotes: any[] = [];
    try {
      const contentIds = await searchEmbedding(message);
      if (contentIds && contentIds.length > 0) {
        const contents = await ContentModel.find({
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
    } catch (searchError) {
      console.error("RAG Search failed, proceeding with direct LLM query:", searchError);
    }

    // Generate AI response
    let answer = "";
    try {
      answer = await generateAnswer(context, message);
    } catch (genError: any) {
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

    await session.save();

    res.status(200).json({
      success: true,
      data: {
        session,
        answer,
        referencedNotes
      }
    });
  } catch (error: any) {
    console.error("Add Message Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

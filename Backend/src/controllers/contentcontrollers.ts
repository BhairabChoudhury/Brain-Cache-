import { Request, Response } from "express";
import * as contentService from "../Services/contentservices";

//  Create Content
export const createContent = async (req: Request, res: Response) => {
  try {
    const { title, type,  content , url , tags  } = req.body; 

    const file = (req as any).file; // for pdf/image which handel by multer middleware 

    const newContent = await contentService.createContent({
      title,
      type,
      url,
      content,
      file,// infomation of file  
      // @ts-ignore  
      tags , //  
      userId: (req as any).userId // from auth middleware
    });

    res.status(201).json({
      success: true,
      data: newContent
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Content
export const getAllContent = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const contents = await contentService.getAllContent(userId);

    res.status(200).json({
      success: true,
      data: contents
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//  Delete Content
export const deleteContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await contentService.deleteContent(id as string); //   

    res.status(200).json({
      success: true,
      message: "Content deleted successfully"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
import { Request , Response } from "express";
import { searchEmbedding  } from "../Ai/SearchEm";
import ContentModel from "../Models/ContentModel" ; 
import { generateAnswer } from "../Ai/GenerateAnswer"; 

export const searchContentForAiAnswer = async ( req: Request , res : Response) =>{
     try {
      const { query } = req.body ; 

      if( !query ) {
         return res.status(400).json({message : " Query Required"}) ; 
      }
    // console.log(query) ;
    //  1. Vector Search
    const contentIds = await searchEmbedding(query);
    console.log(contentIds) ;
    // 2. Fetch from MongoDB
    const contents = await ContentModel.find({
      _id: { $in: contentIds },
      userId: (req as any).userId,

    });

    //  3. Combine context
    const context = contents.map(c => c.extractedText).join("\n\n");

    //  4. Generate AI answer
    const answer = await generateAnswer(context, query);
    // console.log(answer) ;
    res.json({
      answer
    });

     } catch (err) {
         console.error("Search Error Details:", err);
         const errorMessage = err instanceof Error ? err.message : "Unknown error";
         res.status(500).json({message : "Internal Server Error or Search fails", error: errorMessage})  ;  
     }
      
}
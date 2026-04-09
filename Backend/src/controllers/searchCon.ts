import { Request , Response } from "express";
import { searchEmbedding  } from "../Ai/SearchEm";
import ContentModel from "../Models/ContentModel" ; 
import { AsyncLocalStorage } from "async_hooks";

export const searchContent = async ( req: Request , res : Response) =>{
     try {
      const { query } = req.body ; 

      if( !query ) {
         return res.status(400).json({message : " Query Required"}) ; 
      }
 
    // 🔍 1. Vector Search
    const contentIds = await searchEmbedding(query);

    // 📦 2. Fetch from MongoDB
    const contents = await ContentModel.find({
      _id: { $in: contentIds },
      userId: (req as any).user.id,
    });

    // 🧠 3. Combine context
    const context = contents.map(c => c.extractedText).join("\n\n");

    // 🤖 4. Generate AI answer
   // const answer = await generateAnswer(context, query);

    // res.json({
    //   answer,
    //   contents,
    // });


     } catch (err) {
         res.status(500).json({message : "Internal Server Error or Search fails "})  ;  
     }
}
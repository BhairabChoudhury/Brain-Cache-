import {collection} from "./aiservics" ; 
export const  storeEmbedding = async (contentId : string , text:string ) =>{
      try {
    const COLLECTION = await collection();

    await COLLECTION.add({
      ids: [contentId],
      documents: [text], // Chroma auto-embedding
    });

  } catch (error) {
    console.error("Embedding store error:", error);
  }
  
} 
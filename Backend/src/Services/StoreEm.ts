import {collection} from "./aiservics" ; 
export const  storeEmbedding = async (contentId : string , text:string ) =>{
      try {
    const COLLECTION = await collection();  
 console.log(contentId , "content id") ;
 console.log(text , "text") ;
    await COLLECTION.add({
      ids: [contentId],
      documents: [text], // Chroma auto-embedding
      metadatas: [{ source: "brain_Cache" }] // Added metadata to avoid null
    });
    const result = await COLLECTION.get({
      include: ["embeddings", "documents", "metadatas"] as any // Request embeddings
    });
    console.log(result);
  } catch (error) {

    console.error("Embedding store error:", error);
  }
  
} 
/*
docker run -p 8000:8000 -v ./chroma-db:/data chromadb/chroma

*/
import { ChromaClient } from "chromadb" ; 

const client = new ChromaClient({
  host: process.env.CHROMA_HOST || "localhost",
  port: process.env.CHROMA_PORT ? parseInt(process.env.CHROMA_PORT, 10) : 8000
}) ; 

const COLLECTION_NAME = "brain_Cache " ; 

export const collection = async () =>{
    return await client.getOrCreateCollection({ name: COLLECTION_NAME });
}

// second_brain              
import dotenv from "dotenv";
dotenv.config({ path: ".env" }); // Load configuration from .env

import { collection } from "./Services/aiservics";

async function test() {
  console.log("Checking Vector DB / ChromaDB using actual services...");
  console.log("CHROMA_HOST:", process.env.CHROMA_HOST || "localhost (default)");
  console.log("CHROMA_PORT:", process.env.CHROMA_PORT || "8000 (default)");

  try {
    console.log("Getting or creating collection 'second_brain'...");
    const col = await collection();
    console.log("Collection successfully retrieved/created.");

    const countBefore = await col.count();
    console.log("Current document count in collection:", countBefore);

    console.log("Adding a test document...");
    const testId = "test_doc_" + Date.now();
    await col.add({
      ids: [testId],
      documents: ["Hello from Second Brain test script! This verifies if vector search is functioning."],
      metadatas: [{ source: "test_script" }]
    });
    console.log("Test document added successfully with ID:", testId);

    console.log("Querying ChromaDB for 'vector search'...");
    const queryResult = await col.query({
      queryTexts: ["vector search"],
      nResults: 1
    });
    console.log("Query Result:", JSON.stringify(queryResult, null, 2));

    console.log("Cleaning up test document...");
    await col.delete({ ids: [testId] });
    console.log("Test document deleted successfully.");

    console.log("\n>>> INTEGRATED VECTOR DB IS WORKING PERFECTLY! <<<");
  } catch (error) {
    console.error("\n>>> INTEGRATED VECTOR DB IS NOT WORKING! <<<");
    console.error("Error details:", error);
  }
}

test();

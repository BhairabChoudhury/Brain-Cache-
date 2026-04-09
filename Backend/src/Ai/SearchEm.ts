import { collection } from "../Services/aiservics"
export const searchEmbedding = async (query : string ) =>{
 const CollectionSet = await collection(); 
   const  results = await CollectionSet.query({
    queryTexts: [query],
    nResults: 5,
  });
  return results.ids?.[0] || [] ; 
} ; 
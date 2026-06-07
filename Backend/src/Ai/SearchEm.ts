import { collection } from "../Services/aiservics"
export const searchEmbedding = async (query : string ) =>{
 const CollectionSet = await collection(); 
 const count = await CollectionSet.count();
 if (count === 0) return []; // If there are no documents, return empty array immediately
 
 const  results = await CollectionSet.query({
  queryTexts: [query],
  nResults: Math.min(5, count),
});
console.log(results.ids?.[0] || [] ) ;
return results.ids?.[0] || [] ; 
} ; 
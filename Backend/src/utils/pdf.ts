import fs from  "fs"  ; //  fs is file system  module 
import pdfParse from "pdf-parse" ; 

export const extractTextFromPDF = async ( pdfPath : string ) :  Promise<string>=>{
    const dataBuffer = fs.readFileSync(pdfPath) ;  
    const data = await (pdfParse as any)(dataBuffer) ;
    return data.text ;
}



























/*
const dataBuffer = fs.readFileSync(pdfPath) ;  // read the file  text  this proces  is syncro... process 
    const data = await (pdfParse as any)(dataBuffer) ; abstract   text  from  the file 
*/
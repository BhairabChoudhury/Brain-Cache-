import fs from  "fs"  ; 
import pdfParse from "pdf-parse" ; 

export const extractTextFromPDF = async ( pdfPath : string ) :  Promise<string>=>{
    const dataBuffer = fs.readFileSync(pdfPath) ;
    const data = await (pdfParse as any)(dataBuffer) ;
    return data.text ;
}
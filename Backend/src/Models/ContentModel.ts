import mongoose , { Schema , Document}from "mongoose";

export interface IContent extends Document{
    title:string ;
    type : "note" | "link" | "pdf" | "image" ;
    url?:string ;
    fileUrl?:string ; 
    extractedText?:string ;  
    userId :mongoose.Schema.Types.ObjectId;
    createdAt:Date ;
    updatedAt:Date ;  
}
const ContentSchema = new Schema<IContent>({
  title :{ type :String , required:true} ,
  type :{ type :String , enum:["note","link","pdf","image"] , required:true} ,
  url:{ type :String  } ,
  fileUrl :{ type :String  } ,
  extractedText :{ type :String  } , 
  userId :{ type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true} 
}, {  
    timestamps: true
})

const ContentModel = mongoose.model<IContent>("Content", ContentSchema)

export default ContentModel; 

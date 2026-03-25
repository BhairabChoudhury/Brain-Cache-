import mongoose from "mongoose";
 
async function connectDB(){
    await mongoose.connect("mongodb+srv://Rocky:8101866244@cluster0.ey9q8vn.mongodb.net/Brainly-Project") 
.then(()=>console.log("Mongo Db successfully Conected "))
.catch(err=>console.log("error catch",err)) ;   
} 

export default connectDB 

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    cname:{
        type: String,        
        required:true,
    },
    ccode:{
        type: String,
        required:true,                
    },
    userid:{
        type:String,
        required:true,
    },
    strength:{
        type:Number,
        required:true,
    },
    days:{
        type:Number,
        required:true,
    }
})

export default mongoose.model("Classroom", userSchema);
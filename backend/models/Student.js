import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,        
        required:true,
    },
    roll:{
        type: Number,
        required:true,
        unique:false,                        
    },
    roomid:{
        type:String,
        required:true,
    },    
    attendance:{
        type:Number,        
    },
    disabled:{
        type:Boolean,
        default:0,
    }
})

export default mongoose.model("Student", userSchema);
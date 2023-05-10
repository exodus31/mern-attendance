import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,        
    },
    institute:{
        type: String,        
    },
    email:{
        type: String,
        required: [true,'Please Enter Email'],
        unique:true,        
    },
    password:{
        type: String,
        required: [true,'Please Enter Password'],
        minlength:6,
    },    
    classrooms:[{type:mongoose.Types.ObjectId, ref:"Classroom", required:true}],
})

export default mongoose.model("User", userSchema);
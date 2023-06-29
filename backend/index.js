import express from 'express'
import mongoose from 'mongoose';
import User from './models/User.js';
import Classroom from './models/Classroom.js';
import Student from './models/Student.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';
const PORT = process.env.PORT || 5000
const app = express();

app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', false);
mongoose.connect(
    "mongodb+srv://sarthak31:SEqvslMQ3cItFdOm@cluster0.6vq59v8.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => app.listen(PORT))
.then(() => console.log("succ"))
.catch((err) => console.log(err))
//SEqvslMQ3cItFdOm
// User

app.get("/users", async (req, res) => {
    let users;
    try{
        users= await User.find();
    }catch(err){
        console.log(err)        
    }
    if(!users){
        return res.status(404).json({message:"Users not found"})
    }
    return res.status(200).json({users})
})

app.get("/user", async (req, res) => {
    jwt.verify(req.headers.token, "secretkey", (err ,dec) => {
        if(err){
            return res.status(401).json({
                message:"Please Login Again"
            })
        }
        User.findOne({_id:dec.userId}, (err, user) =>{
            if(err){
                return res.status(400).json({
                    message:"Please Try Again"
                })
            }
            return res.status(200).json({
                message:"Succ",
                userid:user._id,
                name:user.name,
                email:user.email,                
            })
        })
    })

})

app.post("/register", async (req, res) => {    
        const {name, email,password} = req.body;

        let existinguser;
        try{
            existinguser = await User.findOne({email})
        }catch(err){
            console.log(err)
        }
        if(existinguser){
            return res.status(400).json({message:"Email already in use"})    
        }
        const user = new User({   
            name,    
            email,        
            password,        
        })
        try{
            await user.save();
        }catch(err){
            return console.log(err)
        }
        return res.status(201).json({user})    
});

app.post("/login", async (req, res) => {
    const {email,password} = req.body;

    let existinguser;
    try{
        existinguser = await User.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(!existinguser){
        return res.status(404).json({message:"No User found"})    
    }
    
    if(password != existinguser.password){
        return res.status(404).json({message:"Incorrect Password"})
    }    
    let token = jwt.sign({ userId: existinguser._id }, "secretkey");
    return res.status(200).json({
        token:token,
        message:"Login Successful"
    })
})

app.delete("/deluser/:id", async (req, res) => {
    const uid = req.params.id;
    let user;
    try{
        user = await User.findByIdAndDelete(uid);
    }
    catch(err){
        console.log(err)
    }
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    return res.status(200).json({message:"User deleted"})
})

// Classroom
app.get("/allgetrooms", async (req, res) => {
    let rooms;

    try{
        rooms = await Classroom.find();
    }catch(err){
        console.log(err)
    }    

    if(!rooms){
        return res.status(404).json({message:"No rooms"})
    }    
    return res.status(200).json({rooms})
})

app.get("/getroom/:id", async (req, res) => {
    const id= req.params.id;
    let room;

    try{
        room = await Classroom.findById(id);
    }catch(err){
        console.log(err)
    }
    
    if(!room){
        return res.status(404).json({message:"Room not found"})
    }
    return res.status(200).json({room})

})

app.get("/getrooms/:id", async(req, res) => {
    const userid = req.params.id;
    let rooms;

    try{
        rooms = await Classroom.find({userid:userid})
    }catch(err){
        console.log(err)
    }

    if(rooms.length == 0){
        return res.status(404).json({message:"No Rooms for this User"})
    }
    return res.status(200).json({rooms})
})

app.post("/createroom", async (req, res) => {
    const {cname, ccode, userid, strength, days} = req.body;
    let rooms;
    let user;

    try{
        user = User.findById(userid);
    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }

    try{
        rooms = await Classroom.find({userid,ccode})
    }catch(err){
        console.log(err)
    }    

    if(rooms.length == 0){
        const room = new Classroom({
            cname,
            ccode,
            userid,
            strength,
            days
        })
        try{
            await room.save();
        }catch(err){
            console.log(err)
        }
        return  res.status(200).json({room})
    }
    return res.status(404).json({message:"Room Already Exists"})    
})

app.put("/editroom", async(req, res) => {    
    const {roomid, cname, ccode, days} = req.body;
    let room;    
    try{
        room = await Classroom.findById(roomid);
    }catch(err){
        console.log(err)
    }
    if(!room){
        return res.status(404).json({message:'Room not found'})
    }
    try{
        room.cname = cname;
        room.ccode = ccode;
        room.days = days;
        await room.save();
    }catch(err){
        console.log(err)
    } 
    return res.status(200).json({message:'Updated successfully'})
})

app.delete("/del/:id", async (req, res) => {
    const id = req.params.id;
    let room;

    try{
        room = await Classroom.findByIdAndDelete({_id:id})
    }catch(err){
        console.log(err)
    }
    if(!room){
        return res.status(404).json({message:"Room Does Not Exist"})
    }
    let students;
    if(room.strength == 0){
        return res.status(200).json({message:"Deleted Successfully"})
    }
    try{
        students = await Student.deleteMany({roomid: room.id})
    }   
    catch(err){
        console.log(err)
    }
    return res.status(200).json({message:"Deleted Successfully"})
})

// STUDENT

app.get("/getstudents/:id", async(req, res) => {
    const id = req.params.id;
    let students;

    try{
        students = await Student.find({roomid:id}).sort({roll:1})
    }catch(err){
        console.log(err)
    }

    if(students.length == 0){
        return res.status(404).json({message:"No Students for this room"})
    }
    return res.status(200).json({students})

}) 

app.post("/createstudent", async (req, res) => {
    const {name, roll, roomid, attendance} = req.body;
    let students;
    let room;

    try{
        room = await Classroom.findById(roomid)
    }catch(err){
        console.log(err)
    }

    if(!room){
        return res.status(404).json({message:"Room not found"})
    }
    let x=room.strength;
    x=x+1;
    try{
        students = await Student.find({roomid, roll});
    }catch(err){
        console.log(err);
    }

    if(students.length == 0){
        const student = new Student({
            name,
            roll,
            roomid,
            attendance,
        })

        try{
            await student.save();
            await room.updateOne({strength:x})
        }catch(err){
            console.log(err);
        }
        return res.status(200).json({student});
    }
    return res.status(500).json({message:`Student ${roll} already exists`});

})

app.put("/updatestudent/:id", async (req, res) => {
    const id = req.params.id;
    let student;

    try{
        student = await Student.findById(id);
    }catch(err){
        console.log(err)
    }

    if(!student){
        return res.status(404).json({message:"Student does not exist"})
    }

    try{
        student.attendance=student.attendance+1;
        student.disabled=1;
        await student.save();
    }catch(err){
        console.log(err)
    }    
    return res.status(200).json({student})
})

app.put("/updatestudentabs/:id", async (req, res) => {
    const id = req.params.id;
    let student;

    try{
        student = await Student.findById(id);
    }catch(err){
        console.log(err)
    }

    if(!student){
        return res.status(404).json({message:"Student does not exist"})
    }

    try{
        student.attendance=student.attendance-1;
        student.disabled=0;
        await student.save();
    }catch(err){
        console.log(err)
    }    
    return res.status(200).json({student})
})

app.post("/confirmed/:id", async (req, res) => {
    const id = req.params.id;
    const {binary} = req.body;
    let students;
    let room;
    try{
        students = await Student.find({roomid:id}).sort({roll:1})
        room = await Classroom.findById(id)
    }catch(err){
        console.log(err)
    }
    let idx=0;
    students.map(async (student) => {
        student.attendance += binary[idx].value;
        idx++;
        await student.save();
    })    
    room.days=room.days+1;
    await room.save();
    return res.status(200).json({students})
})

app.delete("/delstudent/:id", async (req, res) => {
    const id = req.params.id;
    let student;
    let room;

    try{
        student = await Student.findByIdAndDelete(id);
        room = await Classroom.findById(student.roomid)
    }catch(err){
        console.log(err)
    }
    if(!student){
        return res.status(404).json({message:'Student Not Found'})
    }    
    room.strength = room.strength-1;
    await room.save();
    return res.status(200).json({student})
})

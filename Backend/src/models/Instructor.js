
import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Photo:{
        type:String, 
    },
    Courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    Institute:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Institute"
    },
    Student:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    }],
    Bio:{
        type:String,
    },
    PhoneNumber:{
        type:String,
        required:true
    },

})

const InstructorSchema = mongoose.model("Instructor", instructorSchema);
export default InstructorSchema;
import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Lectures:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture", 
    }],
    Course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    Duration: {
        type: String,
    },
    Test:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
    }],
    TestMarks:{
        type: Number,
    },
},{
    timestamps: true,
})

export default mongoose.model("Module", moduleSchema);
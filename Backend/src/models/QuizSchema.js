import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Questions: [
        { 
            type:mongoose.Schema.Types.ObjectId,
            ref:"Question"
        }
    ],
    totalQuestions:{
        type:Number,
    },
    Marks:{
        type:Number,
    },
    Duration:{
        type:String,
    },
    Type:{
        type:String,
    },
},{
    timestamps:true
})

export default mongoose.model("Quiz", quizSchema);

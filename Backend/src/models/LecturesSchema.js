import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Video: {
        type: String,
        default: "",
    },
    Duration: {
        type: String,
        default: 0
    },
    Module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
    },
     pdf: {
        type: String,
        default: null,
    },
    Quiz:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        default: null,
    }],
    QuizMarks: {
        type: Number,
        default: 0,
    },
},{
    timestamps: true,
})

const LectureSchema = mongoose.model("Lecture", lectureSchema);
export default LectureSchema;
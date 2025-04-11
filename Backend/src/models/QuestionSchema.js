import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: true,
    },
    Options: {
        type: [String],
        required: true,
    },
    Answer: {
        type: String,
        required: true,
    },
    Quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
    },
},{
    timestamps:true
})

export default mongoose.model("Question", questionSchema);
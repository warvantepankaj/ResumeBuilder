import mongoose from "mongoose";

const ResumeBuilderSchema = mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User", 
         required: true 
    },

    title: String,

    content: Object, 
    
    createdAt: { type: Date, default: Date.now },
});

export const Resume = mongoose.model("Resume",ResumeBuilderSchema);
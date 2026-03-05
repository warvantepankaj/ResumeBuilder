import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    clerkId:{
        type:String,
        require:true,
        unique:true
    },

    name:String,

    email:{
        type:String,
        unique:true
    }
});

export const User = mongoose.model("User",UserSchema);
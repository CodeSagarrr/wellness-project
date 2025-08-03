import mongoose from "mongoose";


const userAuthSchema = mongoose.Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
}, { timestamps : true })

export const UserAuth = mongoose.model("UserAuth", userAuthSchema);
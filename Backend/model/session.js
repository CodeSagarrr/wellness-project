import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description : {
    type : String,
    required : true
  },
  tags: [String],
  json_file_url: {
    type: String,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
  },
  difficulty : {
    type : String,
    enum : ["Beginner" , "Intermediate" , "Advanced"],
    default : "Beginner"
  },
  
} , {timestamps : true});

export const SessionModel = mongoose.model("SessionModel", sessionSchema);

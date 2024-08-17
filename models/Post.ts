import mongoose from "mongoose";
import { PostInfo } from "../interfaces/post/PostInfo";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    dateTimeOfPosting: {
        type: Date,
        required: true,
        default: Date.now,
    },
    additional: {
        category: { type: String },
        season: { type: String },
    },
});

export default mongoose.model<PostInfo & mongoose.Document>("Post", PostSchema);
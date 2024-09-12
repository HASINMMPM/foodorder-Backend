import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minlength: [50, "Comment must be at least 50 characters long"],
  },
  isShow:{
    type: Boolean,
    default: false,
    required: true,
  }
});
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;

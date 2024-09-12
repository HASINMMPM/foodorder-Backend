import Comment from "../Models/commentModel.js";

const addComment = async (req, res) => {
  try {
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const newComment = new Comment({ comment });
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(500)
      .json({ message: "Failed to add comment", error: error.message });
  }
};
// get all

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find(); // Fetch only comments marked as "show"

    // If there are no comments
    if (!comments.length) {
      return res.status(404).json({ message: "No comments found" });
    }

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
};

// Add best
const bestComment = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id);
    // Find the comment by ID
    const comment = await Comment.findById(id);

    // If the comment doesn't exist
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Mark the comment as "best" by updating the isShow field
    const bestComment = await Comment.findByIdAndUpdate(
      id,
      { isShow: !comment.isShow }, // Update the isShow field to true
      { new: true } // Return the updated comment
    );

    // If the update failed
    if (!bestComment) {
      return res
        .status(500)
        .json({ message: "Failed to mark as best comment" });
    }

    // Successful response
    return res
      .status(200)
      .json({ bestComment, message: "Comment marked as best" });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

export { addComment, bestComment, getAllComments };

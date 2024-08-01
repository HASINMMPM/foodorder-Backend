import mongoose from "mongoose";

const foodschema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  Price: {
    type: Number,
    required: true,
    minlength: 1,
  },
  Description: {
    type: String,
    required: true,
    minlength: 10,
  },
  Category: {
    type: String,
    required: true,
    // enum: ["Appetizers", "Main Courses", "Desserts"],
  },
  Image: {
    type: String,
    required: true,
  },
  Restaurant: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
      require: true,
    },
  ],
});
const Food = mongoose.model("Food", foodschema);
export default Food;

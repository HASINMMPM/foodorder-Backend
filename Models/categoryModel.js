import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;


// "http://res.cloudinary.com/dytr4lpxm/image/upload/v1722992863/gr71pusb5…"
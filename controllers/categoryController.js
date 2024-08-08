import { cloudinaryInstance } from "../config/cloudinary.js";
import Category from "../Models/categoryModel.js";

// Create category

const addCategory = async (req, res) => {
  try {
    console.log("try to add a category");

    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    cloudinaryInstance.uploader.upload(
      req.file.path,
      async (err, categoryResult) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Failed to upload image", error: err });
        }
        // console.log(categoryResult);

        const { name } = req.body;
        console.log("req.body", req.body);

        const category = new Category({
          name,
          image: categoryResult.url,
        });

        const newCategory = await category.save();
        if (!newCategory) {
          return res.status(400).json({ message: "Failed to add Category" });
        }

        res
          .status(201)
          .json({
            message: "Category added successfully",
            Category: newCategory,
          });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ERROR IS", error: err });
  }
};

// All category

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ERROR IS", error: err });
  }
};

// delete

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ERROR IS", error: err });
  }
};

export { addCategory, getAllCategories, deleteCategory };

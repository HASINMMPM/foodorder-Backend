import jwt from "jsonwebtoken";
import { cloudinaryInstance } from "../config/cloudinary.js";
import "dotenv/config";
import Food from "../Models/foodModel.js";
import { Restaurant } from "../Models/restorantModel.js";
import Category from "../Models/categoryModel.js";


const addFood = async (req, res) => {
  try {
    console.log("Trying to add a food");

    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    cloudinaryInstance.uploader.upload(req.file.path, async (err, foodCloudResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to upload image", error: err });
      }

      const { title, price, description, category, restaurant } = req.body;
      console.log("req.body", req.body);

      const token = req.cookies.token;
      let tokenOwnerID;
      jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }
        tokenOwnerID = result.id; 
      });

      const checkRestaurant = await Restaurant.findOne({ Title: restaurant });
      if (!checkRestaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      console.log("checkRestaurant", checkRestaurant);

      const ownerID = checkRestaurant.Owner.toString(); // Convert to string for comparison

      console.log("OwnerID", ownerID);
      console.log("TokenOwnerID", tokenOwnerID);
      if (ownerID !== tokenOwnerID) {
        return res.status(403).json({ message: "Unauthorized user" });
      }

      const categoryNames = category.split(',');  
      const checkCategory = await Category.find({ name: { $in: categoryNames } });
      console.log("checkCategory", checkCategory);
      if (checkCategory.length !== categoryNames.length) {
        return res.status(404).json({ message: "One or more categories not found" });
      }

      const food = new Food({
        title,
        price,
        description,
        image: foodCloudResult.url,
        categories: checkCategory.map(cat => cat._id),
        restaurant: checkRestaurant._id,
      });

      const newFood = await food.save();

      if (!newFood) {
        return res.status(400).json({ message: "Failed to add food" });
      }

      res.status(201).json({ message: "Food added successfully", food: newFood });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
};

//  get all food

const getAllFood = async (req, res) => {
  try {
    const allFoods = await Food.find();
    if (allFoods.length === 0) {
      return res.status(404).json({ message: "No food found to show" });
    }
    res.send(allFoods);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ERROR is", err });
  }
};

//  get food by id

const getFoodById = async (req, res) => {
  try {
    const singleFood = await Food.findById(req.params.id);
    if (!singleFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.send(singleFood);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", err });
  }
};

//  update food

const updateFood = async (req, res) => {
  try {
    const id = req.params.id;
    const checkFood = await Food.findById(id);
    if (!checkFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    const { title, price, description, category } = req.body;
    const updatedFood = await Food.findByIdAndUpdate(
      id,
      {
        title: title,
        price: price,
        description: description,
        category: category,
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: "Failed to update food" });
    }

    res.send(updatedFood);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
};

//  delete food

const deleteFood = async (req, res) => {
  const id = req.params.id;
  try {
    const checkFood = await Food.findById(id);

    if (!checkFood) {
      return res.status(404).json({ message: "Food not found" });
    } else {
      console.log(checkFood);
    }
    const foodToDelete = await Food.findByIdAndDelete(id);
    if (!foodToDelete) {
      return res.status(404).json({ message: "Food not Deleted" });
    }
    await unlink(`uploaded_images/${checkFood.Image}`, () => {});
    res.send({ message: "Food deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", err });
  }
};

export { addFood, getAllFood, getFoodById, updateFood, deleteFood };

import jwt from "jsonwebtoken";
import { cloudinaryInstance } from "../config/cloudinary.js";
import "dotenv/config";
import Food from "../Models/foodModel.js";
import { Restaurant } from "../Models/restorantModel.js";
import Category from "../Models/categoryModel.js";

const addFood = async (req, res) => {
  try {
    console.log("Trying to add a food");

    // Check for the image in the request
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    // Upload image to Cloudinary
    const foodCloudResult = await cloudinaryInstance.uploader.upload(
      req.file.path
    );

    const { title, price, description, category, restaurant } = req.body;
    console.log("req.body", req.body);
    console.log("rew res", restaurant);

    // const token = req.cookies.token; // Ensure token is passed correctly
    // let tokenOwnerID;

    // // Check if the token exists
    // if (!token) {
    //   return res.status(401).json({ message: "Unauthorized, token missing" });
    // }

    // // Verify token
    // jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(403).json({ message: "Invalid token" }); // Corrected to res.status
    //   }
    //   tokenOwnerID = result.id;
    // });

    // Check if the restaurant exists

    const checkRestaurant = await Restaurant.findOne({ _id: restaurant });
    console.log("checkRestaurant", checkRestaurant);
    if (!checkRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // // Verify owner of the restaurant
    // const ownerID = checkRestaurant.Owner.toString(); // Convert to string for comparison
    // console.log("OwnerID", ownerID);
    // console.log("TokenOwnerID", tokenOwnerID);
    // if (ownerID !== tokenOwnerID) {
    //   return res.status(403).json({ message: "Unauthorized user" });
    // }

    // Check if the categories exist
    // const categoryNames = category.split(",");
    // const checkCategory = await Category.find({ name: { $in: categoryNames } });
    const categoryIds = category;
    const checkCategory = await Category.find({ _id: { $in: categoryIds } });

    console.log("checkCategory", checkCategory);

    if (!checkCategory) {
      return res.status(404).json({ message: "categories not found" });
    }

    // Create and save new food
    const food = new Food({
      title,
      price,
      description,
      image: foodCloudResult.url,
      categories: checkCategory.map((cat) => cat._id),
      restaurant: checkRestaurant._id,
    });

    const newFood = await food.save();
    if (!newFood) {
      return res.status(400).json({ message: "Failed to add food" });
    }

    // Send success response
    res.status(201).json({ message: "Food added successfully", food: newFood });
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
    const checkFood = await Food.findById(req.params.id);
    if (!checkFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      { isPopular: !checkFood.isPopular },
      { new: true }
    );

    res.status(200).json(updateFood);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating Best Restaurant",
      error: error.message,
    });
  }
};

//  delete food

const deleteFood = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.send(deletedFood);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// delte all food

const deleteAllFood = async (req, res) => {
  try {
    const deletedFood = await Food.deleteMany({});
    if (deletedFood.deletedCount === 0) {
      return res.status(404).json({ message: "No food found to delete" });
    }
    res.send(deletedFood);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
};

export {
  addFood,
  getAllFood,
  getFoodById,
  updateFood,
  deleteFood,
  deleteAllFood,
};

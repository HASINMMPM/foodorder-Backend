import { unlink } from "node:fs";

import { cloudinaryInstance } from "../config/cloudinary.js";
import "dotenv/config";
import Restaurant from "../Models/restorantModel.js";
import Food from "../Models/foodModel.js";
// import Restaurant from "../Models/restorantModel.js";

//  add food
// const addFood = async (req, res) => {

//   try {
//     console.log("try to add a food");
//     req.body.image = req.file.path

//     if(!req.file) {
//       return res.send("file is not visible")
//       }
//       cloudinaryInstance.uploader.upload(req.file.path , async (err,res) => {
//         if(err) {
//           console.log(err);
//           return res.status(500).json({ message: "Failed to upload image", error: err });
//         }
//         // console.log('res is ',res);

//       })

//     // const { title, price, description, category,restaurant } = req.body;
//     // const checkRestaurant = await Restaurant.find({Title :restaurant})
//     // if(!checkRestaurant) {
//     //   return res.status(404).json({ message: "Restaurant not found" });
//     // }
//     const { title, price, description, category, } = req.body;

//     const food = new Food({
//       Title: title,
//       Price: price,
//       Description: description,
//       Image: res.url,
//       Category: category,
//       // Restaurant:checkRestaurant
//     });
//     const newFood = await food.save();
//     if (!newFood) {
//       return res.status(400).json({ message: "Failed to add food" });
//     }
//     res.status(201).json({ message: "Food added successfully", food });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error", err });
//   }
// };

const addFood = async (req, res) => {
  try {
    console.log("try to add a food");

    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    cloudinaryInstance.uploader.upload(
      req.file.path,
      async (err, foodCloudResult) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Failed to upload image", error: err });
        }
        // console.log(foodCloudResult);

        const { title, price, description, category, restaurant, ownerID } =
          req.body;

        const checkRestaurant = await Restaurant.find({
          Title: restaurant,
          Owner: ownerID,
        });
        if (!checkRestaurant) {
          return res.status(404).json({ message: "Restaurant not found" });
        }
        const food = new Food({
          Title: title,
          Price: price,
          Description: description,
          Image: foodCloudResult.url,
          Category: category,
          Restaurant: checkRestaurant,
        });

        const newFood = await food.save();

        if (!newFood) {
          return res.status(400).json({ message: "Failed to add food" });
        }

        res
          .status(201)
          .json({ message: "Food added successfully", food: newFood });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ERROR IS", error: err });
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

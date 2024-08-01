// add res

import { cloudinaryInstance } from "../config/cloudinary.js";
import Restaurant from "../Models/restorantModel.js";
import Admin from "../Models/adminModel.js";

const addRestaurant = async (req, res) => {
  try {
    console.log("try to add a Restourant");

    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }
    cloudinaryInstance.uploader.upload(
      req.file.path,
      async (err, restoresult) => {
        if (err) {
          console.log(err);
          return res.status(400).send(err);
        }
        console.log("Image uploaded successfully");

        const { title, place, description, type, workingtime, ownerNumber } =
          req.body;
        const owner = await Admin.findOne({ phoneNumber: ownerNumber });
        if (!owner) {
          return res
            .status(400)
            .json({ message: "No admin found with that number" });
        }
        const restaurant = new Restaurant({
          Title: title,
          Place: place,
          Description: description,
          Type: type,
          WorkingTime: workingtime,
          Owner: owner,
          Image: restoresult.url,
        });

        const newRestaurant = await restaurant.save();
        if (!newRestaurant) {
          return res.status(400).json({ message: "Failed to add restaurant" });
        }
        res.status(201).send(newRestaurant);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(" Error", error);
  }
};

// get all Restaurant

const getAllRestaurants = async (req, res) => {
  try {
    console.log("try to get all Restaurants");
    const restaurants = await Restaurant.find();
    if (restaurants.length == 0) {
      return res
        .status(201)
        .json({ message: "Not enough restaurants available" });
    }
    res.send(restaurants);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error", error);
  }
};

// get one restaurant

const getRestaurantById = async (req, res) => {
  try {
    console.log("try to get a Restaurant");
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error", error);
  }
};

// delete restaurants

const deleteRestaurant = async (req, res) => {
  try {
    console.log("try to delete a Restaurant");
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error", error);
  }
};
export {
  addRestaurant,
  getAllRestaurants,
  deleteRestaurant,
  getRestaurantById,
};

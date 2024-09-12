import Admin from "../Models/adminModel.js";
import { Restaurant, VerifyRestaurant } from "../Models/restorantModel.js";
import Food from "../Models/foodModel.js";

// Add Restaurant
const addRestaurant = async (req, res) => {
  try {
    console.log("Trying to add a Restaurant");
    const checkVerifyRestaurant = await VerifyRestaurant.findById(req.params.id);

    if (!checkVerifyRestaurant) {
      return res.status(400).json({ message: "No Restaurant with this data" });
    }

    const newRestaurant = new Restaurant({
      Title: checkVerifyRestaurant.Title,
      Place: checkVerifyRestaurant.Place,
      Description: checkVerifyRestaurant.Description,
      Type: checkVerifyRestaurant.Type,
      WorkingTime: checkVerifyRestaurant.WorkingTime,
      Owner: checkVerifyRestaurant.Owner,
      Image: checkVerifyRestaurant.Image,
    });

    const savedRestaurant = await newRestaurant.save();
    if (!savedRestaurant) {
      return res.status(400).json({ message: "Failed to add restaurant" });
    }

    // Delete verify restaurant entry
    await VerifyRestaurant.findByIdAndDelete(req.params.id);

    // Update admin with the new restaurant
    const admin_id = savedRestaurant.Owner;
    const upadmin = await Admin.findByIdAndUpdate(admin_id, {
      $push: { restaurant: savedRestaurant._id } // Assuming restaurant is an array
    });

    res.status(201).json({
      message: "Restaurant added successfully and linked to admin",
      restaurant: savedRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// Get all Restaurants
const getAllRestaurants = async (req, res) => {
  console.log("try to all res")
  try {
    const restaurants = await Restaurant.find();
    if (restaurants.length === 0) {
      return res.status(404).json({ message: "Not enough restaurants available" });
    }
  
    res.status(200).json(restaurants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching restaurants", error: error.message });
  }
};

// Get one Restaurant by ID
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching restaurant", error: error.message });
  }
};

// Delete Restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const foods = await Food.deleteMany({restaurant:req.params.id})
    console.log(`Deleted ${foods.deletedCount} foods`)
    res.status(200).json({ message: "Restaurant deleted successfully", restaurant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting restaurant", error: error.message });
  }
};

// Add/Remove Best Restaurant
const addBestRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { BestRestaurant: !restaurant.BestRestaurant },
      { new: true }
    );

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating Best Restaurant", error: error.message });
  }
};

export {
  addRestaurant,
  getAllRestaurants,
  deleteRestaurant,
  getRestaurantById,
  addBestRestaurant,
};

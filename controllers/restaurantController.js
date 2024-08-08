import Admin from "../Models/adminModel.js";
import { Restaurant, VerifyRestaurant } from "../Models/restorantModel.js";

// add res

const addRestaurant = async (req, res) => {
  try {
    console.log("Trying to add a Restaurant");
    const checkVerifyRestaurant = await VerifyRestaurant.findById(req.params.id);
    console.log("checkVerifyRestaurant", checkVerifyRestaurant);

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
    console.log("newRestaurant", newRestaurant);

    const savedRestaurant = await newRestaurant.save();

    if (!savedRestaurant) {
      return res.status(400).json({ message: "Failed to add restaurant" });
    }
    // Delete verify restaurant entry

    const id = req.params.id;
    await VerifyRestaurant.findByIdAndDelete(id);


    // Update admin with the new restaurant

    const admin_id = savedRestaurant.Owner;
    console.log("admin", admin_id);
    console.log("newRestaurant title", savedRestaurant.Title);

    const upadmin = await Admin.findByIdAndUpdate(admin_id, {
      restaurant: savedRestaurant._id, 
    });
    console.log("upadmin",upadmin)

    res.status(201).json({
      message: "Restaurant added successfully and linked to admin",
      restaurant: savedRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred", error: error.message });
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

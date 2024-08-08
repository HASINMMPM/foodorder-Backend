import { Restaurant, VerifyRestaurant } from "../Models/restorantModel.js";

// add res

const addRestaurant = async (req, res) => {
  try {
    console.log("try to add a Restourant");
    const checkVerifyRestaurant = await VerifyRestaurant.find({
      _id: req.params.id,
    });
    if (!checkVerifyRestaurant) {
      return res.status(400).json({ message: "No Restaurant with this data" });
    }
    console.log("checkVerifyRestaurant", checkVerifyRestaurant);
    console.log(checkVerifyRestaurant.Title);

    const restaurants = checkVerifyRestaurant.map((verifyRestaurant) => {
      return new Restaurant({
        Title: verifyRestaurant.Title,
        Place: verifyRestaurant.Place,
        Description: verifyRestaurant.Description,
        Type: verifyRestaurant.Type,
        WorkingTime: verifyRestaurant.WorkingTime,
        Owner: verifyRestaurant.Owner,
        Image: verifyRestaurant.Image,
      });
    });

    const newRestaurants = await Restaurant.insertMany(restaurants);

    if (!newRestaurants || newRestaurants.length === 0) {
      return res.status(400).json({ message: "Failed to add restaurant(s)" });
    }
    res.status(201).send(newRestaurants);
  } catch (error) {
    console.log(error);
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

import { cloudinaryInstance } from "../config/cloudinary.js";
import Admin from "../Models/adminModel.js";
import {VerifyRestaurant} from "../Models/restorantModel.js";

const addVerifyRestaurant = async (req, res) => {
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
        const verifyRestaurant = new VerifyRestaurant({
          Title: title,
          Place: place,
          Description: description,
          Type: type,
          WorkingTime: workingtime,
          Owner: owner,
          Image: restoresult.url ,
        });

        const newVerifyRestaurant = await verifyRestaurant.save();
        if (!newVerifyRestaurant) {
          return res.status(400).json({ message: "Failed to add restaurant" });
        }
        res.status(201).send(newVerifyRestaurant);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(" Error", error);
  }
};
// all restsurent

const getAllVerifyRestaurants = async (req, res) => {
  console.log("try to get verify res")
  try {
    const verifyRestaurants = await VerifyRestaurant.find();
    res.send(verifyRestaurants);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error", error);
  }
};

// delele

const deleteVerifyRestaurant = async (req, res) => {
  try {
    const verifyRestaurant = await VerifyRestaurant.findByIdAndDelete(
      req.params.id
    );
    if (!verifyRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error", error);
  }
};

export { addVerifyRestaurant, deleteVerifyRestaurant,getAllVerifyRestaurants };

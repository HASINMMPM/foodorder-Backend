import mongoose from "mongoose";

const restorantschema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  Place: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: false,
    // minlength: 10,
  },
  Type: {
    type: String,
    required: false,
    enum: ["All", "Meat", "Veg","Cake"],
    default: "All",
  },
  WorkingTime: {
    type: String,
    required: false,
    default: "6-22",
  },
  Owner: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      require: true,
    },
  ],
  Image: {
    type: String,
    required: true,
  },
  BestRestaurant:{
    type: Boolean,
    default: false,
  }
});

const Restaurant = mongoose.model("Restaurant", restorantschema);
const VerifyRestaurant = mongoose.model("VerifyRestaurant", restorantschema);
export  {Restaurant,
  VerifyRestaurant,
};

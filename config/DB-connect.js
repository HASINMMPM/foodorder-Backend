import mongoose from "mongoose";

import "dotenv/config";
// const string = process.env.Db-string
// console.log(string)

const connect = async () => {
  try {
    await mongoose.connect(process.env.Db_string);
    console.log("mongodb connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connect;
const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("connected successfully");
  } catch (error) {
    console.log(error);
  }
};
module.exports= dbconnection;
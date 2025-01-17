import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    console.log(process.env.MONGO_URI_PRODUCTION);
    await mongoose.connect(process.env.MONGO_URI_PRODUCTION);
    console.log("Connected To MongoDB Successfully");
  } catch (error) {
    console.log(process.env.MONGO_URI_PRODUCTION);
    console.log(error.message);
  }
};

export default connectToMongo;

const mongoose = require('mongoose');

const connectDB = (url) => {
  try {
      mongoose.set("strictQuery", false);
      mongoose.connect(url, () => {
      console.log("MongoDB connected");
    });

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

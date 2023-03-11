require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const app = express()
const PORT = process.env.PORT || 5000;


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(() => {
      console.log(`Server listening on the Port ${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start()
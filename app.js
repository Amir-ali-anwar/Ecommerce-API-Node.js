// importing Packages
require('dotenv').config();
const express = require('express');
const morgan=require('morgan')
require('express-async-errors')
const connectDB = require('./db/connect');
// importing middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHanlderMiddleware = require("./middleware/error-handler");
// importing Routes
const authRoutes= require('./routes/authRoutes')
// Packages
const app = express()
app.use(morgan('tiny'));
// Middlewares
app.use(express.json())

app.use('/api/v1/auth',authRoutes)

// Error handler middlewares
app.use(notFoundMiddleware)
app.use(errorHanlderMiddleware)

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log(`server listening on the port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start()
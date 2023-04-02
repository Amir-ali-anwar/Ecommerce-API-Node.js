// importing Packages
require('dotenv').config();
const express = require('express');
const morgan=require('morgan')
require('express-async-errors')
const connectDB = require('./db/connect');
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
// importing middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHanlderMiddleware = require("./middleware/error-handler");
// importing Routes
const authRoutes= require('./routes/authRoutes');
const userRoutes= require('./routes/userRoutes')
const productRoutes= require('./routes/productRoutes')
const reviewRoutes= require('./routes/reviewRoutes')
const orderRoutes= require('./routes/orderRoutes')
// Packages
const app = express()
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public'));
app.use(fileUpload());
// Middlewares
app.use(express.json())

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/products',productRoutes)
app.use('/api/v1/reviews',reviewRoutes)
app.use('/api/v1/orders',orderRoutes)

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
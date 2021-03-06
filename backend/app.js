const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

//Allowing HTTP to connect between Frontend and Backend
app.use(cors());
app.options("*", cors());

//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const favProductRoutes = require("./routes/favoriteProducts");


const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/favoriteProducts`, favProductRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "fluffyShop-database",
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});

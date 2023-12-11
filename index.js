var express = require("express");
var app = express();
var mongoose = require("mongoose");
var cors = require("cors");
var packageRoutes = require(`./routes/packages`);
var packageOrderRoutes = require(`./routes/packagesOrders`);
var favoriteRoutes = require(`./routes/favorites`); // error
var productsRoutes = require(`./routes/product`);
var searchHistoryRoutes = require("./routes/searchHistory");
var subCategoryRoute= require(`./routes/subCategoriesRoute`) // Done
const userRoute = require("./routes/userRoute"); //Done
const adminRoute = require("./routes/admins");
// const color = require("./routes/color");
const categoryRoute = require("./routes/categories");
var locationRoute= require(`./routes/locationRoute`) // Done
var chatRoute= require(`./routes/chatRoute`) // Done
var paymentRoute= require(`./routes/stripe`) // Done
var color= require(`./routes/color`) // Done
var paypalPayment=require(`./payPalPayment/paypalRoute`)
// upload photo
const path = require("path");

app.use(express.static(path.join(__dirname,`./public`)))
//middle
app.use(express.json());

// handle cors  // any domain
app.use(cors());

//  handle path
app.use(`/favorites`, favoriteRoutes);
app.use(`/packages`, packageRoutes);
app.use(`/packageOrders`, packageOrderRoutes);
app.use(`/products`, productsRoutes);
app.use(`/searchHistory`, searchHistoryRoutes);
app.use("/subcategories", subCategoryRoute);
app.use("/users", userRoute);
app.use("/color", color);
app.use("/admins", adminRoute);
app.use("/categories", categoryRoute);
app.use("/location", locationRoute);
app.use("/paypalPayment", paypalPayment);
app.use("/payments", paymentRoute);
app.use("/chats", chatRoute);

// // chat socket server
// const { Server } = require('socket.io');
// const { createServer } = require('node:http');
// const server = createServer(app);
// const io = new Server(server);

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// error handle API not found
// app.use("*", function (req, res, next) {
//   res.status(404).json({ message: " API Not Found please, try again" });
// });

//error not handle
// app.use(function (err, req, res, next) {
//   res.status(500).json({ message: `Error :( ! ${err.message}` });
// });

//error haddling Middleware
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
app.use(notFound);
app.use(errorHandler);

// connect to database
mongoose
  .connect(
    "mongodb+srv://olxdb:olxdb123456@cluster0.eyi12hi.mongodb.net/Dubizzle"
  )
  .then(function () {
    console.log("Dubizzle db is connect");
  })
  .catch(function (err) {
    console.log(err);
  });

  var paypal = require('paypal-rest-sdk')

  paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfvOianSVpSITi9x1WjepZ0exjMdECZf6nfDbfZdmdA2YDqcCuMgYqIrTJuZkclPSXrRKFTUelfJdqt8',
    'client_secret': 'EGotQCXmeH4QlOeOUcb4inYoCVSRKriuNDkkdA6i1GGfui1VU3Zt2i0n5XYMeroQmCe7D_8LsPSM4xFZ'
  });


var port = 5555;
app.listen(port, () => {
  console.log(`Server listening on port (${port})`);
});
const express = require('express')
bodyParser = require("body-parser")
require("dotenv").config();


const PORT = process.env.PORT || 5000;
const app = express();
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));

// database connection
const dbURI = process.env.MONGO_URI;  //.env file
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));


app.use("/api/user",require("./routes/userRoutes"))  //signup, login , getuserinfo
app.use("/api/transactions", require("./routes/transactionRoutes"));

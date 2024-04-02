const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
app.use(cors());
app.use(express.urlencoded());
app.use(bodyParser.json());

const productRoutes = require("./routes/product");
app.use("/api", productRoutes);

mongoose.connect(
  "mongodb://localhost:27017/CABI",
  // "mongodb+srv://kunj:ipolS8OYfv6asxr7@cluster0.id7x3zq.mongodb.net/"
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected ");
  }
);

app.listen(8000, () => console.log("Hello world app listening on port  !"));

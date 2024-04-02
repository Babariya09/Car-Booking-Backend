const mongoose = require("mongoose");

const Carbook = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  car: String,
  drive: String,
  state: String,
  pickup: String,
  drop: String,
  date: String,
  drivername: String,
  driverphone: String
});

module.exports = mongoose.model("CarBooking Data", Carbook);

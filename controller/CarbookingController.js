const { response } = require("express");
const Product = require("../model/RegsiterData");
const Carbooking = require("../model/Carbooking");
const mongodb = require("mongodb");
var nodemailr = require("nodemailer");

const mail_sender = async (req, res) => {
  const { name, phone, email, car, drive, state, pickup, drop, date } = req.body;
  var transporter = nodemailr.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const html =
    `<p>Dear ${req.body.name},</p>
  <p>We hope this email finds you well. We would like to thank you for choosing our car rental services for your upcoming trip. As part of our standard operating procedure, we require all customers to submit their valid identification documents and driving license for verification before finalizing the rental reservation.</p>
  <p>To ensure a smooth and hassle-free car rental experience, we kindly request you to please provide us with the following documents for verification purposes:</p>
  <p>1.	Valid government-issued ID (e.g., passport, national ID card)</p>
  <p>2.	Driver's license (valid and in good standing)</p>
  <p>Please send us the scanned or photo copies of your documents via email at speedocarrental85@gmail.com. We assure you that all information provided will be kept strictly confidential and will only be used for verification purposes.</p>
  <p>Once we have verified your documents, we will confirm your reservation of ${req.body.car}Booked on ${req.body.date} at ${req.body.pickup} to ${req.body.drop} and for additional information we will contact  on ${req.body.phone}.We advise you to carefully review the agreement and let us know if you have any questions or concerns.</p>
  <p>Thank you for your cooperation and understanding. We look forward to serving you and providing you with a safe and comfortable car rental experience.</p>
  <p>Best regards,</p>
  <p>Speedo Car Rental </p>`

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Request for Document Verification for Car Rental Reservation - Speedo car rental",
    html: html
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent:" + info.response);
    }
  });
  {
    const user = new Carbooking({
      name,
      phone,
      email,
      car,
      state,
      drive,
      pickup,
      drop,
      date,
    });
    user.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "succes" });
      }
    });
  }
  console.log(req.body);
};

const mail_get = async (req, res) => {
  mail_sender()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
};

const Gmail_data = async (req, res) => {
  Carbooking.find({}, function (err, Product) {
    if (err) {
      res.send({ message: "dont get data" });
    } else {
      res.send(Product);
    }
  });
};

const Gmail_updateid = async (req, res) => {
  const data = await Carbooking.findOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.send(data);
};

const Gmail_del = async (req, res) => {
  const data = await Carbooking.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.send(data);
};

const Gmail_update = async (req, res, next) => {
  const { name, phone, email, car, drive, state, pickup, drop, date } = req.body;
  var transporter = nodemailr.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,

    },
  });
  const html =
    `<p>Dear ${req.body.name},</p>
  <p>We hope this email finds you well. We would like to thank you for choosing our car rental services for your upcoming trip. As part of our standard operating procedure, we require all customers to submit their valid identification documents and driving license for verification before finalizing the rental reservation.</p>
  <p>To ensure a smooth and hassle-free car rental experience, we kindly request you to please provide us with the following documents for verification purposes:</p>
  <p>1.	Valid government-issued ID (e.g., passport, national ID card)</p>
  <p>2.	Driver's license (valid and in good standing)</p>
  <p>Please send us the scanned or photo copies of your documents via email at speedocarrental85@gmail.com. We assure you that all information provided will be kept strictly confidential and will only be used for verification purposes.</p>
  <p>Once we have verified your documents, we will confirm your reservation of ${req.body.car}Booked on ${req.body.date} at ${req.body.pickup} to ${req.body.drop} and for additional information we will contact  on ${req.body.phone}.We advise you to carefully review the agreement and let us know if you have any questions or concerns.</p>
  <p>Thank you for your cooperation and understanding. We look forward to serving you and providing you with a safe and comfortable car rental experience.</p>
  <p>Best regards,</p>
  <p>Speedo Car Rental </p>`

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Request for Document Verification for Car Rental Reservation - Speedo car rental",
    html: html
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent:" + info.response);
    }
  });


  Carbooking.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        car: req.body.car,
        state: req.body.state,
        drive: req.body.drive,
        pickup: req.body.pickup,
        drop: req.body.drop,
        date: req.body.date,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        User: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

const driver_sender = async (req, res) => {
  const { email, drivername, driverphone } = req.body;
  var transporter = nodemailr.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,

    },
  });
  const html =
    `<p>Dear ${req.body.name},</p>
  <p>We're excited to provide you with a safe and comfortable journey with a driver. Your assigned driver is ${req.body.drivername}, and you can contact him at  ${req.body.driverphone}.</p>
  <p>We've taken all necessary measures to ensure your safety and security during the journey. Our drivers undergo background checks, wear masks at all times, and receive regular safety training.</p>
 <p>If you have any questions or concerns, please let us know.</p>
 <p>Thank you for choosing our car rental service.</p>
  <p>Best regards,</p>
  <p>Speedo Car Rental </p>`

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Driver Information- Speedo car rental",
    html: html
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent:" + info.response);
    }
  });

};








module.exports = {
  mail_sender,
  mail_get,
  Gmail_data,
  Gmail_updateid,
  Gmail_del,
  Gmail_update,
  driver_sender
};

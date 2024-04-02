const { response } = require("express");
const Registerdata = require("../model/RegsiterData");
const Gmaildata = require("../model/Carbooking");
const crypto = require('crypto');
var nodemailr = require("nodemailer");

const product_register = async (req, res) => {
  const { name, email, password, Phone } = req.body;
  var transporter = nodemailr.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const html = `
<p>Registration Successful</p>
<p>Dear ${req.body.name},</p>
<p>Your registration with our car rental website is complete! You now have access to a variety of vehicles at affordable rates. Simply log in to your account and start browsing.</p>
<p>Our website is easy to navigate, but our customer support team is available 24/7 if you need assistance. Thank you for choosing us for your transportation needs.</p>
<p>Best regards,</p>
<p>Speedo Car Rental </p>`

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: " Register Information- Sppedo car rental",
    html: html
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent:" + info.response);
    }
  });

  Registerdata.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "alerdy" });
    } else {
      const user = new Registerdata({
        name,
        Phone,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "succes" });
        }
      });
    }
  });
};

const product_forget = async (req, res) => {
  const { password, email } = req.body;
  Registerdata.findOne({ email: email }, (err, Registerdata) => {
    Registerdata.updateOne({
      $set: {
        password: req.body.password,
      },
    })
      .then((result) => {
        res.status(200).json({
          Registerdata: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
};

const sendOTP = async (req, res) => {
  const { email, otp } = req.body;
  const transporter = nodemailr.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Forget Password OTP - Speedo car rental",
    html: `
        <p>Your OTP For Forget Password:</p>
        <h3>${req.body.otp}</h3>
      `
  };
  const info = await transporter.sendMail(mailOptions);
}

const product_userdata = async (req, res) => {
  Registerdata.find({}, function (err, Registerdata) {
    if (err) {
      res.send({ message: "dont get data" });
    } else {
      res.send(Registerdata);
    }
  });
};

module.exports = {
  product_register,
  product_userdata,
  product_forget,
  sendOTP
};

const { response } = require("express");
const Feedback = require("../model/Feedback");
var nodemailr = require("nodemailer");

const Feedback_sender = async (req, res) => {
  const { name, email, message } = req.body;
  var transporter = nodemailr.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const html = `
  <p>Dear ${req.body.name}</p>
  <p>Thank you for taking the time to provide feedback on speedo car rental Services. Your insight and suggestions were extremely helpful and we greatly appreciate your contribution. We value all feedback and are committed to using it to improve our offerings.</p>
  <p>Best Regards,</p>
  <p>Speedo Car Rental</p> `

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: " Thank You for Your Feedback -Speedo car rental",
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
    const user = new Feedback({
      name,
      email,
      message,
    });
    user.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "succes" });
      }
    });
  }
};

const feedback_data = async (req, res) => {
  Feedback.find({}, function (err, Product) {
    if (err) {
      res.send({ message: "dont get data" });
    } else {
      res.send(Product);
    }
  });
};
module.exports = {
  Feedback_sender,
  feedback_data,
};

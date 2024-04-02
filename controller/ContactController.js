const { response } = require("express");
const Contact = require("../model/Contact");
const mongodb = require("mongodb");

const comment_data = async (req, res) => {
  const { name, email, message, phone } = req.body;
  Contact.findOne({ phone }, (err, user) => {
    {
      const user = new Contact({
        name,
        phone,
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
  });
};

const contact_del = async (req, res) => {
  const data = await Contact.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.send(data);
};

const comment_value = async (req, res) => {
  Contact.find({}, function (err, Product) {
    if (err) {
      res.send({ message: "dont get data" });
    } else {
      res.send(Product);
    }
  });
};

module.exports = {
  comment_data,
  comment_value,
  contact_del
};

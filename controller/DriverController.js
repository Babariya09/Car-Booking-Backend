const { response } = require("express");
const Driver = require("../model/Driver");
var nodemailr = require("nodemailer");
const mongodb = require("mongodb");


const driver_data = async (req, res) => {
    const { driver, phone, email, licence, alternativephone, state } = req.body;
    Driver.findOne({}, (err, user) => {
        {
            const user = new Driver({

                driver,
                phone,
                email,
                licence,
                state,
                alternativephone
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

const driver_value = async (req, res) => {
    Driver.find({}, function (err, Product) {
        if (err) {
            res.send({ message: "dont get data" });
        } else {
            res.send(Product);
        }
    });
};

const driver_del = async (req, res) => {
    const data = await Driver.deleteOne({
        _id: new mongodb.ObjectId(req.params.id),
    });
    res.send(data);
};

module.exports = {
    driver_data,
    driver_value,
    driver_del
};

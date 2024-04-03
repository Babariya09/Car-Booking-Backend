const { response } = require("express");
const Driver = require("../model/Driver");
var nodemailr = require("nodemailer");
const mongodb = require("mongodb");


const driver_data = async (req, res) => {
    const { name, phoneNumber, email, licenseNumber, state } = req.body;

    // Check if any required field is missing
    if (!name || !phoneNumber || !email || !licenseNumber || !state) {
        res.status(400).send({ message: "Missing required fields" });
        return;
    }

    // Check if driver with the given email already exists
    Driver.findOne({ email: email }).select('_id __v').exec((err, driver) => {
        if (err) {
            console.error("Error finding driver:", err);
            res.status(500).send({ message: "Internal Server Error" });
            return;
        }

        if (driver) {
            // Driver with the provided email already exists
            res.status(400).send({ message: "Email already exists" });
            return;
        }

        // If the driver with the given email doesn't exist and all required fields are present, proceed to save the new driver
        const user = new Driver({
            name,
            phoneNumber,
            email,
            licenseNumber,
            state,
        });

        user.save((err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({ message: "Success" });
            }
        });
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

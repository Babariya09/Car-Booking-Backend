const { response } = require("express");
const State = require("../model/State");
var nodemailr = require("nodemailer");
const mongodb = require("mongodb");


const state_data = async (req, res) => {
    const { state } = req.body;
    State.findOne({}, (err, user) => {
        {
            const user = new State({
                state
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



const state_value = async (req, res) => {
    State.find({}, function (err, Product) {
        if (err) {
            res.send({ message: "dont get data" });
        } else {
            res.send(Product);
        }
    });
};

const state_de = async (req, res) => {
    const data = await State.deleteOne({
        _id: new mongodb.ObjectId(req.params.id),
    });
    res.send(data);
};

module.exports = {
    state_data,
    state_value,
    state_de
};

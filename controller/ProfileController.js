const { response } = require("express");
const Profile = require("../model/Profile");
const mongodb = require("mongodb");

const Profile_data = async (req, res) => {
    const { name, email, phone, gender, dob, Address, } = req.body;
    Profile.findOne({ phone }, (err, user) => {
        {
            const user = new Profile({
                name,
                phone,
                email,
                gender,
                dob,
                Address,
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


const Profile_updateid = async (req, res) => {
    const data = await Profile.findOne({
        _id: new mongodb.ObjectId(req.params.id),
    });
    res.send(data);
};

const Profile_alldata = async (req, res) => {
    Profile.find({}, function (err, Product) {
        if (err) {
            res.send({ message: "dont get data" });
        } else {
            res.send(Product);
        }
    });
};

const p_Update = async (req, res, next) => {
    const { name, email, phone, gender, dob, Address, } = req.body;
    Profile.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                gender: req.body.gender,
                dob: req.body.dob,
                Address: req.body.Address,
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


module.exports = {
    Profile_data,
    p_Update,
    Profile_updateid,
    Profile_alldata
};

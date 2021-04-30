const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Utility = require('../helper/utility');
const async = require('async');



var create = async function (req, res) {
    try {
        var user = new User();
        const salt = await bcrypt.genSalt(10);
        console.log("salt", req.body)
        user.password = await bcrypt.hash(req.body.password, salt);
        user.username = req.body.username;
        user.email = req.body.email;
        user.type = req.body.type;
        User.create(user)
            .then((data) => {
                console.log("data", data);
                let resData = {
                    _id: data._id,
                }
                res.status(200).send(Utility.generateResponse(200, 'User Created Succesfullly', false, resData))

            })
            .catch((err) => {
                res.status(500).send(Utility.generateResponse(404, err, false, null))
            });

    } catch (error) {
        console.log("error", error)
    }

}










var getUserById = function (req, res) {
    console.log("inside get by id")
    const id = req.params.id;
    User.findById({ _id: id }).select("-password")
        .then((data) => {
            data ? res.status(200).send(Utility.generateResponse(200, 'Get User', false, data)) :
                res.status(404).send(Utility.generateResponse(404, `User Not found with Id ${id}`, false, null));


        })
        .catch((err) => {
            res.status(500).send(Utility.generateResponse(500, err, false, null))
        });
};

var deleteUser = function (req, res) {
    const id = req.params.id;
    User.findByIdAndRemove({ "_id": id })
        .then((data) => {
            res.status(200).send(Utility.generateResponse(200, 'Delete User Successfully', false, null))

        })
        .catch((err) => {
            res.status(500).send(Utility.generateResponse(500, err, false, null))
        });
};



var login = async function (req, res) {
    const body = req.body;
    const user = await User.findOne({ email: body.email }).populate('type', 'name');
    if (user) {
        console.log(" user", user)
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            let privateKey = "037a32ebe4604d6a992661efc84a8544";
            const options = { expiresIn: '30d', issuer: 'atkt' };
            let token = jwt.sign({ user }, privateKey, options);
            let userData = {
                "id": user._id,
                "email": user.email,
                "username": user.username,
                "userType": user.type.name,
                "token": token
            }
            res.status(200).send(Utility.generateResponse(200, 'Login Successfully', false, userData))
        } else {
            res.status(400).send(Utility.generateResponse(400, 'Invalid Credentials email/password', false, null))
        }
    } else {
        res.status(500).send(Utility.generateResponse(500, err, false, null))
    }
}


var update = async function (req, res) {
    const id = req.params.id;
    const userDetails = req.body;
    console.log("userDetails", userDetails)
    User.findOneAndUpdate({ _id: id }, { userDetails }
        , { "new": true, "upsert": true, "setDefaultsOnInsert": true })
        .then((data) => {
            console.log("data", data);
            let resData = {
                _id: data._id,
            }
            res.status(200).send(Utility.generateResponse(200, 'User Update Successfully', false, resData))

        })
        .catch((err) => {
            res.status(500).send(Utility.generateResponse(500, err, false, null))
        });


}

var userController = {
    create,
    getUserById,
    login,
    deleteUser,
    update

}

module.exports = userController;
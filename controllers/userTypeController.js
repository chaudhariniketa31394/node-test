const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const UserType = require('../models/userType.model')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Utility = require('../helper/utility')




var create = async function (req, res) {
    var usertype = new UserType();
    usertype.name = req.body.name;
    usertype.save()
        .then((data) => {
            res.status(200).send(Utility.generateResponse(200, 'Succesfully Register', false, data))

        })
        .catch((err) => {
            (message.code == 11000) ? res.status(500).send(Utility.generateResponse(404, "Role Name Should Be unique", false, null)) :
                res.status(500).send(Utility.generateResponse(404, err, false, null))
        });

}


var userTypeController = {
    create


}

module.exports = userTypeController;
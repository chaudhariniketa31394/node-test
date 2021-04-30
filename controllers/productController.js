const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Utility = require('../helper/utility')
const async = require('async');



let create = async function (req, res) {
    let product = new Product();
    product.name = req.body.name;
    const user = res.decoded.user;
    async.waterfall([
        (done) => {
            Product.create(product, (err, res) => {
                console.log("err...........", err)
                err ? done(err, null) : done(null, res)
            });
        },
        (product, done) => {
            console.log("product", product)
            User.findOneAndUpdate(
                { "_id": user._id },
                { "$addToSet": { "products": product._id } },
                { "new": true }, (err, res) => {
                    err ? done(err, null) : done(null, product)
                })
        }
    ], (err, result) => {
        err ? res.status(404).send(Utility.generateResponse(404, err, false, null)) :
            res.status(200).send(Utility.generateResponse(200, 'Product Created Succesfullly', false, result));

    })

}







var retrieve = function (req, res) {
    Product.find({ 'view': true })
        .then((data) => {
            res.status(200).send(Utility.generateResponse(200, 'ALL Products', false, data))
        })
        .catch((err) => {
            res.status(500).send(Utility.generateResponse(500, err, false, result))
        });

};




var getProductById = function (req, res) {
    console.log("inside get by id")
    const id = req.params.id;
    Product.findById({ _id: id })
        .then((data) => {
            data ? res.status(200).send(Utility.generateResponse(200, `Get Product`, false, data)) :
                res.status(404).send(Utility.generateResponse(200, `Not found user with id ${id}`, false, data))

        })
        .catch((err) => {
            res.status(500).send(Utility.generateResponse(500, err, false, result))
        });
};

var deleteProduct = function (req, res) {
    const user = res.decoded.user;
    const productId = req.params.id;
    async.waterfall([
        (done) => {
            Product.findOneAndDelete({ "_id": productId }, (err, res) => {
                err ? done(err, null) : done(null, res)
            })
        },
        (product, done) => {
            console.log("err...............", product)
            User.findOneAndUpdate(
                { "_id": user._id },
                {
                    "$pull": {
                        "products": product._id
                    }
                },
                { "new": true }, (err, res) => {
                    err ? done(err, null) : done(null, product)
                })
        }
    ], (err, result) => {
        err ? res.status(500).send(Utility.generateResponse(500, err, false, result)) :
            res.status(200).send(Utility.generateResponse(200, `Delete Product Sucessfully`, false, null))
    })
};






var update = async function (req, res) {
    const { id } = req.params;
    const productDetails = req.body;
    Product.findOneAndUpdate({ '_id': id }, { productDetails }
        , { "new": true })
        .then((data) => {
            console.log("data", data);
            let resData = {
                _id: data,
            }
            res.status(200).send(Utility.generateResponse(200, 'Product Update Succesfullly', false, resData))

        })
        .catch((err) => {
            res.status(500).send(Utility.generateResponse(500, err, false, null))
        });


}

var productController = {
    create,
    retrieve,
    getProductById,
    deleteProduct,
    update

}

module.exports = productController;
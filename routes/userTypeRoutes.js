const express = require('express');
const router = express.Router();
const auth = require("../helper/middleware")
const userTypeController = require("../controllers/userTypeController")



router.post("/create", userTypeController.create)

module.exports = router;

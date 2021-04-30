const express = require('express');
const router = express.Router();
const middleware = require("../helper/middleware");
const roleCheck = require("../helper/roleCheck")
const userController = require("../controllers/userController")



router.post("/sign-up", middleware(), roleCheck('Admin'), userController.create);
router.post("/login", userController.login);

router.get("/user-by-id/:id", userController.getUserById);
router.delete("/user-delete/:id", middleware(), roleCheck('Admin'), userController.deleteUser);
router.put("/user-update/:id", middleware(), roleCheck('Admin'), userController.update);
module.exports = router;

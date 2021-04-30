const express = require('express');
const router = express.Router();
const middleware = require("../helper/middleware");
const roleCheck = require("../helper/roleCheck");
const productController = require("../controllers/productController")



router.post("/create-product", middleware(), productController.create);
router.put("/update-product/:id", middleware(), roleCheck('Admin'), productController.update);
router.delete("/delete-product/:id", middleware(), roleCheck('Admin'), productController.deleteProduct);
router.get("/all-product", productController.retrieve);
router.get("/product-by-id/:id", productController.getProductById);
module.exports = router;

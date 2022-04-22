const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const { findById } = require('../models/order');

const  Order = require('../models/order');

const  Product = require('../models/products');

const Authcheck = require('../middleware/check-Auth');

const ordercontroller = require("../controllers/orderController");

router.get('/', Authcheck, ordercontroller.get_All_Orders);

router.post('/', Authcheck, ordercontroller.post_Orders); 

router.get('/:orderID', Authcheck, ordercontroller.get_Order_By_Id); 

router.delete('/:orderID', Authcheck, ordercontroller.delete_Orders);
module.exports = router;
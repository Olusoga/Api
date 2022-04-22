const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Authcheck = require('../middleware/check-Auth');




const Product = require('../models/products');
 
const productcontroller = require("../controllers/productController")
const multer = require('multer');
const storage =multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')

    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, "") + file.originalname);
    }
});
const fileFilter = function(req, file, cb){
    //reject file.

    if(file.mimetype==="image/jpeg" || File.mimetype==="image.png"){
        cb(null, true);
    }else{
        cb(null, false);
    }
}


const upload = multer({storage : storage,
                        limits: {fileSize: 1024 * 1024 * 5}
 
});



router.get('/', productcontroller.get_all_products);
router.post('/', Authcheck,   upload.single('productImage'),    productcontroller.post_products);

router.get('/:productId',  productcontroller.getProductBy_Id);


router.patch('/:productId', Authcheck, productcontroller.patch_Products);


    

router.delete('/:productId', Authcheck, productcontroller.delete_Products)


module.exports = router ;
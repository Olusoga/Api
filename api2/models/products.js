const mongoose = require('mongoose');

const Product = mongoose.model('Product', new mongoose.Schema({
    _id : { type: mongoose.Schema.Types.ObjectId , required: true},
    name:String,
    price:{type:Number, required : true},
    productImage: {type:String, required: true}
}));
module.exports = Product;
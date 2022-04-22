const mongoose = require('mongoose');
const { findById } = require('../models/order');
const  Order = require('../models/order');
const  Product = require('../models/products');
const Authcheck = require('../middleware/check-Auth');


exports.get_All_Orders = (req, res, next) => {
    Order
    
    .find()
    .select("product quantity _id")
   .populate('product', 'name price')
    .exec()
    .then(docs=> {
        
        res.status(200).json({
            count: docs.length,
            order:docs.map(doc=> {
                return {
                    _id: doc._id,
                    product:doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: "GET", 
                        URL: "http://localhost:3001/orders/"+doc._id
                    }
                }
            })
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });

    };

    exports.post_Orders = (req, res, next)=>{
        console.log({req});
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            product:req.body.productId,
            quantity: req.body.quantity
        
        });
        return order
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
      
    };

    exports.get_Order_By_Id = (req, res, next)=>{
        Order.findById(req.params.orderID)
        .select("product quantity _id")
        .populate('product')
        
        .exec()
        .then(order => {
            if(!order) { 
            return res.status(404).json({message:"order not found"});
                
            }
            res.status(200).json({
                    order:order
                 });
                 
                
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
      });
    };

    exports.delete_Orders = (req, res, next)=>{
        res.status(201).json({
            message:'orderid is deleted',
            orderID:req.params.orderID
            });
    
    };
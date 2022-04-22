const mongoose = require('mongoose');

const Authcheck = require('../middleware/check-Auth');

const Product = require('../models/products');









exports.get_all_products =  (req, res, next)=>{   
    Product.find()
    .select("price name _id productImage")
    .exec()
    .then(docs =>{

        const response = {
            count : docs.length,
            product:docs.map(doc => {
                return {
                   name:doc.name,
                   price:doc.price,
                   _id: doc._id,
                   productImage:doc.productImage,
                   request:{
                       type: "GET",
                       url:"http://localhost:3001/product/" + doc._id
                   } 
                }
            })
        }
        res.status(200).json(response);
       
    })
    
    .catch(err=>{
        console.log(err)
        res.status(500).json({error: err})
    })
    
};

exports.post_products = (req, res, next)=>{

    console.log(req.file)
     const product = new Product({
         _id : new mongoose.Types.ObjectId(),
         name:req.body.name,
         price: req.body.price,
         productImage: req.file.path
     });
     product
     
     .save()
     .then(result => {
         console.log(result);
         res.status(201).json({
             message: "newly updated id",
         createdProduct:{
             name: result.name,
             price:result.price,
             _id: result._id,
             
             request:{
                 type: "GET",
                 url : "http://localhost3001/product/" + result._id
             }
         }
     })
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             error:err
         })
      });
    
     };
 

     exports.getProductBy_Id = (req, res, next) => {
        const id = req.params.productId;
        Product.findById(id)
        .select("name price _id productImage")
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc){
            res.status(200).json({
                product: doc,
                request: {
                    type:'GET',
                    url: "http://localhost:3001/product"
                }
            });
            }else{
                res.status(404).json({message: "No valid entry found for the provided ID"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
    };

    exports.patch_Products = (req, res, next)=>{
        const id = req.params.productId
        const updateOps = {}
       for(const ops of req.body) {
            updateOps[ops.propName] = ops.value; 
           }
            Product.update({_id:id}, {$set: updateOps})
            .exec()
            .then(result =>{
                res.status(200).json({
                    message: "product updated",
                    request: {
                        type: "GET",
                        url:'http://localhost:3001/product/'+id
                    }
                });
                
            })
            .catch(err =>{
                console.log(err)
                res.status(500).json({error:err})
            });
        };

        exports.delete_Products = (req, res, next)=>{
            const id = req.params.productId;
            Product.remove({_id : id})
            .exec()
            .then(result => {
                res.status(200).json(
                    {
                        message: "Product deleted",
                        request: {
                            type: "POST",
                            url :"http://localhost:3001/product",
                            body : {name : "String", price : "Number"}
                        }
                    }
                )
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                });
            });
            
        };
        
const User = require('../models/user');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
exports.post_UserSignup = async(req, res, next) => {
    User.find({email: req.body.email})
      
      .exec()
      .then(user => {
          console.log(user);
          if (user.length>=1) { return res.status(409).json({
              message:"mail already exist"
          })
          
      }else {
  
          bcrypt.hash(req.body.password, 10, (err, hash)=>{
              if(err){
                  console.log(err)
                  res.status(500).json({
                      err:error
                  });
      
               }   else{
                      const user = new User({
                          _id: new mongoose.Types.ObjectId(),
                          email:req.body.email,
                          password:hash
                      });
                      user
                      .save()
                      .then(result=> {
                          console.log(result);
                          res.status(201).json({
                              message: "user created"
                          });
                      })
                          .catch(err=>{
                              console.log(err);
                              res.status(500).json({
                                  error:err
                              })
                          })
                  }
              });
          
  
      }
      })
      
          
  };
exports.post_UserLogin = (req, res)=> {
    User.find({email:req.body.email})
    .exec()
    .then(user=> {
        if(user.length<1){
           return res.status(401).json({
               message: "Auth failed"
           });
        }else{
            bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
                if(err) {
                    
                    return res.status(401).json({
                        message : 'Auth failed'
                    });
                }
                if(result){
                    const token = jwt.sign(
                        {
                            email:user[0].email,
                            userId:user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }
                    )
                    return res.status(200).json({
                        message: 'auth success',
                        token:token
                    })
                }
                res.status(401).json({
                    message: "auth failed"

                });
            });
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
};


const router = require('express').Router();
//const Joi = require('@hapi/joi');
const User = require('../models/user');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

//const jwt = require('jsonwebtoken');

const usercontroller = require('../controllers/userController');
router.post('/signup', usercontroller.post_UserSignup);

router.post('/login', usercontroller.post_UserLogin); 

module.exports = router;
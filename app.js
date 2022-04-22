const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


const productRoute = require('./api2/routes/product');
const ordersRoute = require('./api2/routes/orders');

const usersRoute = require('./api2/routes/users');
mongoose.connect(process.env.DB_CONNECT);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        "Origin, X-Requested-widgth, Authorization, content-type, Accept"
        );
        if(req.method==='OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE')
            return res.status(200).json({});
        }
        next();
});

// route which should handle request
app.use("/product", productRoute);
app.use("/orders", ordersRoute);

app.use("/users", usersRoute);
app.use(express.static('upoads'));


//error handling

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);

})
app.use((error, req, res, next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;
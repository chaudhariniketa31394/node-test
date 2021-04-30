require('./models/db');

const express = require('express');
const bodyparser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const userTypeRoutes = require('./routes/userTypeRoutes');
const mongoose = require('mongoose');
var app = express();
app.use(express.json({ limit: '50mb', extended: true }));




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/userType', userTypeRoutes);

app.listen(8000, () => {
    console.log('Express server started at port : 8000');
});


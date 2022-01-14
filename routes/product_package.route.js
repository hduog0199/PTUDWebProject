const express = require('express');
const route = express.Router();
const product_packageModel = require('../models/product_package.model');

route.get('/product_package/', async function(req, res) {
    var index = 1;
    const product_packageList = await product_packageModel.all();
    // for (var sp of spList) {
    //     sp.number = index++;
    // }
    res.render('./vwProduct_Package/list', {
        product_packageList
    });
})


module.exports = route;
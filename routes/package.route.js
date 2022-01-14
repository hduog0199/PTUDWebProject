const express = require('express');
const route = express.Router();
const packageModel = require('../models/package.model');

route.get('/package/', async function(req, res) {
    var index = 1;
    const packageList = await packageModel.all();
    // for (var sp of spList) {
    //     sp.number = index++;
    // }
    res.render('./vwPackage/list', {
        packageList
    });
})


module.exports = route;
const express = require('express');
const route = express.Router();
const districtModel = require('../models/district.model.js');

route.get('/district/', async function(req, res) {
    var index = 1;
    const districtList = await districtModel.all();
    for (var district of districtList) {
        district.number = index++;
    }
    res.render('./vwDistrict/list', {
        districtList
    });
})
module.exports = route;
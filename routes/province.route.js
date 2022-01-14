const express = require('express');
const route = express.Router();
const proModel = require('../models/province.model');

route.get('/pro/', async function(req, res) {
    var index = 1;
    const proList = await proModel.all();
    for (var province of proList) {
        province.number = index++;
    }
    res.render('./vwProvince/list', {
        proList
    });
})


module.exports = route;
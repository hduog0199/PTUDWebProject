const express = require('express');
const route = express.Router();
const wardModel = require('../models/ward.model');

route.get('/ward/', async function(req, res) {
    var index = 1;
    const wardList = await wardModel.all();
    for (var ward of wardList) {
        ward.number = index++;
    }
    res.render('./vwWard/list', {
        wardList
    });
})


module.exports = route;
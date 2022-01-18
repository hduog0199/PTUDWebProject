const express = require('express');
const route = express.Router();
const spModel = require('../models/sp.model');

route.get('/sp', async function(req, res) {
    var index = 1;
    const spList = await spModel.all();
    // for (var sp of spList) {
    //     sp.number = index++;
    // }
    res.render('./vwSP/list', {
        spList
    });
})


module.exports = route;
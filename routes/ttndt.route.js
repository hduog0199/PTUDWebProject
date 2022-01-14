const express = require('express');
const route = express.Router();
const ttndtModel = require('../models/ttndt.model');

route.get('/ttndt/', async function(req, res) {
    var index = 1;
    const ttndtList = await ttndtModel.all();
    // for(var user of userList)
    // {
    //     user.number=index++;
    // }
    res.render('./vwTrangThaiNoiDieuTri/list', {
        ttndtList
    });
})


module.exports = route;
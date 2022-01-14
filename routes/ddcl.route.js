const express = require('express');
const route = express.Router();
const ddcl = require('../models/ddcl.model.js');

route.get('/ddcl/', async function(req, res) {
    var index = 1;
    const listDiaDiemCachLy = await ddcl.all();
    for (var item of listDiaDiemCachLy) {
        item.number = index++;
    }
    res.render('./vwDiaDiemCachLy/list', {
        listDiaDiemCachLy
    });
})


module.exports = route;
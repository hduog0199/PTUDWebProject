const express = require('express');
const route = express.Router();
const ddcl = require('../models/ddcl.model.js');
const auth=require('../middlewares/auth.mdw');
//
route.get('/ddcl',auth.restrict, async function(req, res) {
    var index = 1;
    const listDiaDiemCachLy = await ddcl.all();
    for (var item of listDiaDiemCachLy) {
        item.number = index++;
    }
    res.render('./vwDiaDiemCachLy/list', {
        listDiaDiemCachLy
    });
})
//
route.get('/ddcl/add',auth.restrict, async function(req, res) {
    
    res.send("them moi")
})
//
module.exports = route;
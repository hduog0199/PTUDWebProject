const express = require('express');
const route = express.Router();
const lsmh = require('../models/lsmh.model.js');

route.get('/lsmh/', async function (req, res) {
    const listLichSuMuaHang = await lsmh.all();
    res.render('./vwLichSuMuaHang/list', {
        listLichSuMuaHang
    });
})


module.exports = route;
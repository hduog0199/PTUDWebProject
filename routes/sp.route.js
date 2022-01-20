const express = require('express');
const route = express.Router();
const spModel = require('../models/sp.model');

route.get('/sp', async function(req, res) {

    const spList = await spModel.all();

    res.render('./vwSP/list_user', {
        spList
    });
})


module.exports = route;
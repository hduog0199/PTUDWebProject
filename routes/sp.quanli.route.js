const express=require('express');
const route=express.Router();
const sp=require('../models/sp.model.js');
// auth=require('../middlewares/auth.mdw');

route.get('/sp', async function(req, res) {
    var index = 1;
    const spList = await sp.all();
    for (var item of spList) {
        item.number = index++;
    }
    res.render('./vwSP/list_admin_quanli', {
        spList
    });
});

module.exports= route;


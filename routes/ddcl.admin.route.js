const express = require('express');
const route = express.Router();
const ddcl = require('../models/ddcl.model.js');
const auth=require('../middlewares/auth.mdw');
//
route.get('/ddcl', async function(req, res) {
    var index = 1;
    const listDiaDiemCachLy = await ddcl.all();
    for (var item of listDiaDiemCachLy) {
        item.number = index++;
    }
    res.render('./vwDiaDiemCachLy/list', {
        listDiaDiemCachLy
    });
});
//
route.get('/ddcl/add', async function(req, res) {
    res.render('./vwDiaDiemCachLy/add');
});
//Chua xong
route.post('/ddcl/add', async function(req, res) {
    const entity={
        Name:req.body.Name,
        SucChua:+req.body.SucChua
    }
    res.redirect('/admin/ddcl/');
});
//
route.get('/ddcl/edit',auth.restrict, async function(req, res) {
    const IDKhuCachLy=+req.query.IDKhuCachLy||-1
    const rows=await ddcl.single(IDKhuCachLy);
    let item=null;
    let isEmpty=false;
    if(rows.length==0)
        isEmpty=true;
    else
        item=rows[0];
    res.render('./vwDiaDiemCachLy/edit',{
        item:item,
        isEmpty
    });
});
//chua xong
route.post('/ddcl/edit',auth.restrict, async function(req, res) {
    console.log(req.body);
    // await ddcl.update(entity,condition);
    res.redirect('/admin/ddcl/edit');
});
//
module.exports = route;
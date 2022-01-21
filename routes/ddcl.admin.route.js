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
});
//
route.get('/ddcl/add',auth.restrict, async function(req, res) {
    res.render('./vwDiaDiemCachLy/add');
});
//Chua xong
route.post('/ddcl/add',auth.restrict, async function(req, res) {
    const entity={
        Name:req.body.Name,
        SucChua:+req.body.SucChua,
        SoLuongTiepNhan:0
    }
    console.log(entity);
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
//
route.post('/ddcl/edit',auth.restrict, async function(req, res) {
    if(req.body.SoLuongTiepNhan>req.body.SucChua)
        return res.redirect('/admin/ddcl/');
    const entity={
        IDKhuCachLy: +req.query.IDKhuCachLy||-1,
        SoLuongTiepNhan: +req.body.SoLuongTiepNhan
    }
    await ddcl.update(entity);
    res.redirect('/admin/ddcl/');
});
//
module.exports = route;
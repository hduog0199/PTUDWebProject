const express=require('express');
const route=express.Router();
const spModel=require('../models/sp.model.js');
// auth=require('../middlewares/auth.mdw');
const hb = require('handlebars');
const moment = require("moment");

hb.registerHelper('dateFormat', function (date, options) {
    const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "DD/MM/YYYY"
    return moment(date).format(formatToUse);
});


route.get('/sp', async function(req, res) {
    const spList = await spModel.all();

    res.render('./vwSP/list_admin_quanli', {
        spList
    });
});

route.get('/sp/add', async function(req, res) {
    res.render('./vwSP/add');
});
route.post('/sp/add', async function(req, res) {
    const entity={
        TenSanPham:req.body.TenSanPham,
        GiaTien:req.body.GiaTien,
        DonViDinhLuong:req.body.DonViDinhLuong
    }
    res.redirect('/quanli/sp/');
});
route.get('/sp/edit', async function(req, res) {
    const IDSanPham=+req.query.IDKhuCachLy||-1
    const rows=await spModel.single(IDSanPham);
    let info=null;
    let isEmpty=false;
    if(rows.length==0)
        isEmpty=true;
    else
        info=rows[0];
    res.render('./vwSP/edit',{
        info:info,
        isEmpty
    });
});
//chua xong
route.post('/sp/edit', async function(req, res) {
    const entity = {
        
        TenSanPham: req.body.TenSanPham,
        GiaTien: req.body.GiaTien,
        DonViDinhLuong: req.body.DonViDinhLuong,
    }
    spModel.update(entity)
    res.redirect('/quanli/sp/');
});

module.exports= route;


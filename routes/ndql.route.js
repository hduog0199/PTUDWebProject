const express=require('express');
const route=express.Router();
const ndql=require('../models/ndql.model.js');

route.get('/ndql/',async function(req,res){
    var index=1;
    const listNguoiDuocQuanLi= await ndql.all();
    for(var item of listNguoiDuocQuanLi)
    {
        item.number=index++;
    }
    res.render('./vwNguoiDuocQuanLi/list',{
        danhsachNDQL:listNguoiDuocQuanLi
    });
})


module.exports= route;
const express=require('express');
const route=express.Router();
const ndql=require('../models/ndql.model.js');

route.get('/ndql/',async function(req,res){
    const ndqlList=await ndql.all();
    res.render('./vwNguoiDuocQuanLi/list',{
            ndqlList
    });
});

route.get('/ndql/detail',async function(req,res){
    const rows= await ndql.single(req.query.cmnd);
    console.log(rows);
    let infomation=null;
    if(rows.length>0)
        infomation=rows[0];
    res.render('./vwNguoiDuocQuanLi/detail',{
        infomation
    });
});
route.get('/ndql/add/',async function(req,res){
    res.render('./vwNguoiDuocQuanLi/add',{
            
    });
});
route.post('/ndql/add/',async function(req,res){
    console.log(req.body);
    res.redirect('/admin/ndql');
});

module.exports= route;
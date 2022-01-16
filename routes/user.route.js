const express=require('express');
const route=express.Router();
const userModel=require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Quản lí tài khoản người quản lí
//1.Xem danh sách thông tin tài khoản người quản lí
//Tài khoản bị khóa => isOpen=0
//Tài khoản đang mở => isOpen=1

route.get('/users/dsql',async function(req,res){
   const rows=await userModel.getDSQL();
//    let number=1;
   for(let item of rows)
   {
       delete item.PasswordHash
    //    item.number=number++;
   }
   return res.render('./vwUser/dsql',{
        isEmpty: rows.length===0,
        dsql:rows,
   });
})
route.post('/users/dsql',async function(req,res){
    userModel.update(req.query);
    return res.redirect('/admin/users/dsql')
 })

route.get('/users/add',function(req,res){
    res.render('./vwUser/add');
})
route.post('/users/add',function(req,res){
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    const entity={
        CMND:req.body.CMND,
        PasswordHash:hash,
        isOpen:1,
        Permission:1,
        Ten: req.body.Ten
    }
    userModel.add(entity);
    return res.redirect('/admin/users/dsql')
})

module.exports= route;


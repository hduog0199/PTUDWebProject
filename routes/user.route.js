const express=require('express');
const route=express.Router();
const userModel=require('../models/user.model');

route.get('/user/',async function(req,res){
    var index=1;
    const userList= await userModel.all();
    for(var user of userList)
    {
        user.number=index++;
    }
    res.render('./vwUser/list',{
        users:userList
    });
})


module.exports= route;


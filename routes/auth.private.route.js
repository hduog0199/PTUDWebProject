const express=require('express');
const route=express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const authMDW=require('../middlewares/auth.mdw');
const userModel=require('../models/user.model');
//
route.get('/login',async function(req,res){
    res.render('login',{
        layout:false
    })
})
//
route.post('/login',async function(req,res){
    const rows= await userModel.singleByCMND(req.body.username);
    if(rows.length===0){
        return res.render('login',{
            layout:false,
            errorMessage:"Username or password is invalid"
        });
    }
    //
    const account=rows[0];
    if(account.isOpen===0)
    {
        return res.render('login',{
            layout:false,
            errorMessage:"Your account is blocked"
        });
    }
    //
    const rs= bcrypt.compareSync(req.body.password, account.PasswordHash);
    if(rs===false){
        return res.render('login',{
            layout:false,
            errorMessage:"Username or password is invalid"
        });
    }
    //
    req.session.isAuthenticated=true;
    delete account.PasswordHash;
    req.session.authUser=account;
    res.redirect('/authentication/profile');
});
//
route.get("/profile",authMDW.restrict,async function(req,res){
    res.render('./vwUser/profile');
});
//
route.post("/logout",async function(req,res){
    req.session.isAuthenticated=false;
    req.session.authUser=null;
    // res.redirect(req.headers.referer);
    res.redirect('/');
})



module.exports= route;
const express = require('express');
const route = express.Router();
const ttndtModel = require('../models/ttndt.model');

route.get('/ttndt/', async function(req, res) {
    var index = 1;
    const ttndtList = await ttndtModel.all();
    // for(var user of userList)
    // {
    //     user.number=index++;
    // }
    res.render('./vwTrangThaiNoiDieuTri/list', {
        ttndtList
    });
});

route.get('/ttndt/statistical_user',async function(req,res){
    res.render('./vwStatistical/statisticalUser')
})

route.get('/ttndt/statistical_user', async function(req, res) {
    let current = ''
    if (req.body.isCurrent == 1) {
        current='true'
    }
    if (req.body.isCurrent == 2) {
        current='false'
    }
    if (req.body.isCurrent == 0) {
        current=''
    }

    var listUser = []
    if (current == '') {
        listUser = await ttndtModel.getAllUserByStatus();
    }
    else{
        listUser = await ttndtModel.getListUserByStatusCurrent(current);
    }

    // console.log(listUser,listUser.length)
    let F0=0,F1=0,F2=0,F3=0;

    for (let i=0 ; i < listUser.length; i++){
        if ((listUser[i]).TrangThai == 'F0') {
            F0+=1;
        }
        if ((listUser[i]).TrangThai == 'F1') {
            F1+=1;
        }
        if ((listUser[i]).TrangThai == 'F2') {
            F2+=1;
        }
        if ((listUser[i]).TrangThai == 'F3') {
            F3+=1;
        }
        // console.log((listUser[i]).TrangThai)
    }

    res.render('./vwStatistical/statisticalUser', {
        listUser,
        F0,
        F1,
        F2,
        F3
    });
})
route.post('/ttndt/statistical_user', async function(req, res) {

    const current = req.body.isCurrent;
    // console.log(current)

    // let listUser = [];
    var listUser = new Array();

    switch (current) {
        case '0':{
            listUser = await ttndtModel.getAllUserByStatus();
            // console.log(listUser,listUser.length)
            break;
        }    
        case '1':{
            listUser = await ttndtModel.getListUserByStatusCurrent(true);
            // console.log(listUser,listUser.length)
            break;
        }
        case '2':{
            listUser = await ttndtModel.getListUserByStatusCurrent(false);
            // console.log(listUser,listUser.length)
            break;
        }
    }

    // console.log("console.log(listUser,listUser.length)",listUser,listUser.length)
    let F0=0,F1=0,F2=0,F3=0;

    for (let i=0 ; i < listUser.length; i++){
        if ((listUser[i]).TrangThai == 'F0') {
            F0+=1;
        }
        if ((listUser[i]).TrangThai == 'F1') {
            F1+=1;
        }
        if ((listUser[i]).TrangThai == 'F2') {
            F2+=1;
        }
        if ((listUser[i]).TrangThai == 'F3') {
            F3+=1;
        }
        // console.log((listUser[i]).TrangThai)
    }

    res.render('./vwStatistical/statisticalUser', {
        listUser,
        current,
        F0,
        F1,
        F2,
        F3
    });
})


module.exports = route;
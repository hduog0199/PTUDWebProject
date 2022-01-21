const express = require('express');
const route = express.Router();
const ndqlModel = require('../models/ndql.model.js');
const userModel = require('../models/user.model');
const ttndtModel = require('../models/ttndt.model');
const ddclModel = require('../models/ddcl.model.js');
route.get('/ndql/', async function(req, res) {
    const ndqlList = await ndqlModel.all();
    res.render('./vwNguoiDuocQuanLi/list', {
        ndqlList
    });
});

route.get('/ndql/detail', async function(req, res) {
    const rows = await ndqlModel.single(req.query.cmnd);
    const rows1 = await ttndtModel.singleByCMND(req.query.cmnd);
    let infomation = null;
    let ttndtinfo = null;
    console.log("row1: ", rows1)
    if (rows.length > 0) {
        infomation = rows[0];
    }
    if (rows1.length > 0) {
        ttndtinfo = rows1[0];
    }
    res.render('./vwNguoiDuocQuanLi/detail', {
        infomation,
        ttndtinfo
    });
});
route.get('/ndql/add/', async function(req, res) {
    res.render('./vwNguoiDuocQuanLi/add', {});
});
route.post('/ndql/add', async function(req, res) {
    const rows = await userModel.singleByCMND(req.body.CMND);
    const rows1 = await ndqlModel.singleByCMND(req.body.CMND);
    const rows2 = await ttndtModel.singleByCMND(req.body.CMND);
    // const kclList = await ddclModel.singleByID(req.body.NoiCachLy)
    console.log(rows)
    console.log(rows1)
    console.log(rows2)
        // console.log(kclList)
    if (rows.length > 0 || rows1.length > 0 || rows2.length > 0) {
        return res.render('./vwNguoiDuocQuanLi/add', {
            message: "Người liên quan đã tồn tại.Thêm vào thất bại."
        });
    }
    const entity = {
        CMND: req.body.CMND,
        Ten: req.body.Ten,
        NamSinh: req.body.NamSinh,
        DiaChi: req.body.DiaChi,
        PasswordHash: 1234,
        isOpen: 1,
        Permission: 1
    };
    const entity1 = {
        CMND: req.body.CMND
    };
    const entity2 = {
        CMND: req.body.CMND,
        TrangThai: req.body.TrangThai,
        IDKhuCachLy: req.body.NoiCachLy,
        isCurrent: 1
    };
    console.log(entity.CMND)
    if (rows.length > 0) {
        ndqlModel.add(entity1)
        console.log('success: ', entity1)
        if (entity1.CMND) {
            ttndtModel.add(entity2)
            console.log('success: ', entity1)
        }
    } else {
        userModel.add(entity)
        console.log('success: ', entity)
        if (entity.CMND) {
            ndqlModel.add(entity1)
            console.log('success: ', entity1)
            if (entity1.CMND) {
                ttndtModel.add(entity2)
                console.log('success: ', entity2)
            }
        }

        ttndtModel.add(entity2)
    }

    return res.redirect('/quanli/ndql/')
})
route.get('/ndql/nlq', async function(req, res) {
    const nlqList = await ndqlModel.single1(req.query.cmnd);
    res.render('./vwNguoiDuocQuanLi/nlq', {
        nlqList
    });
});
route.get('/ndql/update', async function(req, res) {
    const rows = await ndqlModel.single(req.query.cmnd);
    const rows1 = await ttndtModel.singleByCMND(req.query.cmnd);
    let infomation = null;
    let ttndtinfo = null;
    if (rows.length > 0) {
        infomation = rows[0];
    }
    if (rows1.length > 0) {
        ttndtinfo = rows1[0];
    }
    res.render('./vwNguoiDuocQuanLi/update', {
        infomation,
        ttndtinfo
    });
});
route.post('/ndql/update', async function(req, res) {
    const entity = {
        CMND: req.body.CMND,
        Ten: req.body.Ten,
        NamSinh: req.body.NamSinh,
        DiaChi: req.body.DiaChi
    };
    const entity1 = {
        CMND: req.body.CMND
    };
    const entity2 = {
        CMND: req.body.CMND,
        TrangThai: req.body.TrangThai,
        IDKhuCachLy: req.body.NoiCachLy
    };
    userModel.update(entity)
    ndqlModel.update(entity1)
    ttndtModel.update(entity2)
    return res.redirect('/quanli/ndql/')
})

module.exports = route;
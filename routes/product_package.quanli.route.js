const express = require('express');
const route = express.Router();
const product_packageModel = require('../models/product_package.model');
const hb = require('handlebars');
const moment = require("moment");

hb.registerHelper('dateFormat', function (date, options) {
    const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "DD/MM/YYYY"
    return moment(date).format(formatToUse);
});

route.get('/product_package/', async function(req, res) {
    const product_packageList = await product_packageModel.all();
    const ids= new Set(product_packageList.map(e=>e.IDGoi))
    const result = Array.from(ids).map(id=>{
        return {
           products: product_packageList.filter(e=>e.IDGoi===id),
           id:id,
        }
    })
    res.render('./vwProduct_Package/list_admin_quanli', {
        result
    });
})

route.get('/product_package/add/', async function(req, res) {
    res.render('./vwProduct_Package/add', {});
});
route.post('/product_package/add', async function(req, res) {
    const product_packageList = await product_packageModel.singleByTenGoi(req.body.TenGoi);
    if (product_packageList.length > 0 ) {
        return res.render('./vwProduct_Package/add', {
            message: "Tên gói đã tồn tại. Thêm vào thất bại."
        });
    }
    // const entity = {
    //     CMND: req.body.CMND,
    //     Ten: req.body.Ten,
    //     NamSinh: req.body.NamSinh,
    //     DiaChi: req.body.DiaChi,
    //     PasswordHash: 1234,
    //     isOpen: 1,
    //     Permission: 1
    // };
    // const entity1 = {
    //     CMND: req.body.CMND
    // };
    // const entity2 = {
    //     CMND: req.body.CMND,
    //     TrangThai: req.body.TrangThai,
    //     IDKhuCachLy: req.body.NoiCachLy,
    //     isCurrent: 1
    // };
    // console.log(entity.CMND)
    // if (rows.length > 0) {
    //     ndqlModel.add(entity1)
    //     console.log('success: ', entity1)
    //     if (entity1.CMND) {
    //         ttndtModel.add(entity2)
    //         console.log('success: ', entity1)
    //     }
    // } else {
    //     userModel.add(entity)
    //     console.log('success: ', entity)
    //     if (entity.CMND) {
    //         ndqlModel.add(entity1)
    //         console.log('success: ', entity1)
    //         if (entity1.CMND) {
    //             ttndtModel.add(entity2)
    //             console.log('success: ', entity2)
    //         }
    //     }

    //     ttndtModel.add(entity2)
    // }

    return res.redirect('/quanli/product_package/')
})
module.exports = route;
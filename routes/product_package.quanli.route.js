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
module.exports = route;
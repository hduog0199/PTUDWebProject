const express = require('express');
const route = express.Router();
const packageModel = require('../models/package.model');
const hb = require('handlebars');
const moment = require("moment");

hb.registerHelper('dateFormat', function (date, options) {
    const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "DD/MM/YYYY"
    return moment(date).format(formatToUse);
});
route.get('/package/', async function(req, res) {

    const packageList = await packageModel.all();

    res.render('./vwPackage/list_admin_quanli', {
        packageList
    });
})


module.exports = route;
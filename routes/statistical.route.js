const express = require('express');
const route = express.Router();
const ttndtModel = require('../models/ttndt.model');
const lsmhModel = require('../models/lsmh.model');
const packageModel = require('../models/package.model');
const productModel = require('../models/sp.model');
const product_packageModel = require('../models/product_package.model');


route.get('/statistical/statistical_user', async function (req, res) {
  res.render('./vwStatistical/statisticalUser')
})

route.post('/statistical/statistical_user', async function (req, res) {

  const current = req.body.isCurrent;
  var listUser = new Array();

  switch (current) {
    case '0': {
      listUser = await ttndtModel.getAllUserByStatus();
      break;
    }
    case '1': {
      listUser = await ttndtModel.getListUserByStatusCurrent(true);
      break;
    }
    case '2': {
      listUser = await ttndtModel.getListUserByStatusCurrent(false);
      break;
    }
  }

  let F0 = 0, F1 = 0, F2 = 0, F3 = 0;

  for (let i = 0; i < listUser.length; i++) {
    if ((listUser[i]).TrangThai == 'F0') {
      F0 += 1;
    }
    if ((listUser[i]).TrangThai == 'F1') {
      F1 += 1;
    }
    if ((listUser[i]).TrangThai == 'F2') {
      F2 += 1;
    }
    if ((listUser[i]).TrangThai == 'F3') {
      F3 += 1;
    }
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

route.get('/statistical/statistical_package', async function (req, res) {
  const allPackageInAllBill = await lsmhModel.getAllPackageInAllBill();
  const allPackage = await packageModel.all();

  for (let i = 0; i < allPackage.length; i++) {
    (allPackage[i]).Count = 0
    for (let j = 0; j < allPackageInAllBill.length; j++) {
      if ((allPackage[i]).IDGoi == (allPackageInAllBill[j]).IDGoi) {
        (allPackage[i]).Count += 1
      }
    }
  }

  res.render('./vwStatistical/statisticalPackage', {
    allPackageInAllBill,
    allPackage,
  });
})


route.get('/statistical/statistical_product', async function (req, res) {
  const allPackageInAllBill = await lsmhModel.getAllPackageInAllBill();
  const allPackage = await packageModel.all();
  const allProduct = await productModel.all();

  var listProduct = new Array();

  for (let i = 0; i < allPackage.length; i++) {
    (allPackage[i]).Count = 0
    for (let j = 0; j < allPackageInAllBill.length; j++) {
      if ((allPackage[i]).IDGoi == (allPackageInAllBill[j]).IDGoi) {
        (allPackage[i]).Count += 1
      }
    }
  }
  // console.log(allPackage)
  for (let i = 0; i < allPackage.length; i++) {
    if ((allPackage[i]).Count > 0) {
      // console.log((allPackage[i]).IDGoi)
      listProduct = await product_packageModel.getListProductByIDPackage((allPackage[i]).IDGoi)
      // console.log(listProduct)
      for (let j = 0; j < allProduct.length; j++) {
        for (let k = 0; k < listProduct.length; k++) {   
          if ((allProduct[j]).IDSanPham === (listProduct[k]).IDSanPham) {   
            (allProduct[j]).Count = (allPackage[i]).Count
            console.log((allPackage[i]).Count) 
            console.log((allProduct[j]).TenSanPham)             
          }
        }
      }
    }
  }
  // console.log(allProduct)

  res.render('./vwStatistical/statisticalProduct', {
    allProduct,
  });
})



module.exports = route;
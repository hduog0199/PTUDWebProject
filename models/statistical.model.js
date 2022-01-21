const TBL_PRODUCT_PACKAGE = `SanPham_GoiNhuYeuPham`;
const TBL_PRODUCT = `SanPham`;
const TBL_PACKAGE = `GoiNhuYeuPham`;
const TBL_BILL = "LichSuMuaHang";
const TBL_USER = `User`;
const TBL_STATUS_ISOLATION_AREA=`TrangThai_NoiDieuTri`

const qlcv = require('../utils/dbCovid');
const httt = require('../utils/db_httt');

module.exports = {
  all: async function () {
    return qlcv.load(
      `
            SELECT * 
            FROM "${TBL_PRODUCT_PACKAGE}" AS pp
            INNER JOIN "${TBL_PRODUCT}" AS product ON pp."IDSanPham" = product."IDSanPham"
            INNER JOIN "${TBL_PACKAGE}" AS package ON pp."IDGoi" = package."IDGoi";
            `
    );
  },

  getListProductByIDPackage: async function (IDGoi) {
    let sqlString = `
    SELECT * 
    FROM "${TBL_PRODUCT}" 
    INNER JOIN "${TBL_PRODUCT_PACKAGE}" ON "${TBL_PRODUCT_PACKAGE}"."IDSanPham"="${TBL_PRODUCT}"."IDSanPham"
    WHERE "${TBL_PRODUCT_PACKAGE}"."IDGoi"="${IDGoi}"
    `;
    return await qlcv.load(sqlString);
  },

  getListBillByIDPackage: async function (IDGoi) {
    let sqlString = `
    SELECT * 
    FROM "${TBL_BILL}" 
    WHERE "${TBL_BILL}"."IDGoi"="${IDGoi}";
    `;
    return await qlcv.load(sqlString);
  },


  getListUserByStatus: async function (Status) {
    let sqlString = `
    SELECT * 
    FROM "${TBL_USER}" 
    INNER JOIN "${TBL_STATUS_ISOLATION_AREA}" ON "${TBL_STATUS_ISOLATION_AREA}"."CMND"="${TBL_USER}"."CMND"
    WHERE 
    "${TBL_STATUS_ISOLATION_AREA}"."isCurrent"='true' AND 
    "${TBL_STATUS_ISOLATION_AREA}"."TrangThai"="${Status}";
    `;
    return await qlcv.load(sqlString);
  },



  getListProductByIDPackage: async function (IDGoi) {
    let sqlString = `
    SELECT * 
    FROM "${TBL_PRODUCT}" 
    INNER JOIN "${TBL_PRODUCT_PACKAGE}" ON "${TBL_PRODUCT_PACKAGE}"."IDSanPham"="${TBL_PRODUCT}"."IDSanPham"
    WHERE "${TBL_PRODUCT_PACKAGE}"."IDGoi"="${IDGoi}";
    `;
    return await qlcv.load(sqlString);
  },

  singleByCMND: async function (cmnd) {
    var sqlString = `select* from "${TBL_USER}" where "${TBL_USER}"."CMND"='${cmnd}'`;
    return qlcv.load(sqlString);
  }
}
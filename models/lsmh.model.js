const TBL_LSMH = "LichSuMuaHang";
const TBL_PACKAGE = `GoiNhuYeuPham`;
const TBL_USER = `User`;
const qlcv = require('../utils/dbCovid');
const httt = require('../utils/db_httt');


module.exports = {
    //get all records in table by pass params tableName
    all: async function () {
        return await qlcv.load(`select * from "${TBL_LSMH}"`);
    },
    getAllPackageInAllBill: async function () {
        let sqlString = `
        SELECT "${TBL_LSMH}"."CMND", "${TBL_USER}"."Ten","${TBL_PACKAGE}"."IDGoi","${TBL_PACKAGE}"."TenGoi"
        FROM "${TBL_LSMH}" 
        INNER JOIN "${TBL_PACKAGE}" ON "${TBL_PACKAGE}"."IDGoi"="${TBL_LSMH}"."IDGoi"
        INNER JOIN "${TBL_USER}" ON "${TBL_USER}"."CMND"="${TBL_LSMH}"."CMND"
        `
        return await qlcv.load(sqlString);
    },
    getPackageInBillByIDPackage: async function (IDGoi) {
        let sqlString = `
        SELECT "${TBL_LSMH}"."CMND", "${TBL_USER}"."Ten","${TBL_PACKAGE}"."IDGoi","${TBL_PACKAGE}"."TenGoi"
        FROM "${TBL_LSMH}" 
        INNER JOIN "${TBL_PACKAGE}" ON "${TBL_PACKAGE}"."IDGoi"="${TBL_LSMH}"."IDGoi"
        INNER JOIN "${TBL_USER}" ON "${TBL_USER}"."CMND"="${TBL_LSMH}"."CMND"
        WHERE 
        "${TBL_LSMH}"."IDGoi"='${IDGoi}';
        `;
        return await qlcv.load(sqlString);
    },
    getListBillByIDPackage: async function (IDGoi) {
        let sqlString = `
        SELECT * 
        FROM "${TBL_LSMH}" 
        WHERE "${TBL_LSMH}"."IDGoi"="${IDGoi}";
        `;
        return await qlcv.load(sqlString);
    },
}
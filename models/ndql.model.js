const TBL_NDQL="NguoiDuocQuanLi";
const qlcv=require('../utils/dbCovid');
// const httt=require('../utils/db_httt');


module.exports = {
    //get all records in table by pass params tableName
    all: async function() {
        const sqlString = `select "NguoiDuocQuanLi"."ID_NguoiDuocQuanLi", "User"."CMND","User"."Ten","User"."NamSinh","User"."DiaChi"
                       from "${TBL_NDQL}" inner join "User" on "NguoiDuocQuanLi"."CMND"="User"."CMND"`;
        return await qlcv.load(sqlString);
    },
    single: async function(cmnd) {
        const sqlString = `select "NguoiDuocQuanLi"."ID_NguoiDuocQuanLi","NguoiDuocQuanLi"."NguoiLienQuan", "User"."CMND","User"."Ten","User"."NamSinh","User"."DiaChi"
                        from "${TBL_NDQL}" inner join "User" on "NguoiDuocQuanLi"."CMND"="User"."CMND" 
                        where "${TBL_NDQL}"."CMND"= '${cmnd}'`;
        return await qlcv.load(sqlString);
    },
    single1: async function(cmnd) {
        const sqlString = `select "User"."CMND","User"."Ten","User"."NamSinh","User"."DiaChi"
        from "${TBL_NDQL}" inner join "User" on "NguoiDuocQuanLi"."NguoiLienQuan"="User"."CMND" 
        where "${TBL_NDQL}"."CMND"= '${cmnd}'`;
        return await qlcv.load(sqlString);
    },
    add: async function(entity) {
        return await qlcv.add(TBL_NDQL, entity);
    },
    update: async function(entity) {
        const condition = {
            CMND: entity.CMND
        }
        delete entity.CMND
        return await qlcv.patch(TBL_NDQL, entity, condition);
    },
    singleByCMND: async function(cmnd) {
        var sqlString = `select* from "${TBL_NDQL}" where "${TBL_NDQL}"."CMND"='${cmnd}'`;
        return qlcv.load(sqlString);
    }
}
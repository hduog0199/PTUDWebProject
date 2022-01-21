const TBL_PRODUCT_PACKAGE = `SanPham_GoiNhuYeuPham`;
const TBL_PRODUCT = `SanPham`;
const TBL_PACKAGE = `GoiNhuYeuPham`;

const qlcv = require('../utils/dbCovid');
// const httt = require('../utils/db_httt');

module.exports = {
    all: async function() {
        return qlcv.load(
            `select * 
            from "${TBL_PRODUCT_PACKAGE}" as pp
            inner join "${TBL_PRODUCT}" as product on pp."IDSanPham" = product."IDSanPham"
            inner join "${TBL_PACKAGE}" as package on pp."IDGoi" = package."IDGoi";
            `);
            
    },
    singleByTenGoi: async function(TenGoi) {
        var sqlString = `select* from "${TBL_PRODUCT_PACKAGE}" where "${TBL_PRODUCT_PACKAGE}"."TenGoi"='${TenGoi}'`;
        return qlcv.load(sqlString);
    }
}
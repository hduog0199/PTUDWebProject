const TBL_PRODUCT_PACKAGE = `SanPham_GoiNhuYeuPham`;
const TBL_PRODUCT = `SanPham`;
const TBL_PACKAGE = `GoiNhuYeuPham`;

const qlcv = require('../utils/dbCovid');
// const httt = require('../utils/db_httt');

module.exports = {
    all: async function() {
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
        FROM "${TBL_PRODUCT_PACKAGE}"
        INNER JOIN "${TBL_PRODUCT}"  ON "${TBL_PRODUCT_PACKAGE}"."IDSanPham"="${TBL_PRODUCT}"."IDSanPham"
        WHERE "${TBL_PRODUCT_PACKAGE}"."IDGoi"=${IDGoi}
        `;
        return await qlcv.load(sqlString);
      },
            
    singleByTenGoi: async function(TenGoi) {
        var sqlString = `select* from "${TBL_PRODUCT_PACKAGE}" where "${TBL_PRODUCT_PACKAGE}"."TenGoi"='${TenGoi}'`;
        return qlcv.load(sqlString);
    }

}
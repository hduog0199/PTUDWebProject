const TBL_SP = `SanPham`;
const qlcv = require('../utils/dbCovid');
// const httt = require('../utils/db_httt');

module.exports = {
    all: async function() {
        return qlcv.load(`select * from "${TBL_SP}"`);
    },
    single: async function(IDSanPham)
    {
        return await qlcv.load(`select * from "${TBL_SP}" where "${TBL_SP}"."IDSanPham"= ${IDSanPham}`);
    },
    update: async function(entity) {
        const condition = {
            IDSanPham: entity.IDSanPham
        }
        delete entity.IDSanPham
        return await qlcv.patch(TBL_SP, entity, condition);
    }

}
const TBL_TTNDT = `TrangThai_NoiDieuTri`;
const qlcv = require('../utils/dbCovid');
const httt = require('../utils/db_httt');

module.exports = {
    all: async function() {
        return qlcv.load(`select * from "${TBL_TTNDT}"`);
    },
    add: async function(entity) {
        return await qlcv.add(TBL_TTNDT, entity);
    },
    singleByCMND: async function(cmnd) {
        var sqlString = `select* from "${TBL_TTNDT}" where "${TBL_TTNDT}"."CMND"='${cmnd}'`;
        return qlcv.load(sqlString);
    },
    update: async function(entity) {
        const condition = {
            CMND: entity.CMND
        }
        delete entity.CMND
        return await qlcv.patch(TBL_TTNDT, entity, condition);
    },
}
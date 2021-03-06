const TBL_TTNDT = `TrangThai_NoiDieuTri`;
const TBL_USER = `User`;
const qlcv = require('../utils/dbCovid');
// const httt = require('../utils/db_httt');

module.exports = {
    all: async function() {
        return qlcv.load(`select * from "${TBL_TTNDT}"`);
    },
    getListUserByStatusCurrent: async function (isCurrent) {
        let sqlString = `
        SELECT "${TBL_USER}"."CMND", "${TBL_USER}"."Ten", "${TBL_USER}"."NamSinh", "${TBL_USER}"."DiaChi","${TBL_TTNDT}"."TrangThai"
        FROM "${TBL_USER}" 
        INNER JOIN "${TBL_TTNDT}" ON "${TBL_TTNDT}"."CMND"="${TBL_USER}"."CMND"
        WHERE 
        "${TBL_TTNDT}"."isCurrent"='${isCurrent}';
        `;
        return await qlcv.load(sqlString);
    },
    getAllUserByStatus: async function () {
        let sqlString = `
        SELECT "${TBL_USER}"."CMND", "${TBL_USER}"."Ten", "${TBL_USER}"."NamSinh", "${TBL_USER}"."DiaChi","${TBL_TTNDT}"."TrangThai","${TBL_TTNDT}"."isCurrent"
        FROM "${TBL_USER}" 
        INNER JOIN "${TBL_TTNDT}" ON "${TBL_TTNDT}"."CMND"="${TBL_USER}"."CMND";
        `;
        return await qlcv.load(sqlString);
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
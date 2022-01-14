const TBL_LSMH = "LichSuMuaHang";
const qlcv = require('../utils/dbCovid');
const httt = require('../utils/db_httt');


module.exports = {
    //get all records in table by pass params tableName
    all: async function () {
        return await qlcv.load(`select * from "${TBL_LSMH}"`);
    },
}
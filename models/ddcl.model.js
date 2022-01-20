const TBL_DDCL = `DiaDiemCachLy`;
const qlcv = require('../utils/dbCovid');
const httt = require('../utils/db_httt');


module.exports = {
    //get all records in table by pass params tableName
    all: async function() {
        return await qlcv.load(`select * from "${TBL_DDCL}"`);
    },
    singleByID: async function(id) {
        var sqlString = `select* from "${TBL_DDCL}" where "${TBL_DDCL}"."IDKhuCachLy"='${id}'`;
        return qlcv.load(sqlString);
    }

}
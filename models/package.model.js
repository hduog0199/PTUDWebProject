const TBL_PACKAGE = `GoiNhuYeuPham`;
const qlcv = require('../utils/dbCovid');
const httt = require('../utils/db_httt');

module.exports = {
    all: async function() {
        return qlcv.load(`select * from "${TBL_PACKAGE}"`);
    }
}
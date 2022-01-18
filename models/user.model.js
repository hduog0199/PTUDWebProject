const TBL_USER=`User`;
const qlcv=require('../utils/dbCovid');
const httt=require('../utils/db_httt');

module.exports={
    all:async function(){
        return qlcv.load(`select * from "${TBL_USER}"`);
    },
    getDSQL:async function(){
        let sqlString=`select * from "${TBL_USER}" 
                        where "${TBL_USER}"."Permission"=1`;//NguoiQuanLi có Permission=1
        return await qlcv.load(sqlString);
    },
    update: async function(entity)
    {
        const condition={
            CMND:entity.CMND
        }
        delete entity.CMND
        return await qlcv.patch(TBL_USER,entity,condition);
    },
    add: async function(entity)
    {
        return await qlcv.add(TBL_USER,entity);
    },
    singleByCMND:async function(cmnd){
        var sqlString=`select* from "${TBL_USER}" where "${TBL_USER}"."CMND"='${cmnd}'`;
        return qlcv.load(sqlString);
    }
}
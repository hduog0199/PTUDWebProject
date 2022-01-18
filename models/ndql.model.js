const TBL_NDQL="NguoiDuocQuanLi";
const qlcv=require('../utils/dbCovid');
const httt=require('../utils/db_httt');


module.exports={
    //get all records in table by pass params tableName
    all:  async function (){
        const sqlString=`select "NguoiDuocQuanLi"."ID_NguoiDuocQuanLi", "User"."CMND","User"."Ten","User"."NamSinh","User"."DiaChi"
                       from "${TBL_NDQL}" inner join "User" on "NguoiDuocQuanLi"."CMND"="User"."CMND"`;
        return await qlcv.load(sqlString);
    },
    single: async function(cmnd)
    {
        const sqlString=`select "NguoiDuocQuanLi"."ID_NguoiDuocQuanLi", "User"."CMND","User"."Ten","User"."NamSinh","User"."DiaChi"
                        from "${TBL_NDQL}" inner join "User" on "NguoiDuocQuanLi"."CMND"="User"."CMND" 
                        where "${TBL_NDQL}"."CMND"= '${cmnd}'`;
        return await qlcv.load(sqlString);
    }
    
}
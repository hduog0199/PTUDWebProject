const qlcv=require('./utils/dbCovid');
const qltt=require('./utils/db_httt');

async function main()
{
    const rows=await qltt.all('User')
    console.log(rows);
}
main();
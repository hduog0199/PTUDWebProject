const config=require('../config/default.json');
const db=require('knex')(config.httt);

module.exports={
  // // query database with any sqlString by way pass sqlString
  // load: async function()
  // {
  //   // return await db.raw(sqlStatement).returning('*').then(results=>results.rows).catch(err=>err.message);
  //   db.raw('select * from User',[]).then(data=>console.log(data));
  // },

  //get all records in table by pass params tableName
  all:  async function (tableName){
    return await db(`${tableName}`).select('*').then(data=>data).catch(err=>err.message);
  },
  //insert 1 record to table by pass 2 params: tableName and entity:
  add:async function(tableName,entity)
  {
    return await db(`${tableName}`).insert(entity).returning('*').then(data=>data).catch(err=>err.message);
  },
  //update records in table by pass 3 params : tableName, entity which you want to update (no contain unique ID),
  // and third param is condition (must have)
  patch:async function(tableName,entity,condition){
    return await db(`${tableName}`).update(entity).where(condition).returning('*').then(data=>data).catch(err=>err.message);
  },

  //delete record by condition
  del:async function(tableName,condition){
    return await db(`${tableName}`).where(condition).del().returning('*').then(rs=>rs).catch(err=>err.message);
  }
}

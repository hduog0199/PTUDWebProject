const config=require('../config/default.json');
const db=require('knex')(config.qlCovid);

module.exports={
  load: async function(sqlStatement)
  {
    return await db.raw(sqlStatement).returning('*').then(results=>results.rows).catch(err=>err.message);
  },
  all:  async function (tableName){
    return await db(`${tableName}`).select('*').then(data=>data).catch(err=>err.message);
  },
  add:async function(tableName,entity)
  {
    return await db(`${tableName}`).insert(entity).returning('*').then(data=>data).catch(err=>err.message);
  },
  patch:async function(tableName,entity,condition){
    return await db(`${tableName}`).update(entity).where(condition).returning('*').then(data=>data).catch(err=>err.message);
  },
  del:async function(tableName,condition){
    return await db(`${tableName}`).where(condition).del().returning('*').then(rs=>rs).catch(err=>err.message);
  }
}

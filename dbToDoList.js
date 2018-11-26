let mysql = require("mysql");

let dbConfig ={
    host:       "localhost",
    user:       "root",
    password:   "masterkey",
    port:       3306,
    database:   "dbtodolist"
};

let SELECT = function(aTable, aFields, aWhere, aOrderBy,aCallback){
  let con = mysql.createConnection(dbConfig);
  con.connect(function(err) {
    if (err) aCallback(err,null);
    let sql = "SELECT " + aFields + " FROM " + aTable;
    if((aWhere !== undefined) && (aWhere !== "")){
      sql += " WHERE (" + aWhere + ")";
    }
    if((aOrderBy !== undefined) && (aOrderBy !== "")){
      sql += " ORDER BY (" + aOrderBy + ")";
    }
    con.query(sql, function(err, result){
      aCallback(err, result);
    });
  });
};

let INSERT = function(aTable, aValues){
  let con = mysql.createConnection(dbConfig);
  let names = Object.keys(aValues);
  let values= Object.values(aValues);
  let sql = "INSERT INTO " + aTable + "(" + names+ ") VALUES ?";
  con.query(sql, values, function(err, result){
    if (err) throw err;
    return result.affectedRows;
  });
};

module.exports = {
  dbConfig: dbConfig,
  SELECT: SELECT,
  INSERT: INSERT
};
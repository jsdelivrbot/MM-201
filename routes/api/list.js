let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let db = require("../../dbToDoList");

/* GET api list. */
router.get('/', /*system.validateAuthentication,*/ function(req, res) {

  try{
    db.SELECT("tblListItem", "*", "fdUserID = " + req.query.fdUserID,"",function(err, aResult){
      if(err) res.status(500).json({message: err});
      res.status(200).send(aResult).end();
    });
  }catch (exp){
    res.status(500).json({message: exp.message});
  }
});

module.exports = router;
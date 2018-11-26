let express = require("express");
let router = express.Router();
let path = require("path");
let mysql = require('mysql');
let system = require("../system");

/* GET home page*/
router.get('/', function(req, res, next) {
  res.sendFile(path.join(global.__basedir+ '/public/xmas_design_login_portrait.html'));
});

router.get('/login', async function(req, res, next) {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "masterkey",
        database: "dbtodolist"
    });

    con.connect(function(err) {
        try {
            if (err) throw err;
            let authorizationHeader = req.headers['authorization'];
            let credentials = authorizationHeader.split(' ')[1];
            let rawData = Buffer.from(credentials, 'base64');
            credentials = rawData.toLocaleString().split(":");
            let fdUserName = credentials[0].trim();
            let fdPassword = credentials[1].trim();
            let sql = "SELECT * FROM tblUser WHERE fdUserName = ? AND fdPassword = ?";
            con.query(sql, [fdUserName, fdPassword],
                function (err, result) {
                    if (err) throw err;
                    if (result.length <= 0) {
                        res.status(401).json({message: 'Authentication failed. Wrong user or password'});
                    } else {
                        const user = {
                            fdUserID: result[0].fdUserID,
                            fdUserName: result[0].fdUserName,
                            fdEMail: result[0].fdEMail
                        };
                        system.createAuthentication(res, user);
                    }
                });
        }catch (e) {
            res.status(401).json({message: e.message});
        }
    });
});

router.post('/list', system.validateAuthentication, function(req, res, next) {
    res.sendFile(path.join(global.__basedir+ '/public/xmas_design_list_portrait.html'));
});

module.exports = router;


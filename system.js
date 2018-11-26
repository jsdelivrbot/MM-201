let jwt = require('jsonwebtoken');

const DEBUG = true;
const SUPER_SECRET_KEY = process.env.TOKEN_KEY || "TransparentWindowsFlyingDonkeys"; // for use with web token.
//----------------------------------------------------------------------------------------------------------------------

let validateAuthentication = function(req, res, next) {
    let token = req.headers['x-access-auth'] || req.body.auth || req.params.auth; // Suporting 3 ways of submiting token
    log(token);
    try {
         // Is the token valid?
        req.token = jwt.verify(token, SUPER_SECRET_KEY); // we make the token available for later functions via the request object.
        next(); // The token was valid so we continue
    } catch (err) {
        res.status(401).end(); // The token could not be validated so we tell the user to log in again.
    }
};
//----------------------------------------------------------------------------------------------------------------------

let createAuthentication = function(res,aUser){
    jwt.sign({user: aUser}, SUPER_SECRET_KEY, (err, token) => {
        res.status(200).send({
            auth: token,
            user: aUser
        }).end(); // Send token and authenticated user to client.
    });
};
//----------------------------------------------------------------------------------------------------------------------

let log = function(...messages) {
    if (DEBUG) {
        messages.forEach(msg => {
            console.log(msg);
        })
    }
};
//----------------------------------------------------------------------------------------------------------------------

module.exports ={
    validateAuthentication: validateAuthentication,
    createAuthentication: createAuthentication,
    log: log,
};

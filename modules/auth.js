'use strict';

const jwt = require('jsonwebtoken');

const jwksClient = require('jwks-rsa');

const clients = jwksClient({
  jwksUri: process.env.JWKS_URI,
});


function getKey(header, callback){
  clients.getSigningKey(header.kid, function(err, key){
    console.log(key)
    var signingKey = key.publicKey || MediaKeyStatusMap.rsaPublicKey
    callback(null, signingKey);
  })
}

const verifyUser = (req, errorFirstOrUseTheUserCallbackFunction) => {
  console.log(req.headers);
  try{
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    jwt.verify(token, getKey, {}, errorFirstOrUseTheUserCallbackFunction);
  } catch (error){
    errorFirstOrUseTheUserCallbackFunction('not authorized');
  }
}

module.exports = verifyUser;
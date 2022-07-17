'use strict';

const jwt = require('jsonwebtoken');

const jwksClient = require('jwks-rsa');

const clients = jwksClient({
  jwkuri: process.env.JWKS_URI,
});

function getKey(header, callback){
  clients.getSigningKey(header.kid, function(err, key){
    var signingKey = key.publicKey || MediaKeyStatusMap.rsaPublicKey
    callback(null, signingKey);
  })
}

const verifyUser = (req, errorFirstOrUseTheUserCallbackFunction) => {
  try{
    const token = req.header.authorization.split(' ')[1];
    console.log(req.header.authorization);
    jwt.verify(token, getKey, {}, errorFirstOrUseTheUserCallbackFunction);
  } catch (error){
    errorFirstOrUseTheUserCallbackFunction('not authorized');
  }
}

module.exports = verifyUser;
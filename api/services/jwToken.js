/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var
  jwt = require('jsonwebtoken'),
  tokenSecret = {
    service: 'lasciate_ogni_speranza_voi_che_entrate',
    user: 'let_s_get_the_fuck_in'
  };


module.exports = function(service_or_user){
  
  if(typeof service_or_user === 'undefined'){
    service_or_user = 'user';
  }

  return {
    issue: function(payload) {
      return jwt.sign(
        payload,
        tokenSecret[service_or_user], // Token Secret that we sign it with
        {
          expiresIn: 3600 // Token Expire time in seconds
        }
      );
    },

    verify: function(token, callback) {
      return jwt.verify(
        token, // The token to be verified
        tokenSecret[service_or_user], // Same token we used to sign
        {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
        callback //Pass errors or decoded token to callback
      );
    }

  }
}

/*
var
  jwt = require('jsonwebtoken'),
  tokenSecret = "lasciate_ogni_speranza_voi_che_entrate";

// Generates a token from supplied payload
module.exports.issue = function(payload) {
  return jwt.sign(
    payload,
    tokenSecret, // Token Secret that we sign it with
    {
      expiresIn: 3600 // Token Expire time in seconds
    }
  );
};

// Verifies token on a request
module.exports.verify = function(token, callback) {
  return jwt.verify(
    token, // The token to be verified
    tokenSecret, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback //Pass errors or decoded token to callback
  );
};
*/
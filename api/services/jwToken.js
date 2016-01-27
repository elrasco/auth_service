/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var
  jwt = require('jsonwebtoken'),

  jwt_config = {

    user: {
      tokenSecret: 'let_s_get_the_fuck_in',
      expiresIn: '1d' // 1 day
    },
    service: {
      tokenSecret: 'lasciate_ogni_speranza_voi_che_entrate',
      expiresIn: '3650 days' // 10 years
    }

  };

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
        jwt_config[service_or_user].tokenSecret, // Token Secret that we sign it with
        {
          expiresIn: jwt_config[service_or_user].expiresIn // Token Expire time in seconds
        }
      );
    },

    verify: function(token, callback) {
      return jwt.verify(
        token, // The token to be verified
        jwt_config[service_or_user].tokenSecret, // Same token we used to sign
        {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
        callback //Pass errors or decoded token to callback
      );
    }

  }
}
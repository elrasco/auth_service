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
      //expiresIn: '30 days' // 30 day
      expiresIn: '30 minutes' //
    },
    guest: {
      tokenSecret: 'ten_li_lehecanes',
      expiresIn: '30 days', // 30 day,
      extra: { guest: true }
    },
    service: {
      tokenSecret: 'lasciate_ogni_speranza_voi_che_entrate',
      expiresIn: '3650 days' // 10 years
    },
    chat: {
      tokenSecret: 'all_work_and_no_play_makes_Jack_a_dull_boy',
      expiresIn: '1 days'
    }

  };


module.exports = function(token_type = 'user') {

  return {
    issue: function(payload) {
      return jwt.sign(
        Object.assign({}, payload, jwt_config[token_type].extra),
        jwt_config[token_type].tokenSecret, // Token Secret that we sign it with
        {
          expiresIn: jwt_config[token_type].expiresIn // Token Expire time in seconds
        }
      );
    },

    decode: function(token) {
      return jwt.decode(token);
    },

    verify: function(token, callback) {
      return jwt.verify(
        token, // The token to be verified
        jwt_config[token_type].tokenSecret, // Same token we used to sign
        {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
        callback //Pass errors or decoded token to callback
      );
    }

  };
};

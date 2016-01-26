/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcryptjs');

module.exports = {

  	attributes: {

	  	name: 'string',
		lastname: 'string',
		email: 'string',
		password: {
			type: 'string',
			protected: true
		},
		phone_prefix: 'string',
		phone: 'string',
		enable: 'boolean',
		first_time: 'boolean',
		type: {
    		type: 'string',
		    enum: ['service', 'user']
  		},
		createdBy: 'integer',
		roles: {
	  		collection: 'user_role',
	  		via: 'user_id'
	  	},

	  	comparePassword: function(password, done) {

	      var _this = this;

	      bcrypt.compare(password, this.password, function (err, res) {
	      	
	        if (!res)
	          return done(false, {
	            message: 'Invalid Password'
	          });
	        
	        return done(true, {
	          message: 'Logged In Successfully'
	        });
	      });
	    }
	},

	beforeCreate: function(user, cb) {

	    bcrypt.genSalt(10, function(err, salt) {
	      bcrypt.hash(user.password, salt, function(err, hash) {
	        if (err) {
	          console.log(err);
	          cb(err);
	        }else{
	          user.password = hash;
	          cb(null, user);
	        }
	      });
	    });
	}
	
};
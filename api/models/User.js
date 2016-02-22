/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcryptjs');

module.exports = {

  	attributes: {

	  	name: {
            type: Sequelize.STRING
        },
		lastname: {
            type: Sequelize.STRING
        },
		email: {
            type: Sequelize.STRING
        },
		password: {
            type: Sequelize.STRING,
            protected: true
        },
		country_code: {
            type: Sequelize.STRING
        },
		phone: {
            type: Sequelize.STRING
        },
		enable: {
            type: Sequelize.STRING
        },
		first_time: {
            type: Sequelize.BOOLEAN
        },
		type: {
			type: Sequelize.ENUM('user', 'service')
  		},
		createdBy: {
			type: Sequelize.INTEGER
		}
	},

	associations: function() {
		User.hasMany(User_roles, {as: 'roles', foreignKey: 'user_id'})
	},

	options: {
		freezeTableName: false,
		tableName: 'user',
		classMethods: {
			comparePassword: function(password, done) {

			    var _this = this;

			    bcrypt.compare(password, this.password, function (err, res) {
			      	
			        if (!res) {
			        	return done(false, {
			            	message: 'Invalid Password'
			          	});
			        }
			        
		        	return done(true, {
		          		message: 'Logged In Successfully'
		        	});
			    });
		    }	
		}, 
		
		instanceMethods: {},

		hooks: {
			beforeCreate: function(user, options, cb) {

				console.log('before create');

			    bcrypt.genSalt(10, function(err, salt) {
			    	bcrypt.hash(user.password, salt, function(err, hash) {
			        	if (err) {
			          		console.error(err);
			          		throw new Error("error hashing user password!!")
			          		cb(err);
			        	} else {
			          		user.password = hash;
			          		cb(null, user);
			        	}
			      	});
			    });

			}//end beforeCreate

		}
	}
	
};
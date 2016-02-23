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
		classMethods: {}, 
		
		instanceMethods: {
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

		hooks: {
			beforeCreate: function(user, options, cb) {
				Password.hash(user.password).then(function(hash) {
					user.password = hash;
			        cb(null, user);
				}, function(err) {
					cb(err);
				})
			}//end beforeCreate

		}
	}
	
};
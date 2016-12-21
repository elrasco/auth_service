/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcryptjs');

module.exports = {

    attributes: {

        name: Sequelize.STRING,
        lastname: Sequelize.STRING,
        email: Sequelize.STRING,
        password: {
            type: Sequelize.STRING
        },
        firstPassword: Sequelize.STRING,
        country_code: Sequelize.STRING,
        phone: Sequelize.STRING,
        enable: Sequelize.STRING,
        first_time: Sequelize.STRING,
        type: Sequelize.ENUM('user', 'service'),
        createdBy: Sequelize.INTEGER
    },

    associations: function() {
        User.hasMany(User_roles, {
            as: 'roles',
            foreignKey: 'user_id'
        })
    },

    options: {
        freezeTableName: false,
        tableName: 'user',
        classMethods: {},
        instanceMethods: {
            comparePassword: function(password, done) {

                var _this = this;

                bcrypt.compare(password, this.password, function(err, res) {
                    if (!res) {
                        return done(false, {message: 'Invalid Password'});
                    }
                    return done(true, {message: 'Logged In Successfully'});
                });
            },
            toJSON: function() {
                let user = this.get({ plain: true });
                delete user.password;
                return user;
            }
        },

        hooks: {
            beforeCreate: function(user, options, cb) {
                user.firstPassword = user.password;
                Password.hash(user.password).then(function(hash) {
                    user.password = hash;
                    cb(null, user);
                }, function(err) {
                    cb(err);
                })
            } //end beforeCreate

        }
    }

};

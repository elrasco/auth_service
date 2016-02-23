/**
* User_roles.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  	attributes: {
  		role: {
  			type: Sequelize.STRING
  		}
  	},

  	associations: function() {
    },

    options: {
        freezeTableName: false,
        tableName: 'user_roles',
        classMethods: {},
        instanceMethods: {},
        hooks: {}
    }
};


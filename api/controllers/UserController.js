/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	create: function(req,res){

		if(!req.body.password){
			req.body.password = Functions.generateRandomString();
		}

		var user = req.body;
		return sequelize.transaction(function(t) {
			return User.create(user, 
			{
				transaction: t
				,include: [User.associations.roles]

			}).then(function(created) {
				console.info(`user [${created.id} - ${created.email}] created `);
				return new Promise(function(resolve, reject) {
					resolve(created);
				});
			})
		}).then(function(result) {
			res.send(result);
		}).catch(function(err) {
			//rollback
			console.error('err')
			console.error(err)
			res.send({error: err});
		});

	}


};


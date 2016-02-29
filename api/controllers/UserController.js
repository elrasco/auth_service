/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	find: function(req, res) {
		User.findAll({
			attributes: {exclude: ['updatedAt', 'createdAt', 'password']},
			include: [{
              model: User_roles, as: 'roles', 
              attributes: {exclude: ['updatedAt', 'createdAt', 'user_id', 'id']}
            }]
		})
		.then(function(users) {
			res.send(users);
		}, function(e) {

			res.send(e);
		})
	}, 

	resetPassword: function(req, res) {
		Password.hash(req.body.password)
		.then(function(hash) {
			User.update({
				password: hash
			}, {
				where: {email: req.body.email}
			}).then(function(result) {
				res.send({updated: result[0]})
			})
		});
	},
	
	/**
	 * actually is a findOrCreate
	 */
	create: function(req,res){

		if(!req.body.password){
			req.body.password = Functions.generateRandomString();
		}

		var user = req.body;
		return sequelize.transaction(function(t) {
			//transaction type by default is DEFERRED
			return User.findOne({
				attributes: {exclude: ['updatedAt', 'createdAt', 'password']},
				include: [{
	              model: User_roles, as: 'roles', 
	              attributes: {exclude: ['updatedAt', 'createdAt', 'user_id', 'id']}
	            }],
				where: {email: user.email}, 
				transaction: t
			})
			.then(function(found) {
				if (!found) {
					return User.create(user, 
					{
						transaction: t
						,include: [User.associations.roles]
						,raw:true

					}).then(function(created) {
						delete created.dataValues.password;
						console.info(`user [${created.id} - ${created.email}] created `);
						return new Promise(function(resolve, reject) {
							resolve(created);
						});
					})
				} else {
					return new Promise(function(resolve, reject) {
						resolve(found);
					});
				}

			});
			
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


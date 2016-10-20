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
		});
	},

	resetPassword: function(req, res) {

		if((req.body.email || '').trim() === '' && (req.body.id || '') === ''){
			res.badRequest();
		}
		else if((req.body.password || '').trim() === ''){
			res.badRequest();
		}
		else {

			var options = {};
			if((req.body.email || '').trim() !== ''){
				Object.assign(options, {where: {email: req.body.email}});
			}
			else if((req.body.id || '') !== ''){
				Object.assign(options, {where: {id: req.body.id}});
			}
			console.log(options);
			Password.hash(req.body.password)
			.then(
				function(hash) {
				console.log('HASH: '+hash);
				User
				.update({
					password: hash
				}, options)
				.then(function(result) {
					res.send({updated: result[0]});
				}, function(error) {
					console.log(error);
					res.serverError({error});
				});
			});
		}

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
	              attributes: {exclude: ['id']}
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
			console.error('err');
			console.error(err);
			res.send({error: err});
		});
	}
};

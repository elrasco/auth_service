module.exports = function (req, res, next) {

	if (req.user) {
		return User_roles
		.findOne({user_id: req.user.id,role: 'platform'})
		.then(function(role) {
			console.log('im platform');
			if (role) {
				next();
				return new Promise(function(resolve, reject) {
					resolve();
				});
			} else {
				res.forbidden('You are not permitted to perform this action.');
			}
		});
	} else {
		res.forbidden();	
	}

};
module.exports = function (req, res, next) {

	if (req.user) {
		return User_roles
		.findOne({
			user_id: req.user.id,
			role: 'admin'
		})
		.then(function(role) {
			if (role) {
				return new Promise(function(resolve, reject) {
					resolve();
				});
				next();
			} else {
				res.forbidden('You are not permitted to perform this action.');
			}
		});
	} else {
		res.serverError();	
	}

}
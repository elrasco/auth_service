module.exports = function (req, res, next) {

	if (req.user) {
		return User_roles
		.findOne({user_id: req.user.id, role: 'smallfish'})
		.then(function(role) {
			if (role) {
				console.log('im smallfish');
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

}
module.exports = function (req, res, next) {

	if (req.user) {
		return User_roles
		.findOne({
			where: {
				user_id: req.user.id,
				role: 'reader'
			}
		})
		.then(function(role) {
			if (role) {
				console.log('im reader');
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
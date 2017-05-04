
var bcrypt = require('bcryptjs');

module.exports.hash = function(password) {
	return new Promise(function(resolve, reject) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
		    	if (err) {
		      		console.error(err);
		      		reject(err);
		      		throw new Error("error hashing user password!!");
		    	} else {
		      		resolve(hash);
		    	}
		  	});
		});
	});
};

const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
},
{
	collection: "Users"
})

let userModel = mongoose.model('User', userSchema)

module.exports = userModel
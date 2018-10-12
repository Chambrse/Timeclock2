const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
	companyName: {
		type: String,
		default: '',
	  },
	  username: {
		type: String,
		default: '',
	  },
	  city: {
		type: String,
		default: '',
	  },
	  country: {
		type: String,
		default: '',
	  },
	  postalCode: {
		type: String,
		default: '',
	  },
	  brand: {
		type: String,
		default: '',
	  },
	  email: {
		type: String,
		default: '',
	  },
	  adminFirstName: {
		type: String,
		default: '',
	  },
	  adminLastName: {
		type: String,
		default: '',
	  },
	  password: {
		type: String,
		default: '',
	  },
/* 	  isDeleted: {
		type: Boolean,
		default: false,
		}, */
		status: {
			type: Boolean,
			default: false
		},
	  employeeType: {
		type: String,
		default: "admin",
		},
		clockIn: [{
			time: Date,
			coords: String
		}],
		clockOut: [{
			time: Date,
			coords: String
		}],
})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User
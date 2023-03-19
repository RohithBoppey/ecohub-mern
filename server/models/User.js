const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	fullname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	img_url: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	phone_number: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	cart: Array,
});

const User = mongoose.model("user", UserSchema);

module.exports = User;

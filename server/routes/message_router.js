const express = require("express");
const mongoose = require("mongoose");
const Message = require("../models/Message");
const User = require("../models/User");
const message_router = express.Router();

message_router.get("/", async (req, res) => {
	const messages = await Message.find();
	const allMessages = [];
	for (let i of messages) {
		const user = await User.find({ email: i.email });
		// console.log(user);
		const temp = {
			message_details: i,
			user_details: user[0],
		};
		console.log(temp);
		allMessages.push(temp);
	}
	// console.log(allMessages);
	return res.json(allMessages);
});

message_router.delete("/:id", async (req, res) => {
	// console.log(req.params.id)
	await Message.deleteOne({ _id: req.params.id });
	const message = "Message deleted successfully";
	console.log(message);
	res.json({ message });
});

message_router.post('/', async (req, res) => {
	const message = new Message({
		email: req.body.email,
		fullaname: req.body.fullname,
		message: req.body.message,
		type: req.body.type,
	})
	await message.save();
	console.log("Message created and sent to Admin Portal")
})

module.exports = message_router;

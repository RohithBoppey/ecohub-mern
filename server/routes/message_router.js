const express = require("express");
const Message = require("../models/Message");
const User = require("../models/User");
const message_router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
	port: 465, // Port for SMTP (usually 465)
	secure: true, // Usually true if connecting to port 465
	auth: {
		user: process.env.GMAIL, // Your email address
		pass: process.env.GMAIL_PASS, // Password (for gmail, your app password)
		// ⚠️ For better security, use environment variables set on the server for these values when deploying
	},
});
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

message_router.post("/", async (req, res) => {
	const message = new Message({
		email: req.body.email,
		fullname: req.body.fullname,
		message: req.body.message,
		type: req.body.type,
	});
	await message.save();
	const sendEmail = async () => {
		let info = await transporter.sendMail({
			from: '"ECOHUB Mail Service" <ecohub.mern@gmail.com>', // sender address
			to: req.body.email, // list of receivers
			subject: "New Request", // Subject line
			html: `<h1>Hello User</h1>
	    <h3>
	    Hello User, We have received your request for ${req.body.type} : ${message._id}, saying : "${message.message}" 
		Please bear with us until one of our team contacts you.
	    <br /> Thank you and have a great day!</h3>
	    <h4>Ecohub, India</h4>`,
		});

		console.log("Message sent: %s", info.messageId);
	};

	sendEmail();

	console.log("Message created and sent to Admin Portal");
});

message_router.get("/:id", async (req, res) => {
	console.log(req.params.id);
	const msg = await Message.find({ _id: req.params.id });
	// console.log(`req recieved ${msg}`)
	// console.log(msg[0])
	res.json({ message: msg });
	// res.send('Done')
});

message_router.post("/reply", (req, res) => {
	const email = req.body.email;
	const replyValue = req.body.replyValue;

	const sendEmail = async () => {
		let info = await transporter.sendMail({
			from: '"ECOHUB Mail Service" <ecohub.mern@gmail.com>', // sender address
			to: email, // list of receivers
			subject: "Reply to Request", // Subject line
			html: `<h1>Hello User</h1>
	    <h3>
	    Hello User, We are happy to assist you. Our reply is - "${replyValue}"
	    <br /> Thank you and have a great day!</h3>
	    <h4>Ecohub, India</h4>`,
		});

		console.log("Message sent: %s", info.messageId);
	};

	sendEmail();
});

module.exports = message_router;

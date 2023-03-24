const express = require("express");
const mongoose = require("mongoose");
const Message = require("../models/Message");
const User = require("../models/User");
const message_router = express.Router();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
	port: 465, // Port for SMTP (usually 465)
	secure: true, // Usually true if connecting to port 465
	auth: {
		user: "ecohub.v3@gmail.com", // Your email address
		pass: "gqvozdspfmcxvwif", // Password (for gmail, your app password)
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

message_router.get('/:id', async (req, res) => {
	console.log(req.params.id)
	const msg = await Message.find({ _id: req.params.id });
	// console.log(`req recieved ${msg}`)
	// console.log(msg[0])
	console.log(msg[0])
	res.json({ message: msg })

	// res.send('Done')
})

message_router.post('/reply',async (req,res)=>{
	const messagevalue=req.body.replyValue;
	const email=req.body.email;
	console.log(email)
	console.log(messagevalue)
	let info = await transporter.sendMail({
		from: '"ECOHUB Mail Service" <ecohub.mern@gmail.com>', // sender address
		to: email, // list of receivers
		subject: "Reply to your query", // Subject line
		html: `<h1>Hello User</h1>
	    <h3>
	   ${messagevalue}
	    <br /> Thank you and have a great day!</h3>
	    <h4>Ecohub, India</h4>`,
	});
 
	console.log("Message sent: %s", info.messageId);

	if(info){
		await Message.deleteOne({ email:req.body.email});
		res.send('reply sent'); 
	}
	else{
		res.send('reply not sent')
	}
})

module.exports = message_router;

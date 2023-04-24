const express = require("express");
const Message = require("../models/Message");
const User = require("../models/User");
const message_router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const redisClient = require("../redis/redis");

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

const cacheKey = "all-messages";

message_router.get("/", async (req, res) => {
	let allMessages = [];
	const cacheKey = "all-messages";
	let clients = await redisClient.get(cacheKey);
	if (!clients) {
		const messages = await Message.find();
		console.log(messages);
		for (let i of messages) {
			const user = await User.find({ email: i.email });
			const temp = {
				message_details: i,
				user_details: user[0],
			};
			allMessages.push(temp);
		}
		redisClient.set(cacheKey, JSON.stringify(allMessages));
		console.log("Set into Redis client");
	} else {
		console.log("Retreived from Redis client");
		allMessages = clients;
		allMessages = JSON.parse(allMessages);
	}
	res.json(allMessages);
});

message_router.delete("/:id", async (req, res) => {
	await Message.deleteOne({ _id: req.params.id });
	const message = "Message deleted successfully";
	console.log(message);
	redisClient.del(cacheKey, function (err, response) {
		if(err){
			console.log(err);
			return;
		}else{
			console.log(response);
		}
	});
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
			Hello User, We have received your request for <u>${req.body.type}</u> : ${message._id}, saying : "${message.message}" 
			Please bear with us until one of our team contacts you.
			<br /> Thank you and have a great day!</h3>
			<h4>Ecohub, India</h4>`,
		});
		
		console.log("Message sent: %s", info.messageId);
		res.send();
	};
	
	sendEmail();
	
	redisClient.del(cacheKey, function (err, response) {
		if(err){
			console.log(err);
			return;
		}else{
			console.log(response);
		}
	});
	console.log("Message created and sent to Admin Portal");
	const messageinfo = "Message created and sent to Admin Portal";
	console.log(messageinfo);
	res.json({ messageinfo });
});

message_router.get("/:id", async (req, res) => {
	console.log(req.params.id);
	const msg = await Message.find({ _id: req.params.id });
	// console.log(`req recieved ${msg}`)
	// console.log(msg[0])
	res.json({ message: msg });
	// res.send('Done')
});

message_router.get("/:id", async (req, res) => {
	console.log(req.params.id);
	const msg = await Message.find({ _id: req.params.id });
	console.log(msg[0]);
	res.json({ message: msg });
});

message_router.post("/reply", async (req, res) => {
	const messagevalue = req.body.replyValue;
	const email = req.body.email;
	console.log(email);
	console.log(messagevalue);
	let info = await transporter.sendMail({
		from: '"ECOHUB Mail Service" <ecohub.mern@gmail.com>', // sender address
		to: email, // list of receivers
		subject: "Reply to your query", // Subject line
		html: `
		<h2>Thank you for reaching out to us!</h2>
		<p>
        We have received a request from you saying:
        <span style="color: rgb(165, 122, 13)">
            <i>
                "${req.body.message}"
            </i>
        </span>
		<br />
		<span style="color: rgb(4, 148, 35)">
        	<i>
           		"${messagevalue}"
        	</i>
    	</span>
    	</p>
	    <h3>
	    <br /> Thank you and have a great day!</h3>
	    <h4>Ecohub, India</h4>`,
	});

	console.log("Message sent: %s", info.messageId);

	redisClient.del(cacheKey, function (err, response) {
		if(err){
			console.log(err);
			return;
		}else{
			console.log(response);
		}
	});

	if (info) {
		await Message.deleteOne({ email: req.body.email });
		res.send("reply sent");
	} else {
		res.send("reply not sent");
	}
});

module.exports = message_router;

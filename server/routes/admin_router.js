const express = require("express");
const Admin = require("../models/Admin");
const User = require("../models/User");
const admin_router = express.Router();
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

const auth = {
	auth: {
		api_key: "cef7a9a66a4c0f147db2df9edb2cc5f7-30344472-0e4d2777",
		domain: "sandbox4b30c1e271dd4abeb71188792e232645.mailgun.org",
	},
};

admin_router.get("/", async (req, res) => {
	// console.log("in req")
	const users = await Admin.find();
	res.json(users);
});

admin_router.post("/announce", async (req, res) => {
	const users = await User.find();

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

	const sendEmail = async (email) => {
		let info = await transporter.sendMail({
			from: '"ECOHUB Mail Service" <ecohub.mern@gmail.com>', // sender address
			to: email, // list of receivers
			subject: "Important Announcement", // Subject line
			html: `<h1>Hi There! We are back with an announcement!</h1>
		<h3>
		<br />
		${req.body.announcementValue} <br /> 
		Browse! Buy! Repeat! <br />
		<br /> Thank you and have a great day!</h3>
		<h4>Ecohub, India</h4>`,
		});

		console.log("Message sent: %s", info.messageId);
	};

	for (let user of users) {
		// console.log(user.email);
		sendEmail(user.email);
	}

	res.sendStatus(200);
});

module.exports = admin_router;

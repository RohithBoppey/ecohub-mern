const express = require("express");
const mailer_router = express.Router();

const totp = require("totp-generator");
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

let verifytoken = "";
let verifyemail = "";

mailer_router.post("/getotp", (req, res) => {
	const token = totp("JBSWY3DPEHPK3PXP", {
		algorithm: "SHA-512",
		digits: 6,
		period: 10,
	});
	console.log(token);
	verifytoken = token;
	verifyemail = req.body.email;
	console.log(verifyemail);

	const nodemailerMailgun = nodemailer.createTransport(mg(auth));

	nodemailerMailgun.sendMail(
		{
			from: "ecohub.mern@gmail.com",
			to: req.body.email, // An array if you have multiple recipients.
			subject: "Hey you, awesome!",
			//You can use "html:" to send HTML email content. It's magic!
			html: `<h1>Hello User</h1>
	    <h3>
	    Hello User, Here is your OTP: ${token}, Please enter the otp before it expires in next 3 minutes
	    <br /> Thank you and have a great day!</h3>
	    <h4>Ecohub, India</h4>`,
		},
		(err, info) => {
			if (err) {
				console.log(`Error: ${err}`);
			} else {
				console.log(`Response: ${info}`);
			}
		}
	);

	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
		port: 465, // Port for SMTP (usually 465)
		secure: true, // Usually true if connecting to port 465
		auth: {
			user: "ecohub.mern@gmail.com", // Your email address
			pass: "tqesadbuhhysfbax", // Password (for gmail, your app password)
			// ⚠️ For better security, use environment variables set on the server for these values when deploying
		},
	});

	res.send("otp sent");
});

mailer_router.post("/verifyotp", (req, res) => {
	// console.log("verifyotp");
	let response = {
		status: false,
		message: "",
	};

	if (verifytoken.length === 0) {
		response = {
			status: false,
			message: "Unauthorized OTP",
		};
	}
	if (req.body.otp == verifytoken && req.body.email == verifyemail) {
		response = {
			status: true,
			message: "OTP Validation successsful!",
		};
	} else if (req.body.otp == verifytoken && req.body.email != verifyemail) {
		response = {
			status: false,
			message: "Enter your OTP using correct Email",
		};
	} else {
		response = {
			status: false,
			message: "Please enter the valid and correct OTP",
		};
	}
	res.send(response);
});

console.log(verifytoken);

module.exports = mailer_router;

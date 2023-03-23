const express = require("express");
const Admin = require("../models/Admin");
const User = require("../models/User");
const admin_router = express.Router();
const nodemailer = require('nodemailer');
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

admin_router.post("/announce",async(req,res)=>{
	console.log('req recieved')
	console.log(req.body.announcementValue)
	const nodemailerMailgun = nodemailer.createTransport(mg(auth));

	const users = await User.find();

	let len=users.length;

	while(len!=0){
		nodemailerMailgun.sendMail(
			
			{
				from: "ecohub.mern@gmail.com",
				to: users[`${len-1}`].email, // An array if you have multiple recipients.
				subject: "Hey you, awesome!",
				//You can use "html:" to send HTML email content. It's magic!
				html: `<h1>Ecohub..</h1>
        <h3>
        ${req.body.announcementValue}
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
		len--;
	}

	res.sendStatus(200)

})

module.exports = admin_router;

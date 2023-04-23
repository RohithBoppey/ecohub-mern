const express = require("express");
const cab_router = express.Router();
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

cab_router.post("/new-request", (req, res) => {
	const { bookingDetails, userDetails } = req.body;
	console.log(req.body);

	const sendEmail = async () => {
		let info = await transporter.sendMail({
			from: '"ECOHUB Mail Service" <ecohub.mern@gmail.com>', // sender address
			to: userDetails.email, // list of receivers
			subject: "New Cab Request", // Subject line
			html: `
            <h1>Hello User</h1>
            <h3>
                Hello User, We have received your request for <u>EV Cab service</u>.
                Please bear with us until one of our team contacts you.
                <br /> Thank you and have a great day!
            </h3>
            <h4>Please find your entered details:</h4>
            <table>
                <tr>
                    <th>From</th>
                    <td><b>${bookingDetails.from}</b></td>
                </tr>
                <tr>
                    <th>To</th>
                    <td><b>${bookingDetails.to}</b></td>
                </tr>
                <tr>
                    <th>Selected Mode of Transport</th>
                    <td><b>${bookingDetails.selectedCar}</b></td>
                </tr>
                <tr>
                    <th>Phone Number</th>
                    <td><b>${bookingDetails.phoneNumber}</b></td>
                </tr>
                <tr>
                    <th>Fullname</th>
                    <td><b>${userDetails.fullname}</b></td>
                </tr>
            </table>
            <h4>Ecohub, India</h4>
            `,
		});

		console.log("Message sent: %s", info.messageId);
	};

	sendEmail();
	res.sendStatus(200);
});

module.exports = cab_router;

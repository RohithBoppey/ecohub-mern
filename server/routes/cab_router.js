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

const returnDate = (dateString) => {
	const date = new Date(dateString);
	console.log(date.toLocaleString());
	return date.toLocaleString();
};

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
            <style>
                table,
                th,
                td {
                    border: 1px solid black;
                }
                th{
                    padding: 8px;
                    padding-right: 20px;
                }
                td{
                    padding: 8px;
                    padding-left: 20px;
                }
            </style>
            <table style = 'border: 1px solid black; font-family: Arial, Helvetica, sans-serif;'>
            <tr>
                <th style = 'padding: 10px; padding-right: 30px'>From</th>
                <td ><b>${bookingDetails.from}</b></td>
            </tr>
            <tr>
                <th style = 'padding: 10px; padding-right: 30px'>To</th>
                <td><b>${bookingDetails.to}</b></td>
            </tr>
            <tr>
                <th style = 'padding: 10px; padding-right: 30px'>Selected Time</th>
                <td><b>${returnDate(bookingDetails.selectedTime)}</b></td>
            </tr>
            <tr>
                <th style = 'padding: 10px; padding-right: 30px'>Selected Mode of Transport</th>
                <td><b>${bookingDetails.selectedCar}</b></td>
            </tr>
            <tr>
                <th style = 'padding: 10px; padding-right: 30px'>Phone Number</th>
                <td><b>${bookingDetails.phoneNumber}</b></td>
            </tr>
            <tr>
                <th style = 'padding: 10px; padding-right: 30px'>Fullname</th>
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

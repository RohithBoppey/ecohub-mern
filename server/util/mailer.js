const nodemailer = require("nodemailer");
// Import NodeMailer (after npm install)

async function mailerFunction(details) {
	// details would be of format

	/*
		details = {
			email: email,
			type_of_email: 'Welcome', 'New message',
			required_info: other data types, etc...
		}
	*/

	// Async function enables allows handling of promises with await

	// First, define send settings by creating a new transporter:
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

	// Define and send message inside transporter.sendEmail() and await info about send from promise:

	const getSubject = (subject, req_type) => {
		if (subject === "welcome") {
			return "Welcome to ECOHUB! Thank you for creating the account.";
		}
		if (subject === "new_request") {
			return `We have received a new request for ${req_type} from you`;
		}
	};

	const getHTML = (subject, others) => {
		if (subject === "welcome") {
			return `
			<h1>Welcome to ECOHUB!</h1>
			<h3>
			We feel lucky to have you here. Thank you for registering! <br />
			 Your user ID would be: <i><u>${others.user_id}</u></i>. <br />
			  You can use this <i>ID</i> or <i>your Email</i> for contacting us while needed! 
			<br /> Thank you and have a great day!</h3>
			<h4>Ecohub, India</h4>`;
		}
	};

	let info = await transporter.sendMail({
		from: '"ECOHUB, India" <ecohub.mern@gmail.com>',
		to: details.email,
		subject: getSubject(details.type_of_email, details.req_type),
		html: getHTML(details.type_of_email, details.others),
	});

	console.log(info.messageId); // Random ID generated after successful send (optional)
}

module.exports = mailerFunction;

// main().catch((err) => console.log(err));

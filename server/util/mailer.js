const Sib = require("sib-api-v3-sdk");

const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
    email: 'thatanjan@gmail.com',
    name: 'Anjan',
}

const sendWelcomeEmail = (receiver) => {
	tranEmailApi
		.sendTransacEmail({
			sender,
			to: receiver,
			subject: "Subscribe to Cules Coding to become a developer",
			htmlContent: `
			<h1>Cules Coding</h1>
			<a href="https://cules-coding.vercel.app/">Visit {{params.role}} </a>
					`,
			params: {
				role: "Frontend",
			},
		})
		.then(console.log)
		.catch(console.log);
};

module.exports = { sendWelcomeEmail };

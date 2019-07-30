import * as SparkPost from "sparkpost";

export const sendEmail = async (
	recipient: string,
	url: string
	// linkText: string
) => {
	const client = new SparkPost(process.env.SPARKPOST_API_KEY);
	client.transmissions
		.send({
			content: {
				from: "ktichmann@sparkpost.com",
				subject: `Confirm Email`,
				html: `
	        <html>
	            <body>
	                <p>Please confirm your email by clicking the link below: </p>
	                <a href="${url}">Click here to Activate your account</a>
	            </body>
	        </html>`
			},
			recipients: [{ address: recipient }]
		})
		.then(() => {
			console.log("Woohoo! You just sent your first mailing!");
		})
		.catch(err => {
			console.log("wrong");
			console.log(err);
		});
	// console.log("Sending Email! \n", recipient, url, linkText);
};

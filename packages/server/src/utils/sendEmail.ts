// import * as SparkPost from "sparkpost";
export const sendEmail = async (
	recipient: string,
	url: string,
	linkText: string
) => {
	// const client = new SparkPost(process.env.SPARKPOST_API_KEY);
	// const response = await client.transmissions.send({
	// 	options: { sandbox: true },
	// 	content: {
	// 		from: "testing@sparkpostbox.com",
	// 		subject: `Confirm Email`,
	// 		html: `
	//         <html>
	//             <body>
	//                 <p>Please confirm your email by clicking the link below: </p>
	//                 <a href="${url}">Click here to Activate your account</a>
	//             </body>
	//         </html>`
	// 	},
	// 	recipients: [{ address: recipient }]
	// });
	console.log("Sending Email! \n", recipient, url, linkText);
};

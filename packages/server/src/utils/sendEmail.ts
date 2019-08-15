import * as nodemailer from "nodemailer";

export const sendEmail = async (
	recipient: string,
	url: string,
	linkText: string
) => {
	console.log(url);
	const transporter = nodemailer.createTransport({
		service: "gmail",
		secure: false,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		},
		tls: {
			rejectUnauthorized: false
		}
	});
	const mailOptions = {
		from: process.env.EMAIL_USERNAME,
		to: recipient,
		subject: `From The Snippet Team`,
		html: `
		<html>
		<body>
			<p>${linkText}</p>
			<a href="${url}">Click here to Activate your account</a>
		</body>
	</html>`
	};

	transporter.sendMail(mailOptions, (err: any, info: any) => {
		if (err) {
			console.log(err);
		} else {
			console.log(info);
		}
	});
	// console.log("Sending Email! \n", recipient, url, linkText);
};

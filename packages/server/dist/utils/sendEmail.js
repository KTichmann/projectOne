"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
exports.sendEmail = (recipient, url, linkText) => __awaiter(this, void 0, void 0, function* () {
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
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(info);
        }
    });
});
//# sourceMappingURL=sendEmail.js.map
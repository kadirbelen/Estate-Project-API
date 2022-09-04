const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const sendEmail = async (user, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASSWORD,
            },
        });

        const handlebarOptions = {
            viewEngine: {
                extName: ".hbs",
                partialsDir: "src/views/emails",
                defaultLayout: false,
            },
            viewPath: "src/views/emails",
            extName: ".hbs",
        };
        transporter.use("compile", hbs(handlebarOptions));

        await transporter.sendMail({
            from: process.env.GMAIL,
            to: user.email,
            subject,
            template: "emailVerify",
            context: {
                userName: user.userName,
                actionUrl: text,
            },
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log("email don't sent");
        console.log(error);
    }
};

module.exports = sendEmail;

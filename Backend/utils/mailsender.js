    const nodemailer = require("nodemailer");
    require("dotenv").config();

    const mailsender = async (email, title, body) => {
    try {

        const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,           // REQUIRED
        secure: false,      // TLS
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        });

        const info = await transporter.sendMail({
        from: `"Syncode" <${process.env.MAIL_USER}>`,
        to: email,
        subject: title,
        html: body,
        });

        return info;
    }
    catch (err) {
        console.error("Mail Error:", err);
    }
    };

    module.exports = mailsender;

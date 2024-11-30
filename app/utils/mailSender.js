import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendMailChangePassword = async (to, subject, text, resetUrl) => {
    const templatePath = path.resolve('app/template/emailTemplate.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    html = html.replace('{{resetUrl}}', resetUrl);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }
};

export default sendMailChangePassword;
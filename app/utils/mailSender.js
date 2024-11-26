import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendMail = async (to, subject, text, resetCode) => {
    const templatePath = path.resolve('../template/emailTemplate.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    html = html.replace('{{resetCode}}', resetCode);

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

export default sendMail;
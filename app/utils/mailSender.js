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

const sendMail = async (to, subject, text, resetCode) => {
    const templatePath = path.resolve('app/template/emailTemplate.html');
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
        console.log('EMAIL_USER:', process.env.EMAIL_USER);
        console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
        console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
        console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }
};

export default sendMail;
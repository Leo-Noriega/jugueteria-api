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

const sendMailPaymentSuccess = async (to, subject, text, pedido, fecha, nombre, direccion, estado, cp, total) => {
    const templatePath = path.resolve('app/template/emailTemplatePayment.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    html = html.replace('{{pedido}}', pedido);
    html = html.replace('{{fecha}}', fecha); 
    html = html.replace('{{nombre}}', nombre);
    html = html.replace('{{direccion}}', direccion);
    html = html.replace('{{estado}}', estado);
    html = html.replace('{{cp}}', cp);
    html = html.replace('{{total}}', total);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Correo enviado correctamente");
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }

};
const sendMailPaymentWithOxxo = async (to, subject, text, data) => {};  

const sendMailReturnProduct = async (to, subject, text, data) => {};

export {
    sendMailChangePassword,
    sendMailPaymentSuccess,
    sendMailPaymentWithOxxo,
    sendMailReturnProduct
};
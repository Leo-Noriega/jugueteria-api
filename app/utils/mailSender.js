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

const sendMailRegistrationConfirmation = async (to, subject, nombre) => {
    const templatePath = path.resolve('app/template/emailRegister.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    html = html.replace('{{nombre}}', nombre);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Correo de confirmación de registro enviado correctamente");
    } catch (error) {
        console.error("Error al enviar el correo de confirmación de registro:", error);
    }
};

const sendMailPaymentWithOxxo = async (to, subject, text, data) => {};  

const sendMailReturnProductSuccess = async (to, subject, text, status) => {
    const templatePath = path.resolve('app/template/emailReturnSuccess.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    html = html.replace('{{status}}', status);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Correo de devolución enviado correctamente");
    } catch (error) {
        console.error("Error al enviar el correo de devolución:", error);
    }
};

const sendMailReturnProductFailed = async (to, subject, text, status, rejection_reason) => {
    const templatePath = path.resolve('app/template/emailReturnFailed.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    html = html.replace('{{status}}', status);
    html = html.replace('{{rejection_reason}}', rejection_reason);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Correo de devolución enviado correctamente");
    } catch (error) {
        console.error("Error al enviar el correo de devolución:", error);
    }
};

export {
    sendMailChangePassword,
    sendMailPaymentSuccess,
    sendMailRegistrationConfirmation,
    sendMailPaymentWithOxxo,
    sendMailReturnProductSuccess,
    sendMailReturnProductFailed
};
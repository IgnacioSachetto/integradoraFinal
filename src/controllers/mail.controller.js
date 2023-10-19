import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import CustomError from '../services/errors/custom-error.js';
import EErrors from '../services/errors/enums.js';
import { selectedLogger } from '../utils/logger.js';

dotenv.config();

export const mailController = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASS,
  },
});

export async function sendPurchaseConfirmationEmail(ticket) {
  try {
    const result = await mailController.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: 'nachosachetto1998@hotmail.com', // Cambia esta dirección de correo electrónico según tus necesidades
      subject: "Compra Realizada",
      html: `
        <div>
          <h1>Compra Realizada</h1>
          <p>¡Felicitaciones por tu compra!</p>
          <p>Ticket detalles:</p>
          <ul>
            <li>Código: ${ticket.code}</li>
            <li>Fecha y Hora de Compra: ${ticket.purchase_datetime}</li>
            <li>Comprador: ${ticket.purchaser}</li>
          </ul>
        </div>
      `,
    });

    selectedLogger.info(result);
    selectedLogger.info("Email sent successfully");
  } catch (e) {
    CustomError.createError({
      name: 'Error Envio Mail',
      cause: 'Ocurrió un error inesperado enviando su notificación',
      message: 'Error inesperado en el servidor. Por favor, contacta al equipo de soporte.',
      code: EErrors.MAIL_SEND_ERROR,
    });
  }
}

export async function sendMailRecovery({ email, token }) {
  try {
    const result = await mailController.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: 'nachosachetto1998@hotmail.com',
      subject: "Recuperación de Contraseña",
      html: `
        <div>
          <h1>Recuperación de Contraseña</h1>
          <p>Tu código para cambiar la contraseña es: ${token}</p>
          <a href="${process.env.API_URL}/recover-pass?token=${token}&email=${email}">Cambiar contraseña</a>
        </div>
      `,
    });

    selectedLogger.info(result);
    selectedLogger.info("Email sent successfully");
  } catch (e) {
    CustomError.createError({
      name: 'Error Envío de Correo de Recuperación',
      cause: 'Ocurrió un error inesperado enviando su notificación de recuperación de contraseña',
      message: 'Error inesperado en el servidor. Por favor, contacta al equipo de soporte.',
      code: EErrors.MAIL_SEND_ERROR,
    });
  }
}

export async function sendDeletedProduct(deletedProduct) {
  try {
    const result = await mailController.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: 'nachosachetto1998@hotmail.com',
      subject: "Producto Borrado",
      html: `
        <div>
          <h1>Producto Borrado</h1>
          <p>Detalle Producto:</p>
          <ul>
            <li>Código: ${deletedProduct.title}</li>
            <li>Código: ${deletedProduct._id}</li>
          </ul>
        </div>
      `,
    });

    selectedLogger.info(result);
    selectedLogger.info("Email sent successfully");
  } catch (e) {
    CustomError.createError({
      name: 'Error Envio Mail',
      cause: 'Ocurrió un error inesperado enviando su notificación',
      message: 'Error inesperado en el servidor. Por favor, contacta al equipo de soporte.',
      code: EErrors.MAIL_SEND_ERROR,
    });
  }
}

export async function sendDeletedUserEmail(email) {
  try {
    const result = await mailController.sendMail({
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: 'Cuenta Eliminada por Inactividad',
      html: `
        <div>
          <h1>Cuenta Eliminada por Inactividad</h1>
          <p>Tu cuenta ha sido eliminada debido a la inactividad durante los últimos 2 días.</p>
          <p>Si esto fue un error o deseas recuperar tu cuenta, contáctanos.</p>
        </div>
      `,
    });

    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error al enviar el correo:', error);

    CustomError.createError({
      name: 'Error Envío de Correo',
      cause: 'Ocurrió un error al enviar la notificación por correo electrónico.',
      message: 'Error inesperado al enviar el correo. Por favor, contacta al equipo de soporte.',
      code: EErrors.MAIL_SEND_ERROR,
    });
  }
}

export async function sendUsersDeleted(email) {
  try {
    const result = await mailController.sendMail({
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: 'Usuarios Eliminados por Inactividad',
      html: `
        <div>
          <h1>Usuarios Eliminados por Inactividad</h1>
          <p>Tu cuenta ha sido eliminada debido a la inactividad durante los últimos 2 días.</p>
          <p>Si esto fue un error o deseas obtener más información, contáctanos.</p>
        </div>
      `,
    });

    console.log('Email sent to deleted user successfully:', result);
  } catch (error) {
    console.error('Error al enviar el correo a usuario eliminado:', error);

    CustomError.createError({
      name: 'Error Envío de Correo a Usuario Eliminado',
      cause: 'Ocurrió un error al enviar la notificación por correo electrónico al usuario eliminado.',
      message: 'Error inesperado al enviar el correo al usuario eliminado. Por favor, contacta al equipo de soporte.',
      code: EErrors.MAIL_SEND_ERROR,
    });
  }
}

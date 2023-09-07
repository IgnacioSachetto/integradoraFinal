import { randomBytes } from 'crypto';
import recoveryService from '../services/recovery.service.js';
import { sendMailRecovery } from './mail.controller.js';

class RecoveryMailController {
  async checkEmail(req, res) {
    try {
      const { email } = req.body;

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Correo electrónico no válido' });
      }

      const emailExistsInDatabase = await recoveryService.checkEmailInDatabase(email);

      if (!emailExistsInDatabase) {
        return res.status(400).json({ error: 'El correo electrónico no existe en la base de datos' });
      }

      const token = randomBytes(20).toString('hex');
      const expire = Date.now() + 3600000;

      await recoveryService.saveTokenToDatabase(email, token, expire);

      console.log(email, token);

      await sendMailRecovery({ email, token });

      // Envía una respuesta de éxito al cliente
      res.status(200).json({ message: 'Verifique su correo electrónico para continuar' });

    } catch (error) {
      // Manejar errores aquí
      console.error(error);

      res.status(500).json({ error: 'Hubo un problema al procesar la solicitud de recuperación de contraseña' });
    }
  }
}

export default new RecoveryMailController();

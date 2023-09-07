import recoveryService from '../services/recovery.service.js';



export async function recoverPasswordGet(req, res) {
  try {
    const { token, email } = req.query;

    const isTokenValid = await recoveryService.checkTokenValidity(token, email);

    if (isTokenValid) {
      res.render('recover-pass', { token, email });
    } else {
      res.render('error', { errorMsg: 'Token expirado o inválido' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un problema al procesar la solicitud de recuperación de contraseña' });
  }
}

export async function recoverPasswordPost(req, res) {
    let { token, email, password } = req.body;
    const updatedUser = await recoveryService.recoverPasswordPost(token, email, password);
    if (updatedUser) {
      res.redirect('/');
    } else {
      res.render('error', { errorMsg: 'token expiro o token invalido' });
    }
  }

import CustomError from '../services/errors/custom-error.js';
import EErrors from '../services/errors/enums.js';
import { userService } from '../services/users.service.js';
class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      if (users.length !== 0) {
        return res.status(200).json({
          status: 'success',
          msg: 'listado de usuarios',
          data: users,
        });
      } else {
        CustomError.createError({
          name: 'Error Entrada Invalida',
          cause: 'Parametros Faltantes o incorrectos.',
          message: 'Algunos de los parámetros requeridos están ausentes o son incorrectos para completar la petición.',
          code: EErrors.INVALID_INPUT_ERROR,
        });
      }
    } catch (e) {
      CustomError.createError({
        name: 'Error Del Servidor',
        cause: 'Ocurrió un error inesperado en el servidor. La operación no pudo completarse.',
        message: 'Lo sentimos, ha ocurrido un error inesperado en el servidor. Por favor, contacta al equipo de soporte.',
        code: EErrors.ERROR_INTERNO_SERVIDOR,
      });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getOneUser(id);
      if (user) {

        return res.status(200).json({
          status: 'success',
          msg: 'usuario encontrado',
          data: user,
        });
      } else {
        CustomError.createError({
          name: 'Error Entrada Invalida',
          cause: 'Parametros Faltantes o incorrectos.',
          message: 'Algunos de los parámetros requeridos están ausentes o son incorrectos para completar la petición.',
          code: EErrors.INVALID_INPUT_ERROR,
        });
      }
    } catch (e) {
      CustomError.createError({
        name: 'Error Del Servidor',
        cause: 'Ocurrió un error inesperado en el servidor. La operación no pudo completarse.',
        message: 'Lo sentimos, ha ocurrido un error inesperado en el servidor. Por favor, contacta al equipo de soporte.',
        code: EErrors.ERROR_INTERNO_SERVIDOR,
      });
    }
  }

  async getOneByDocument(req, res) {
    try {
      const { uid } = req.params;
      const user = await userService.getOneUser(uid);
      if (user) {
        const uid = user._id.toString();

        return res.render('documents', { uid: uid });
      } else {
        CustomError.createError({
          name: 'Error Entrada Invalida',
          cause: 'Parametros Faltantes o incorrectos.',
          message: 'Algunos de los parámetros requeridos están ausentes o son incorrectos para completar la petición.',
          code: EErrors.INVALID_INPUT_ERROR,
        });
      }
    } catch (e) {
      CustomError.createError({
        name: 'Error Del Servidor',
        cause: 'Ocurrió un error inesperado en el servidor. La operación no pudo completarse.',
        message: 'Lo sentimos, ha ocurrido un error inesperado en el servidor. Por favor, contacta al equipo de soporte.',
        code: EErrors.ERROR_INTERNO_SERVIDOR,
      });
    }
  }

  async create(req, res) {
    try {
      const { firstName, lastName, email } = req.body;
      const userCreated = await userService.createUser(firstName, lastName, email);
      return res.status(201).json({
        status: 'success',
        msg: 'user created',
        data: userCreated,
      });
    } catch (e) {
      CustomError.createError({
        name: 'Error Del Servidor',
        cause: 'Ocurrió un error inesperado en el servidor. La operación no pudo completarse.',
        message: 'Lo sentimos, ha ocurrido un error inesperado en el servidor. Por favor, contacta al equipo de soporte.',
        code: EErrors.ERROR_INTERNO_SERVIDOR,
      });
    }
  }


  async createDocument(req, res) {
    try {
      const userId = req.params.uid;
      const user = await userService.getOneUser(userId);

      if (!user) {
        return res.status(404).json({
          status: 'error',
          msg: 'Usuario no encontrado',
        });
      } else {
        const uploadResult = await userService.createDocumentAndUpdateUser(user, req.file);

        return res.status(200).json({
          status: 'success',
          msg: 'Cargado Documento',
          data: uploadResult,
        });
      }
    } catch (error) {
      console.error('Error al subir documentos y actualizar el estado del usuario:', error);
      CustomError.createError({
        name: 'Error Del Servidor',
        cause: 'Ocurrió un error inesperado en el servidor. La operación no pudo completarse.',
        message: 'Lo sentimos, ha ocurrido un error inesperado en el servidor. Por favor, contacta al equipo de soporte.',
        code: EErrors.ERROR_INTERNO_SERVIDOR,
      });
    }
  }


  async update(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName, email } = req.body;
      const userUptaded = await userService.updateUser(id, firstName, lastName, email);
      return res.status(201).json({
        status: 'success',
        msg: 'user uptaded',
        data: userUptaded,
      });
    } catch (e) {
      CustomError.createError({
        name: 'Error Del Servidor',
        cause: 'Ocurrió un error inesperado en el servidor. La operación no pudo completarse.',
        message: 'Lo sentimos, ha ocurrido un error inesperado en el servidor. Por favor, contacta al equipo de soporte.',
        code: EErrors.ERROR_INTERNO_SERVIDOR,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await userService.deleteUser(id);
      return res.status(200).json({
        status: 'success',
        msg: 'user deleted',
        data: deleted,
      });
    } catch (e) {
      CustomError.createError({
        name: 'Error Del Servidor',
        cause: 'Ocurrió un error inesperado en el servidor. La operación no pudo completarse.',
        message: 'Lo sentimos, ha ocurrido un error inesperado en el servidor. Por favor, contacta al equipo de soporte.',
        code: EErrors.ERROR_INTERNO_SERVIDOR,
      });
    }
  }

  async getVistaUsers(req, res) {
    try {
      const allUsers = await userService.getAllUsers();

      res.status(200).render('users-administration', {
        allUsers: allUsers?.map((user) => ({
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          rol: user.rol,
          lastconnection: user.last_connection
        })),
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error al obtener usuarios.' });
    }
  }


  async deleteInactiveUsers(req, res) {
    try {
      const deletedUsers = await userService.deleteInactiveUsers();

      if (deletedUsers.deletedCount > 0) {
        console.log(deletedUsers);
        res.status(200).json({
          status: 'success',
        });
      } else {
        res.status(200).json({ message: 'No se encontraron usuarios inactivos.' });
      }
    } catch (error) {
      console.error('Error al eliminar usuarios inactivos:', error);
      res.status(500).json({ error: 'Error al eliminar usuarios inactivos.' });
    }
  }



  async changerol(req, res) {
    try {
      const { uid } = req.params;
      const changed = await userService.changerol(uid);
      if(changed){
        return res.status(200).json({
          status: 'success',
          msg: 'user rol change',
          data: changed,
        });
      }
    } catch (e) {
      console.log(e)
      CustomError.createError({
        name: 'Error Del Servidor',
        cause: 'Ocurrió un error inesperado en el servidor. La operación no pudo completarse.',
        message: 'Lo sentimos, ha ocurrido un error inesperado en el servidor. Por favor, contacta al equipo de soporte.',
        code: EErrors.ERROR_INTERNO_SERVIDOR,
      });
    }
  }
}




export const userController = new UserController();
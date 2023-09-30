import { modelUsuario } from '../DAO/models/db/users.model.db.js';
//import { modelUsuario } from '../DAO/models/mem/users.model.mem.js';
import CustomError from '../services/errors/custom-error.js';
import EErrors from '../services/errors/enums.js';

class UserService {
  validatePostUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      CustomError.createError({
        name: 'VALDIATION ERROR',
        cause: 'Parametros Faltantes o incorrectos.',
        message: 'os parámetros proporcionados son insuficientes o inválidos para llevar a cabo la creación. Por favor, revisa la información suministrada e intenta nuevamente.',
        code: EErrors.INVALID_INPUT_ERROR,
      });
    }
  }

  validatePutUser(id, firstName, lastName, email) {
    if ((!id, !firstName || !lastName || !email)) {
      CustomError.createError({
        name: 'VALDIATION ERROR',
        cause: 'Parametros Faltantes o incorrectos.',
        message: 'os parámetros proporcionados son insuficientes o inválidos para llevar a cabo la creación. Por favor, revisa la información suministrada e intenta nuevamente.',
        code: EErrors.INVALID_INPUT_ERROR,
      });
    }
  }

  validateId(id) {
    if (!id) {
      CustomError.createError({
        name: 'VALDIATION ERROR',
        cause: 'Parametros Faltantes o incorrectos.',
        message: 'os parámetros proporcionados son insuficientes o inválidos para llevar a cabo la creación. Por favor, revisa la información suministrada e intenta nuevamente.',
        code: EErrors.INVALID_INPUT_ERROR,
      });
    }
  }
  async getAllUsers() {
    const users = await modelUsuario.getAllUsers();
    return users;
  }

  async getOneUser(uid) {
    const user = await modelUsuario.getOneUser(uid);
    return user;
  }

  async getOneUser(email) {
    const user = await modelUsuario.getOneUser(email);
    return user;
  }

  async createUser(firstName, lastName, email) {
    this.validatePostUser(firstName, lastName, email);
    const userCreated = await modelUsuario.createUser(firstName, lastName, email);
    return userCreated;
  }

  async changerol(uid) {
    try {
      const user = await this.getOneUser(uid);

      if (!user) {
        return null;
      }

      if (user.rol === 'premium') {
        return user;
      }

      const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
      const multerFolders = ['profile', 'product', 'document'];

      const hasRequiredDocuments = multerFolders.some(folder => {
        return requiredDocuments.every(documentName =>
          user.documents.some(document => document.reference.includes(`src/multer/${folder}/`) && document.name.includes(documentName))
        );
      });

      if (hasRequiredDocuments) {
        user.rol = 'premium';
        const updatedUser = await this.updateUser(uid, user.firstName, user.lastName, user.email, user.rol);
        return updatedUser;
      } else {
        return false;
      }
    } catch (error) {
      console.error('El usuario no ha terminado de cargar su documentación', error);
      throw error;
    }
  }

  async updateUser(id, firstName, lastName, email) {
    this.validatePostUser(id, firstName, lastName, email);
    const userUptaded = await modelUsuario.updateUser(id, firstName, lastName, email);
    return userUptaded;
  }

  async createDocumentAndUpdateUser(user) {
    try {
      user.hasUploadedDocuments = true;
      await user.save();
      return 'Documentos subidos exitosamente';
    } catch (error) {
      throw new Error('Error al subir documentos y actualizar el estado del usuario');
    }
  }

  async deleteUser(id) {
    this.validateId(id);
    const deleted = await modelUsuario.deleteUser(id);
    return deleted;
  }
}

export const userService = new UserService();
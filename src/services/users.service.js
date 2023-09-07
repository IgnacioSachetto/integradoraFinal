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

  async getOneUser(id) {
    const user = await modelUsuario.getOneUser(id);
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

  async updateUser(id, firstName, lastName, email) {
    this.validatePostUser(id, firstName, lastName, email);
    const userUptaded = await modelUsuario.updateUser(id, firstName, lastName, email);
    return userUptaded;
  }

  async deleteUser(id) {
    this.validateId(id);
    const deleted = await modelUsuario.deleteUser(id);
    return deleted;
  }
}

export const userService = new UserService();
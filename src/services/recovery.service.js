import { RecoverTokensMongoose } from "../DAO/models/mongoose/recover-codes.model.js";
import { UserModel } from "../DAO/models/mongoose/users.model.js";
import { createHash, isValidPassword } from '../utils/bcrypt.js';

const recoveryService = {
  async checkEmailInDatabase(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      throw new Error('Error al verificar el correo electrónico en la base de datos');
    }
  },

  async saveTokenToDatabase(email, token, expire) {
    try {
      const tokenData = new RecoverTokensMongoose({
        email,
        token,
        expire,
      });
      await tokenData.save();
    } catch (error) {
      throw new Error('Error al guardar el token en la base de datos');
    }
  },

  async checkTokenValidity(token, email) {
    const foundToken = await RecoverTokensMongoose.findOne({ token, email });

    return foundToken && foundToken.expire > Date.now();
  },

  async recoverPasswordPost(token, email, password) {
    const foundToken = await RecoverTokensMongoose.findOne({ token, email });

    if (foundToken && foundToken.expire > Date.now() && password) {
      const PasswordGet = await UserModel.findOne({email},{password});
      if(isValidPassword(password,PasswordGet.password)){
        throw new Error('password is the same');
      } else{
        password = createHash(password);
        const updatedUser = await UserModel.updateOne({ email }, { password });
        return updatedUser;
      }

    } else {
      return null;
    }
  }

};

export default recoveryService;

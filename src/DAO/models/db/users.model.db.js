import { UserModel } from "../mongoose/users.model.js";

class ModelUsuario {
  async getAllUsers() {
    const users = await UserModel.find({});
    return users;
  }

  async getOneUser(id) {
    const user = await UserModel.findOne({_id:id});
    return user;
  }

  async createUser(firstName, lastName, email) {
    const userCreated = await UserModel.create({ firstName, lastName, email });
    return userCreated;
  }
  
  async updateUser(id, firstName, lastName, email, rol) {
    const userUptaded = await UserModel.updateOne({ _id: id }, { firstName, lastName, email, rol });
    return userUptaded;
  }

  async deleteUser(id) {
    const deleted = await UserModel.deleteOne({ _id: id });
    return deleted;
  }
}

export const modelUsuario = new ModelUsuario();
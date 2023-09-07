class ModelUsuario {
  usuarios = [];
  async getAllUsers() {
    const users = this.usuarios;
    return users;
  }

  async getOneUser(id) {
    let user = usuarios.find(u => u.id === id);
    return user;
  }

  async createUser(firstName, lastName, email) {
    const userCreated={
        firstName:firstName,
        lastName:lastName,
        email:email,
        id:Math.random()*100000000
    }
    usuarios.push(userCreated);
    return userCreated;
  }

  async updateUser(id, firstName, lastName, email) {
    let user = usuarios.find(u => u.id === id);
    user.firstName=firstName
    user.lastName=lastName
    user.email=email
    this.usuarios=this.usuarios.filter(u => u.id !== id).push(user)
    return user;
  }

  async deleteUser(id) {
    this.usuarios=this.usuarios.filter(u => u.id !== id)
    return deleted;
  }
}

export const modelUsuario = new ModelUsuario();

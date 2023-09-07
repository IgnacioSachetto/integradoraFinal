class ModelCart {
  carts = [];
  async getAllCarts() {
    const carts = this.carts;
    return carts;
  }

  async getCart(id) {
    let product = carts.find(u => u.id === id);
    return product;
  }

  async createCart(product,userId) {
    cart={
        id:Math.random()*1000000,
        products:[product],
        user:userId
    }
    const cartCreated = carts.push(cart);
    return cartCreated;
  }

  async updateCart(id, products) {
    let cart = this.carts.find(u => u.id === id);
    cart.products=products
    this.carts=this.carts.filter(u => u.id !== id).push(cart)
    return cartCreated;
  }

  async updateCantProd(cid, pid, quantity) {
    const cart = this.carts.find(u => u.id === cid);
    const productoIndex = cart.products.findIndex((prod) => prod.id._id.toString() === pid);
    if (productoIndex !== -1) {
      cart.products[productoIndex].quantity = quantity;
      return await this.updateCart(cid, cart.products);
    }
  }

  async deleteCart(id) {
    const deleted = this.carts.filter(u => u.id !== id);
    return deleted;
  }

  async addProductToCart(cid, pid) {
    const cart = await this.getCart(cid);
    let existingProduct = cart.products.find((p) => p.id === pid);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      let newProduct = {
        id: pid.toString(),
        quantity: 1,
      };
      cart.products.push(newProduct);
    }
    return await this.updateCart(cid, cart.products);
  }

  async deleteProductInCart(cid, pid) {
    const cart = await this.getCart(cid);
    const newproducts = cart.products.filter((p) => p.id !== pid);
    this.updateCart(cid, newproducts);
    return await this.getCart(cid);
  }
}

export const modelCart = new ModelCart();

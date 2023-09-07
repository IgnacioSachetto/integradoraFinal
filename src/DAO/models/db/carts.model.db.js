import { ProductsModel } from '../mongoose/products.model.js';
import { CartsModel } from '../mongoose/carts.model.js';

class ModelCart {
  async getAllCarts() {
    const carts = await CartsModel.find({});
    return carts;
  }

  async getCart(id) {
    const cart = await CartsModel.findById(id).populate({
      path: 'products',
      populate: {
        path: 'id',
        model: ProductsModel,
      },
    });
    return cart;
  }

  async createCart(productsArray, userId) {
    let cart = await this.getCartbyiduser(userId)
    if(!cart){
      cart = await CartsModel.create({
        products: productsArray,
        user: userId,
      });
    }
    return cart;
  }  
  
  async updateCart(id, products) {
    const cartCreated = await CartsModel.updateOne({ _id: id }, { products: products });
    return cartCreated;
  }

  async updateCantProd(cid, pid, quantity) {
    const cart = await this.getCart(cid);
    const productoIndex = cart.products.findIndex((prod) => prod.id._id.toString() === pid);
    if (productoIndex !== -1) {
      cart.products[productoIndex].quantity = quantity;
      return await this.updateCart(cid, cart.products);
    }
  }

  async deleteCart(id) {
    const deleted = await CartsModel.deleteOne({ _id: id });
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
  
  async getCartbyiduser(idUser) {
    const cart = await CartsModel.findOne({ user: idUser });
    return cart;
  }
  
  
}

export const modelCart = new ModelCart();

import express from 'express';
import { cartService } from '../services/carts.service.js';
import { productService } from '../services/products.service.js';

export const routerVistaProducts = express.Router();

routerVistaProducts.get('/', async (req, res) => {
  const limit = req.query.limit || 3;
  const page = req.query.page || 1;
  const query = req.query.query;
  const sort = req.query.sort;
  const requestUrl = req.originalUrl;
  const allProducts = await productService.getAllProducts(limit, page, query, sort);
  const previusLink = await productService.getPrevLink(requestUrl, page, allProducts.hasPrevPage);
  const postLink = await productService.getNextLink(requestUrl, page, allProducts.hasNextPage);
  const firstName = req.session.user?.firstName;
  const lastName = req.session.user?.lastName;
  const email = req.session.user?.email;
  const rol = req.session.user?.rol;
  const cart = await cartService.createCart(req.session.user?._id.toString())

  const foundUser = {
    firstName: firstName,
    lastName: lastName,
    rol: rol,
    email: email,
  };

  res.status(200).render('products', {
    p: allProducts.products.docs?.map((product) => ({
      name: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      id: product._id,
    })),
    pagingCounter: allProducts.pagingCounter,
    page: allProducts.page,
    totalPages: allProducts.totalPages,
    hasPrevPage: allProducts.hasPrevPage,
    hasNextPage: allProducts.hasNextPage,
    prevPage: allProducts.prevPage,
    nextPage: allProducts.nextPage,
    prevLink: previusLink,
    nextLink: postLink,
    user: foundUser,
    cartid: cart._id.toString(),
  });
});

//import { modelProduct } from '../DAO/models/mem/products.model.mem.js';
import { modelProduct } from '../DAO/models/db/products.model.db.js';
import CustomError from '../services/errors/custom-error.js';
import EErrors from '../services/errors/enums.js';
class ProductService {
  validatePostProduct(title, description, code, price, status, stock, category, owner) {
    if (!title || !description || !code || !price || !status || !stock || !category || !owner) {
      CustomError.createError({
        name: 'VALDIATION ERROR',
        cause: 'Parametros Faltantes o incorrectos.',
        message: 'os parámetros proporcionados son insuficientes o inválidos para llevar a cabo la creación. Por favor, revisa la información suministrada e intenta nuevamente.',
        code: EErrors.INVALID_INPUT_ERROR,
      });
    }
  }

  validatePutProduct(id, title, description, code, price, status, stock, category, thumbnails) {
    if (!id || !title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
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

  validateSort(sort) {
    if (sort === 'asc' || sort === 'desc') {
      sort = { price: sort };
    } else {
      sort = {};
    }
    return sort;
  }

  async getAllProducts(limit, page, query, sort, requestUrl) {
    let products = null;
    products = await modelProduct.getAllProducts(limit, page, query, sort);
    const prevlink = await productService.getPrevLink(requestUrl, page, products.hasPrevPage);
    const nextlink = await productService.getNextLink(requestUrl, page, products.hasNextPage);
    const result = {
      products: products,
      nextlink: nextlink,
      prevlink: prevlink,
    };
    return result;
  }

  async getAllProductsWithOwner(limit, page, query, sort, requestUrl, userEmail) {
    let products = null;
    products = await modelProduct.getAllProductsOwner(limit, page, query, sort, userEmail);
    const prevlink = await productService.getPrevLink(requestUrl, page, products.hasPrevPage);
    const nextlink = await productService.getNextLink(requestUrl, page, products.hasNextPage);
    const result = {
      products: products,
      nextlink: nextlink,
      prevlink: prevlink,
    };
    return result;
  }

  async getProduct(id) {
    this.validateId(id);
    const product = await modelProduct.getProduct(id);
    return product;
  }

  async createProduct( owner, title, description, code, price, status, stock, category   ) {
    const products = await modelProduct.getAllProducts();
    let productcreated = null;
    let existcode = products.docs.find((p) => p.code === code);
    if (existcode) {
      return (productcreated = {
        msg: 'codigo duplicado',
        code: 400,
        user: {},
      });
    } else {
      //this.validatePostProduct(title, description, code, price, status, stock, category , owner);
      console.log("anterior : " + owner );
      productcreated = await modelProduct.createProduct(owner, title, description, code, price, status, stock, category );
      return productcreated;
    }
  }

  async updateProduct(id, title, description, code, price, status, stock, category, thumbnails) {
    this.validatePostProduct(id, title, description, code, price, status, stock, category, thumbnails);
    const userUptaded = await modelProduct.updateProduct(id, title, description, code, price, status, stock, category, thumbnails);
    return userUptaded;
  }

  async deleteProduct(id) {
    this.validateId(id);
    const deleted = await modelProduct.deleteProduct(id);
    return deleted;
  }

  async getNextLink(link, page, hasNextPage) {
    if (hasNextPage == true) {
      if (link?.includes('page=')) {
        const regex = /page=(\d+)/;
        const updatedUrl = link.replace(regex, `page=${page - -1}`);
        return 'http://localhost:8080' + updatedUrl;
      } else {
        const updatedUrl = link + `?page=${2}`;
        return 'http://localhost:8080' + updatedUrl;
      }
    } else {
      return null;
    }
  }

  async getPrevLink(link, page, hasPrevPage) {
    if (hasPrevPage == true) {
      if (link.includes('page=')) {
        const regex = /page=(\d+)/;
        const updatedUrl = link.replace(regex, `page=${page - 1}`);
        return 'http://localhost:8080' + updatedUrl;
      }
    } else {
      return null;
    }
  }
}

export const productService = new ProductService();
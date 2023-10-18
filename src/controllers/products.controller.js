import { cartService } from '../services/carts.service.js';
import CustomError from '../services/errors/custom-error.js';
import EErrors from '../services/errors/enums.js';
import { productService } from '../services/products.service.js';
import { generateProduct } from '../utils/productsMocks.js';
class ProductControler {
  async getAll(req, res) {
    try {
      const limit = req.query.limit || 5;
      const page = req.query.page || 1;
      const query = req.query.query;
      const sort = req.query.sort;
      const requestUrl = req.originalUrl;
      const result = await productService.getAllProducts(limit, page, query, sort, requestUrl);
      if (result.products) {
        return res.status(200).json({
          status: 'sucess',
          msg: 'Found productos',
          payload: result.products.docs,
          totalPages: result.products.totalPages,
          prevPage: result.products.prevPage,
          nextPage: result.products.nextPage,
          page: result.products.page,
          hasPrevPage: result.products.hasPrevPage,
          hasNextPage: result.products.hasNextPage,
          prevLink: result.prevlink,
          nextLink: result.nextlink,
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


  async getAllVista  (req, res) {
  try {
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

  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
};

  async getOne(req, res) {
    try {
      const product = await productService.getProduct(req.params.id);
      if (typeof product !== {}) {
        return res.status(200).json({
          status: 'sucess',
          msg: 'product found',
          data: product,
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

  async create(req, res) {
    try {
      const owner = req.user.email
      const { title, description, code, price, status = true, stock, category, thumbnails } = req.body;
      const ProductCreated = await productService.createProduct(title, description, code, price, status, stock, category, thumbnails,owner);
      if (ProductCreated.code === 400) {
        CustomError.createError({
          name: 'Error Entrada Invalida',
          cause: 'Parametros Faltantes o incorrectos.',
          message: 'Algunos de los parámetros requeridos están ausentes o son incorrectos para completar la petición.',
          code: EErrors.INVALID_INPUT_ERROR,
        });
      } else {
        if (ProductCreated !== null) {
          return res.status(201).json({
            status: 'success',
            msg: 'product created',
            data: ProductCreated,
          });
        } else {
          CustomError.createError({
            name: 'Error Creacion',
            cause: 'Parametros Faltantes o incorrectos.',
            message: 'os parámetros proporcionados son insuficientes o inválidos para llevar a cabo la creación. Por favor, revisa la información suministrada e intenta nuevamente.',
            code: EErrors.INVALID_INPUT_ERROR,
          });
        }
      }
    } catch (e) {
      console.log(e);
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
      const { title, description, code, price, status, stock, category, thumbnails } = req.body;
      let productUptaded = await productService.updateProduct(id, title, description, code, price, status, stock, category, thumbnails);
      return res.status(201).json({
        status: 'success',
        msg: 'product updated',
        data: productUptaded,
      });
    } catch (e) {
      console.log(e);
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
      const user = req.user.rol;
      const { id } = req.params;
      let deleted = await productService.deleteProduct(id,user);
      return res.status(200).json({
        status: 'success',
        msg: 'product deleted',
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

  async getProductsByMock(req, res) {
    try {
      const products = [];

      for (let i = 0; i < 100; i++) {
        products.push(generateProduct());
      }
      return res.status(200).json({
        status: 'success',
        msg: 'found all products',
        data: products,
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
}

export const productControler = new ProductControler();
import { cartService } from '../services/carts.service.js';
import CustomError from '../services/errors/custom-error.js';
import EErrors from '../services/errors/enums.js';

class CartController {
  async getAll(req, res) {
    try {
      const limit = req.query.limit || -1;
      const carts = await cartService.getAllCarts();
      if (limit == -1 && carts.length > 0) {
        return res.status(200).json({
          status: 'sucess',
          msg: 'Found all carts',
          data: carts,
        });
      } else if (limit != -1 && carts.length > 0) {
        return res.status(200).json({
          status: 'sucess',
          msg: 'Found ' + limit + ' carts',
          data: carts.slice(0, limit),
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

  async getOne(req, res) {
    try {
      const cart = await cartService.getCart(req.params.id);
      if (typeof cart !== {}) {
        return res.status(200).json({
          status: 'sucess',
          msg: 'Cart found',
          data: cart,
        });
      } else {
        CustomError.createError({
          name: 'Error Entrada Invalida',
          cause: 'Parametros Faltantes o incorrectos.',
          message: 'Algunos de los parámetros requeridos están ausentes o son incorrectos para completar la petición.',
          code: EErrors.UPDATE_ERROR,
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

  async update(req, res) {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      const cart = await cartService.updateCart(cid, products);
      if (cart !== null) {
        return res.status(200).json({
          status: 'success',
          msg: 'product in cart updated',
          data: cart,
        });
      } else {
        CustomError.createError({
          name: 'Error en Actualizacion',
          cause: 'Parametros Invalidos.',
          message: 'Se encontraron problemas con los parámetros proporcionados para la actualización. Por favor, verifica la información e inténtalo nuevamente.',
          code: EErrors.ERROR_INTERNO_SERVIDOR,
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

  async updateProductoToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.updateCantProd(cid, pid, quantity);
      if (cart) {
        return res.status(200).json({
          status: 'success',
          msg: 'product quantity updated',
          data: cart,
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

  async deleteCart(req, res) {
    try {
      const cid = req.params.cid;
      let products = new Array();
      const cart = await cartService.updateCart(cid, products);
      if (cart !== null) {
        return res.status(200).json({
          status: 'success',
          msg: 'products deleted in cart',
          data: cart,
        });
      } else {
        CustomError.createError({
          name: 'Error al Eliminar',
          cause: 'Parametros Invalidos',
          message: 'Se encontraron problemas con los parámetros proporcionados para eliminar. Por favor, verifica la información e inténtalo nuevamente.',
          code: EErrors.DELETE_ERROR,
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

  async deleteProductInCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.deleteProductInCart(cid, pid);
      if (cart !== null) {
        return res.status(200).json({
          status: 'success',
          msg: 'product deleted in cart',
          data: cart,
        });
      } else {
        CustomError.createError({
          name: 'Error al Eliminar',
          cause: 'Parametros Invalidos',
          message: 'Se encontraron problemas con los parámetros proporcionados para eliminar. Por favor, verifica la información e inténtalo nuevamente.',
          code: EErrors.DELETE_ERROR,
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
      const idusuario = req.user._id;
      const cartCreated = await cartService.createCart(idusuario);
      if (cartCreated !== null) {
        return res.status(201).json({
          status: 'success',
          msg: 'cart created',
          data: cartCreated,
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

  async addProductoToCart(req, res) {
    try {
      const email = req.user.email;
      const { cid, pid } = req.params;
      const cartUptaded = await cartService.addProductToCart(cid, pid, email);
      if (typeof cart !== {}) {
        return res.status(200).json({
          status: 'sucess',
          msg: 'Product added',
          data: cartUptaded,
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
  async purchase(req, res) {
    try {
      const cid = req.params.cid;
      const email = req.user.email;
      const ticket = await cartService.purchaseCart(cid, email);
      if (ticket !== null) {
        return res.status(200).json({
          status: 'success',
          msg: 'compra realizada',
          data: ticket,
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
        name: 'Error al enviar Ticket',
        cause: 'Ocurrió un error inesperado en el envio del ticket. La operación no pudo completarse.',
        message: 'Lo sentimos, ha ocurrido un error inesperado en el envio de ticket. Por favor, contacta al equipo de soporte.',
        code: EErrors.ERROR_INTERNO_SERVIDOR,
      });
    }
  }
}

export const cartController = new CartController();
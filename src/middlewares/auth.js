import { modelCart } from "../DAO/models/db/carts.model.db.js";
import Errors from '../services/errors/enums.js';

export function isAmdin(req, res, next) {
  if (true) {
    return next();
  }
  return res.status(401).render('error-page', { msg: 'please log in as ADMIN!' });
}


export function isUser(req, res, next) {
  if (req.session.email) {
    return next();
  }
  return res.status(401).render('error-page', { msg: 'please log in!' });
}

export function isPremium(req, res, next) {
  if (req.session.email) {
    return next();
  }
  return res.status(401).render('error-page', { msg: 'please log in as premium!' });
}

export function isUserNotAdmin(req, res, next) { //falta asignarlo al chat
  if (req.session.email && req.session.admin == false) {
    return next();
  }
  return res.status(401).render('error-page', { msg: 'please log in USER NOT ADMIN!' });
}

export async function isUserOwner(req, res, next) {
  const cart = await modelCart.getCart(req.params.cid);
  if (req.user?.email && req.user?._id.toString()===cart.user?.toString()) {
    return next();
  }
  return res.status(401).render('error-page', { msg: 'please log in AS ADMIN!' });
}

export function checkLogin(req, res, next) {
  try {
    if (req.session?.user?.firstName) {
      return next();
    }
  } catch (e) {
    logger.error(e);
    const isLogin = 'Debes iniciar sesión para acceder a esta página';
    return res.status(201).render('error', { isLogin });
  }
}

export function checkAdmin(req, res, next) {
  if (req.session?.user?.rol == 'admin') {
    return next();
  } else {
    const isAdmin = 'Debes ser administrador para acceder a esta página';
    return res.status(201).render('error', { isAdmin });
  }
}

export function checkUser(req, res, next) {
  if (req.session?.user?.rol == 'user') {
    return next();
  } else {
    logger.error('Debes ser usuario para realizar esta acción.');
    const isUser = 'Debes ser usuario para realizar esta acción.';
    return res.status(201).render('error', { isUser });
  }
}

export function checkPremium(req, res, next) {
  if (req.session?.user?.rol == 'premium') {
    return next();
  } else {
    logger.error('Debes ser premium para realizar esta acción.');
    const isUser = 'Debes ser premium para realizar esta acción.';
    return res.status(201).render('error', { isPremium });
  }
}

export function checkPremiumAdmin(req, res, next) {
  if (req.session?.user?.rol == 'premium' || req.session?.user?.rol == 'admin') {
    return next();
  } else {
    logger.error('Debes ser premium para realizar esta acción.');
    const isUser = 'Debes ser premium para realizar esta acción.';
    return res.status(201).render('error', { isPremium });
  }
}

export async function checkCart(req, res, next) {
  const cartUser = req.session.user.cartId;
  const cartParams = req.params.cid;
  if (cartUser == cartParams) {
    return next();
  } else {
    const notCart = 'El carrito al que quieres acceder no corresponde a tu usuario';
    return res.status(500).render('error', { notCart });
  }
}



export function errorHandler(error, req, res, next) {
  switch (error.code) {
    case Errors.ROUTING_ERROR:
      const notFound = 'Esta página no existe';
      return res.status(404).render('error', { notFound });
    case Errors.ID_ERROR:
      const errorId = 'El ID ingresado no existe';
      return res.status(404).render('error', { errorId });
    default:
      res.status(500).send({ status: 'error', error: 'Unhandled error' });
      break;
  }
}
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import { addLogger, selectedLogger } from './utils/logger.js';

import { iniPassport } from './config/passport.config.js';
import { __dirname } from './dirname.js';
import errorHandler from './middlewares/error.js';
import { routerCarts } from './routes/cart.router.js';
import { routerVistaCart } from './routes/cart.vista.router.js';
import { routerViewChat } from './routes/chatRealTime.router.js';
import { loginRouter } from './routes/login.router.js';
import { routerViewMail } from './routes/mail.router.js';
import { routerProductos } from './routes/products.router.js';
import { routerVistaProducts } from './routes/products.vista.router.js';
import { routerVistaRealTimeProducts } from './routes/realTimeProducts.vista.router.js';
import { routerRecoverMail } from './routes/recoverEmail.router.js';
import { routerRecoverPass } from './routes/recoverPass.router.js';
import { routerUsers } from './routes/users.router.js';
import { viewsRouter } from './routes/views.router.js';
import { connectMongo } from './utils/connections.js';
import { connectSocket } from './utils/socket-server.js';




dotenv.config();

const app = express();

app.use(addLogger);

const port = process.env.PORT;

connectMongo();




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL, ttl: 86400 * 7 }),
    secret: 'coder-secret',
    resave: true,
    saveUninitialized: true,
  })
);

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/api/products', routerProductos);
app.use('/api/carts', routerCarts);
//app.use("/vista/products", routerVistaProductos);
app.use('/vista/realtimeproducts', routerVistaRealTimeProducts);
app.use('/vista/cart', routerVistaCart);
app.use('/api/users', routerUsers);
app.use('/vista/products', routerVistaProducts);
app.use('/', viewsRouter);
app.use('/api/sessions', loginRouter);
app.use('/chatsocket', routerViewChat);
app.use('/mail', routerViewMail);
app.get('/api/sessions/github', passport.authenticate('github', { scope: ['user:email'] }));
app.use('/recover-pass', routerRecoverPass);
app.use('/recover-mail', routerRecoverMail);




app.get('/loggerTest', (req, res) => {
  selectedLogger.error(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`);
  selectedLogger.warning(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`);
  selectedLogger.info(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`);
  selectedLogger.http(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`);
  selectedLogger.verbose(`${req.method} on ${req.url} -${new Date().toLocaleTimeString()}`);
  selectedLogger.debug(`${req.method} on ${req.url} -${new Date().toLocaleTimeString()}`);

  return res.status(200).json({
    status: 'success',
    msg: 'all logs'
  });

});



app.get('/api/sessions/githubcallback', passport.authenticate('github', { failureRedirect: '/error-autentificacion' }), (req, res) => {
  req.session.firstName = req.user.firstName;
  req.session.email = req.user.email;
  res.clearCookie('userId');
  res.cookie('userId', req.user._id, { maxAge: 3600000 });
  res.redirect('/vista/products');
});
app.get('/error-autentificacion', (req, res) => {
  return res.status(400).render('error-page', { msg: 'error al loguear' });
});
app.get('*', (req, res) => {
  return res.status(404).json({
    status: 'Error',
    msg: 'page not found',
    data: {},
  });
});



const httpServer = app.listen(port, () => {
  console.log('Servidor escuchando en el puerto ' + process.env.PORT);
});
connectSocket(httpServer);








app.use(errorHandler);




















app.use(errorHandler)



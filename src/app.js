import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import authRouter from './routes/auth.router.js';

import { iniPassport } from './config/passport.config.js';
import { __dirname } from './dirname.js';
import errorHandler from './middlewares/error.js';
import { connectMongo } from './utils/connections.js';
import { addLogger } from './utils/logger.js';
import { connectSocket } from './utils/socket-server.js';

import MongoStore from 'connect-mongo';
import { loggerTest } from './controllers/logger.controller.js';
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

dotenv.config();
const app = express();
app.use(addLogger);

const port = process.env.PORT;

connectMongo();

const swaggerOptions = {
definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentacion Ecommerce Sachetto',
      description: 'Documentación PF Ecomerce - Coderhouse - Sachetto.',
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use( session({ store: MongoStore.create({ mongoUrl: process.env.MONGO_URL, ttl: 86400 * 7 }),secret: 'coder-secret',resave: true,saveUninitialized: true, }));

iniPassport();
app.use(passport.initialize());
app.use(passport.session());
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/api/products', routerProductos);
app.use('/api/carts', routerCarts);
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
app.get('/loggerTest', loggerTest);
app.use(authRouter);


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

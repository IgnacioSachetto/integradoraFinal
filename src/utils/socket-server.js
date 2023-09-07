import { Server } from "socket.io";
import { MessageModel } from '../DAO/models/db/msgs.model.db.js';
import CustomError from '../services/errors/custom-error.js';
import EErrors from '../services/errors/enums.js';

export function connectSocket(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socket) => {
    socket.on('msg_front_to_back', async (msg) => {
      const msgCreated = await MessageModel.create(msg);
      const msgs = await MessageModel.find({}); 
      socketServer.emit('msg_back_to_front', msgs);
    });
  });

  socketServer.on("connection", (socket) => {
    socket.on("new-product-created", async (newProduct) => {
      try {
        await productApiService.addProduct(newProduct);

        let allProducts = await productApiService.getProducts();
        socketServer.emit("all-the-products", allProducts);
      } catch (error) {
        CustomError.createError({
          name: 'Error De Conexion por Socket',
          cause: 'No se pudo establecer una conexión con Socket',
          message: 'Ocurrió un error al intentar conectarse con Socket.',
          code: EErrors.SOCKET_CONNECTION_ERROR,
        });      }
    });

    socket.on("delete-product", async (iidd) => {
      try {
        await productApiService.deleteProduct(iidd);

        let allProducts = await productApiService.getProducts();
        socketServer.emit("all-the-products", allProducts);
      } catch (error) {
        CustomError.createError({
          name: 'Error De Conexion por Socket',
          cause: 'No se pudo establecer una conexión con Socket',
          message: 'Ocurrió un error al intentar conectarse con Socket.',
          code: EErrors.SOCKET_CONNECTION_ERROR,
        });       }
    });
  });
}
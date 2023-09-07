import dotenv from 'dotenv';
import { connect } from "mongoose";

dotenv.config();

export async function connectMongo() {
  try {
    await connect(
      process.env.MONGO_URL
    );
    console.log("plug to mongo!");
  } catch (e) {
    CustomError.createError({
      name: 'Error De Conexion a Base De Datos',
      cause: 'No se pudo establecer una conexión con la base de datos de MongoDB.',
      message: 'Ocurrió un error al intentar conectarse a la base de datos.',
      code: EErrors.MONGO_CONNECTION_ERROR,
    });
  }
}

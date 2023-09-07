import EErrors from '../services/errors/enums.js';
import { selectedLogger } from '../utils/logger.js';

export default (error, req, res, next) => {
  selectedLogger.error(error.cause);
    switch (error.code) {
    case EErrors.SERVER_ERROR:
      res.status(500).send({ status: 'error', error: error.name, cause: error.cause });
      break;
    case EErrors.INVALID_INPUT_ERROR:
      res.status(400).send({ status: 'error', error: error.name, cause: error.cause });
      break;
    case EErrors.UPDATE_ERROR:
      res.status(401).send({ status: 'error', error: error.name, cause: error.cause });
      break;
    case EErrors.DELETE_ERROR:
      res.status(401).send({ status: 'error', error: error.name, cause: error.cause });
      break;
    case EErrors.MONGO_CONNECTION_ERROR:
      res.status(500).send({ status: 'error', error: error.name, cause: error.cause });
      break;
    case EErrors.SOCKET_CONNECTION_ERROR:
      res.status(500).send({ status: 'error', error: error.name, cause: error.cause });
      break;
    case EErrors.MAIL_SEND_ERROR:
      res.status(500).send({ status: 'error', error: error.name, cause: error.cause });
      break;
    default:
      res.status(500).send({ status: 'error', error: 'Unhandled error' });
      break;
  }
};
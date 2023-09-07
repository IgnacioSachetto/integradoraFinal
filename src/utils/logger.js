import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config();

const customLevelOptions = {
  levels: {
    error: 0,
    warning: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
  }
};

const loggerDev = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.colorize({ all: true }),
    }),
  ],
});

const loggerProd = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.colorize({ all: true }),
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error',
      format: winston.format.simple(),
    }),
  ],
});

let selectedLogger;

export const addLogger = (req, res, next) => {
  if (process.env.NODE_ENV === 'dev') {
    selectedLogger = loggerDev;
  } else {
    selectedLogger = loggerProd;
  }
  next();
};

export { selectedLogger };


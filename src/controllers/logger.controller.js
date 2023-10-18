import { selectedLogger } from '../utils/logger.js';

export const loggerTest = (req, res) => {
  selectedLogger.error(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`);
  selectedLogger.warning(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`);
  selectedLogger.info(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`);
  selectedLogger.http(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`);
  selectedLogger.verbose(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`);
  selectedLogger.debug(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`);

  return res.status(200).json({
    status: 'success',
    msg: 'all logs'
  });
};

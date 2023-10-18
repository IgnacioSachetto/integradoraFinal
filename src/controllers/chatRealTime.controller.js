import { selectedLogger } from '../utils/logger.js';

export const chatRealtimeController = {
  index: async function (req, res) {
    try {
      selectedLogger.info('Conexión establecida');

      return res.render("../views/chatRealTime.handlebars", {
        title: "Chat en Vivo",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: "Algo salió mal",
        data: { error },
      });
    }
  },
};

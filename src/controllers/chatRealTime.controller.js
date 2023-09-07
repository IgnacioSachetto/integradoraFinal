import { selectedLogger } from '../utils/logger.js';


export const chatRealtimeController = {
  index: async function (req, res) {
    try {
      selectedLogger.info('Conectado');

      return res.render("../views/chatRealTime.handlebars", {
        title: "Chat Live",
      });
    } catch (error) {


      return res.status(500).json({
        status: "error",
        msg: "something went wrong",
        data: { error },
      });
    }
  },
};

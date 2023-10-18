import express from 'express';
import { loggerTest } from './loggerController.js';

const router = express.Router();

router.get('/loggerTest', loggerTest);

export default router;

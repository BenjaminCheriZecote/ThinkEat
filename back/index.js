import { createServer } from 'node:http';

import './src/helpers/envLoad.js';

import app from './src/index.js'; //Module express

const httpServer = createServer(app);

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL;

httpServer.listen(PORT, () => {
  console.log(`Server listening on ${BASE_URL ? BASE_URL : `http://localhost:${PORT}`}`);
});
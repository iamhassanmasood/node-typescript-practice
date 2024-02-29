import * as moduleAlias from 'module-alias';
import dotenv from 'dotenv';
import connect from '@server/db';
import { Server } from 'socket.io';
import * as http2 from 'http2';
import * as fs from 'fs';

dotenv.config();

const db = process.env.DB_URI || '';
connect({ db });

const sourcePath = process.env.NODE_ENV === 'development' ? 'src' : __dirname;
moduleAlias.addAliases({
  '@server': sourcePath,
  '@config': `${sourcePath}/config`,
  '@controller': `${sourcePath}/controller`,
});

import { createServer } from '@config/express';
import { AddressInfo } from 'net';
import http from 'http';
import { logger } from '@config/logger';

// Define types for the data schema and cursor
interface Data {
  id: number;
  name: string;
  description: string;
}

interface Cursor {
  position: number;
}

const dummyData: Data[] = [
  { id: 1, name: 'Item 1', description: 'Description for Item 1' },
  { id: 2, name: 'Item 2', description: 'Description for Item 2' },
  { id: 3, name: 'Item 3', description: 'Description for Item 3' },
];

function fetchData(cursor: Cursor, limit: number, sortOrder: string): Data[] {
  const start = cursor.position;
  const end = start + limit;
  return dummyData.slice(start, end);
}

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5000';
const sessionSecret = process.env.SESSION_SECRET_KEY;

const startServer = async () => {
  const app = createServer(sessionSecret);

  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    logger.info(`⚡ Server ready at http://${addressInfo.address}:${addressInfo.port}`);
  });
  const io = new Server(server);

  io.on('connection', (socket) => {
    socket.on('user-message', (message) => {
      io.emit('message', message);
    });
  });

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      logger.info(`process.once ${type}`);

      server.close(() => {
        logger.debug('🚫 HTTP server closed');
      });
    });
  });
};

startServer();

const server2 = http2.createSecureServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
});

server2.on('stream', (stream: http2.ServerHttp2Stream, headers: http2.IncomingHttpHeaders) => {
  const serviceSelector = headers[':path'] as string;
  const customMethod = headers[':method'] as string;

  if (serviceSelector === '/data-stream') {
    if (customMethod === 'GET') {
      const cursor: Cursor = { position: parseInt(headers['cursor'] as string) || 0 };
      const limit: number = parseInt(headers['limit'] as string) || 10;
      const sortOrder: string = (headers['sortOrder'] as string) || 'asc';

      const data: Data[] = fetchData(cursor, limit, sortOrder);
      stream.respond({
        'content-type': 'application/json',
        ':status': 200,
      });
      stream.end(JSON.stringify(data));
    } else if (customMethod === 'POST') {
      /***  Handle resetting cursor or changing sort order and Implement logic to reset cursor or change sort order*/
    } else {
      /** Handle unsupported methods*/
      stream.respond({
        ':status': 405,
      });
      stream.end('Method Not Allowed');
    }
  } else {
    stream.respond({
      ':status': 404,
    });
    stream.end('Not Found');
  }
});

server2.on('error', (err: Error) => {
  console.error('Server error:', err.message);
});

server2.listen(8443, () => {
  console.log('Server is listening on port 8443');
});

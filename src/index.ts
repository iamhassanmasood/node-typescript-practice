import * as moduleAlias from 'module-alias';
import dotenv from 'dotenv';
import connect from '@server/db';
import { Server } from 'socket.io';

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
import * as cluster from 'cluster';
import * as os from 'os';

const numberOfCpus = os.cpus().length;

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5000';

const startServer = async () => {
  const app = createServer();

  if (cluster.isMaster) {
    for (let i = 0; i < numberOfCpus; i++) {
      cluster.fork();
    }
    cluster.fork().on('exit', (worker, _code, _signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
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
  }
};

startServer();

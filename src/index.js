
import minimist from 'minimist'
import cluster from 'cluster';
import os from 'os';
import Config from './config/index'

import { dbConnection } from './db/connection';
import Server from './services/server';
import logger from './config/logger'

const argumentos = minimist(process.argv.slice(2));

export const PORT = argumentos.puerto || Config.PORT || 8080;

const clusterMode = argumentos.cluster;
const numCPUs = os.cpus().length;

if (clusterMode && cluster.isMaster) {
  

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
  
    cluster.fork();
  });
} else {
dbConnection()
.then(result => {
 
  Server.listen(PORT, () =>
  logger.info(
    `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
  )
);
   
  })
  .catch(err => {
    logger.error(err);
  });
}
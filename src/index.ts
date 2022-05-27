import http from 'http';
import * as core from '@actions/core';

const express = require('express');

const startServer = (port: number = 8080) => {
  const app = express();
  const server = http.createServer(app);

  app.post('/close/', (req, res) => {
    server.close();
    res.end('Closed');
  });

  console.log('Awaiting a kill signal on port 8080...');
  server.listen(port);
};

const stopServer = (hostname: string) => {
  http.request({ hostname, path: '/close/', method: 'POST' });
};

const run = () => {
  const mode = core.getInput('mode', { required: true });
  const host = core.getInput('host', { required: true });
  const port = core.getInput('port', { required: false });

  if (mode === 'wait') startServer(parseInt(port, 10));
  if (mode === 'kill') stopServer(host);
};

run();

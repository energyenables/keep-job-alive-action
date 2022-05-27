import axios from 'axios';
import http from 'http';
import express from 'express';
import * as core from '@actions/core';

const DEFAULT_PORT = 8080;

const startServer = (port: number) => {
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
  console.log('Sending close signal to wait server...');
  axios.post(`${hostname}/close/`);
  console.log('Wait server closed.');
};

const run = () => {
  const mode = core.getInput('mode', { required: true });
  const host = core.getInput('host', { required: true });
  const port = core.getInput('port', { required: false });

  if (mode === 'wait') startServer(port ? parseInt(port, 10) : DEFAULT_PORT);
  if (mode === 'kill') stopServer(host);
};

run();

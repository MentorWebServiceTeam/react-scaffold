import express from 'express';
import { join } from 'path';

export default function routes(server) {
  server.use('/public', express.static(join(__dirname, '../../public')));

  server.use('*', (req, res) => {
    res.sendFile(join(__dirname, '../views/index.html'));
  });
}

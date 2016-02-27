import express from 'express';
import { join } from 'path';

export default function routes(server) {
  server.use('/public', express.static(join(__dirname, '../../public')));

  server.get('/api/v1/test', (req, res) => {
    res.json([
      'test'
    ])
  });

  server.use('*', (req, res) => {
    res.sendFile(join(__dirname, '../views/index.html'));
  });
}

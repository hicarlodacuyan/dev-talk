import app from './app';
import http from 'http';
import config from './utils/config';

const server = http.createServer(app);

app.get('/', (_req, res) => {
  res.send(`
    <p>Server is running on port ${config.PORT}</p>
  `);
});

server.listen(config.PORT, () => {
  console.log(`Server is now running in port ${config.PORT}`);
});

import app from "./app";
import http from "http";
import config from "./utils/config";
import logger from "./utils/logger";

const server = http.createServer(app);

app.get("/", (_req, res) => {
  res.send(`
    <p>Server is running on port ${config.PORT}</p>
  `);
});

server.listen(config.PORT, () => {
  logger.info(`Server is now running in port ${config.PORT}`);
});

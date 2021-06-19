import express from "express";
import Logger from '../config/logger';
const app: express.Application = express();

app.get(
  "/info",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Logger.info('GET /info');

    res.send("hello typescript express!");
  }
);

app.get("/logger", (_, res) => {
  Logger.error("This is an error log");
  Logger.warn("This is a warn log");
  Logger.info("This is a info log");
  Logger.http("This is a http log");
  Logger.debug("This is a debug log");

  res.send("Hello world");
});

export default app;
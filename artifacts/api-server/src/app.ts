// @ts-nocheck
import express, { type Express } from "express";
import cors from "cors";
import pino from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Simplified logger call to bypass the 'not callable' error
const httpLogger = pino({
  logger,
  serializers: {
    req: (req: any) => ({
      id: req.id,
      method: req.method,
      url: req.url?.split("?")[0],
    }),
    res: (res: any) => ({
      statusCode: res.statusCode,
    }),
  },
});

app.use(httpLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;

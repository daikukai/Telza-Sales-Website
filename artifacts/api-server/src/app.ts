import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
// Use this specific import style for pino-http:
import * as pinoHttp from "pino-http"; 
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  (pinoHttp.default || pinoHttp)({ // This handles both ESM and CommonJS styles
    logger,
    serializers: {
      req(req: any) { // Changed to 'any' temporarily to bypass property errors
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;

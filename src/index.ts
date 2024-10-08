import express, { NextFunction, Request, Response } from "express";
import config from "../config";
import connectDB from "../loaders/db";
import routes from '../routes';
const app = express();
require('dotenv').config();

connectDB(); // DB 연결하기

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);   //라우터 분리
// error handler

interface ErrorType {
  message: string;
  status: number;
}

// 모든 에러에 대한 핸들링
app.use(function (err: ErrorType, req: Request, res: Response, next: NextFunction) {

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app
  .listen(config.port, () => {
    console.log(`
    ################################################
          🛡️  Server listening on port 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
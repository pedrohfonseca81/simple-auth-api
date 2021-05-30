import bodyParser from "body-parser";
import express from "express";
import auth from "./routes/auth.routes";
import user from "./routes/user.routes";

/**
 * Server class
 */
export default class Server {
  app = express();

  /**
   * Init server
   */
  startUp() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use("/user", user);

    this.app.use("/auth", auth);

    this.app.listen(3000);
  };
};
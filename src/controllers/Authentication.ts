import { Request, Response } from "express";
import { createAccount, existsAccount, findUserByUsername } from "../services/database";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/user.interface";

/**
 * Authentication controller
 */
export default class Authentication {
  /**
   * POST
   */
  async signIn(req: Request, res: Response) {
    const { username, password } = req.body;

    const isExists = await existsAccount(username, password);
    if (!isExists) return res.status(401).send();

    const { id }: User = await findUserByUsername(username);

    const token = jwt.sign({ id, username }, process.env.PRIVATE_KEY as string);

    res.setHeader("authorization", token);
    res.send();
  };
  /**
   * POST
   */
  async signUp(req: Request, res: Response) {
    const { name, username, password } = req.body;

    const isExists = await existsAccount(username);
    if (isExists) return res.status(401).send();

    const { id }: User = await createAccount(name, username, password);

    const token = jwt.sign({ id, username }, process.env.PRIVATE_KEY as string);

    res.setHeader("authorization", token);
    res.send();
  };
};
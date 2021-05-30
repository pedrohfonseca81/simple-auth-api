import { Request, Response } from "express";
import { findUserById } from "../services/database";
import jwt from "jsonwebtoken";

/**
 * User controller
 */
export default class User {
  /**
   * GET
   */
  fetch(req: Request, res: Response) {
    const { authorization } = req.headers;

    jwt.verify(authorization as string, process.env.PRIVATE_KEY as string, async (err, decoded: any) => {
      if (err) return res.status(401).send();

      const { name, username } = await findUserById(decoded.id);

      res.json({ name, username });
    });
  };
};
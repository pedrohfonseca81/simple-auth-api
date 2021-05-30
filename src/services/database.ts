import { Pool, PoolClient } from "pg";
import { v4 as uuidv4 } from "uuid";

declare global {
  namespace NodeJS {
    interface Global {
      connection: Pool;
    }
  }
};

export const createDatabaseConnection = async (): Promise<PoolClient> => {
  if (global.connection)
    return global.connection.connect();

  const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
  });

  global.connection = pool;

  return pool.connect();
};

export const findUserByUsername = async (username: string) => {
  const db = await createDatabaseConnection();

  const res = await db.query(`SELECT username, name, id FROM users WHERE username = '${username}'`);

  return res.rows[0];
};

export const findUserById = async (id: string) => {
  const db = await createDatabaseConnection();

  const res = await db.query(`SELECT id, name FROM users WHERE id = '${id}'`);

  return res.rows[0];
};

export const existsAccount = async (username: string, password?: string) => {
  const db = await createDatabaseConnection();

  const res = await db.query(`SELECT username, password FROM users WHERE ${password ? `username = '${username}' AND password = '${password}'` : `username = '${username}'`}`);

  return !!res.rows[0];
};

export const createAccount = async (name: string, username: string, password: string) => {
  const db = await createDatabaseConnection();
  const id = uuidv4();

  await db.query(`INSERT INTO users (name, username, password, id) VALUES ('${name}', '${username}', '${password}', '${id}');`)

  return { id };
};
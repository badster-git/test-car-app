import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "/tmp/mydb.sqlite",
    driver: sqlite3.Database,
  });
}

export default async function getPersonById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDb();

  if (req.method === "PUT") {
    const result = await db.run(
      "UPDATE Person SET name = ?, email = ? WHERE id = ?",
      req.body.name,
      req.body.email,
      req.query.id
    );
  }

  const person = await db.get("SELECT * FROM Person WHERE id = ?", [
    req.query.id,
  ]);
  res.json(person);
}

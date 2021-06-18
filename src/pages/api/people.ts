import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

import { authenticated } from "../../../api/Authenticate";

async function openDb() {
  return open({
    filename: "/tmp/mydb.sqlite",
    driver: sqlite3.Database,
  });
}

export default authenticated(async function getPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(500).json({ message: "sorry we only accept GET requests" });
  }
  const db = await openDb();
  const people = await db.all("SELECT id, email, name FROM Person");
  res.json(people);
});

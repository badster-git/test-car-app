import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { hash, compare } from "bcrypt";

async function openDb() {
  return open({
    filename: "/tmp/mydb.sqlite",
    driver: sqlite3.Database,
  });
}

async function passwordCheck(password: number) {
  return password > 5;
}

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDb();

  if (req.method === "POST") {
    const emailExists = await db.get("SELECT * FROM Person WHERE email = ?", [
      req.body.email,
    ]);
    const passCheck = await passwordCheck(req.body.password.length);
    if (passCheck && !emailExists) {
      hash(req.body.password, 10, async function (err, hash) {
        // Store hash in your password DB.
        const result = await db.run(
          "INSERT INTO Person (name, email, password) VALUES (?, ?, ?)",
          req.body.name,
          req.body.email,
          hash
        );
        const person = await db.all("SELECT * FROM Person");
        res.json(person);
      });
    } else if (!passCheck) {
      res
        .status(405)
        .json({ message: "Password must be longer than 5 characters." });
    } else {
      res.status(405).json({ message: "Unknown error occurred." });
    }
  } else {
    res.status(405).json({ message: "Only support POST" });
  }
}

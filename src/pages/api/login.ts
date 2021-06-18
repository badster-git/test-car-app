import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

async function openDb() {
  return open({
    filename: "/tmp/mydb.sqlite",
    driver: sqlite3.Database,
  });
}

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const db = await openDb();

  if (req.method === "POST") {
    const person = await db.get("SELECT * FROM Person where email = ?", [
      req.body.email,
    ]);
    if (person) {
      compare(req.body.password, person.password, function (err, result) {
        if (!err && result) {
          const claims = { sub: person.id, myPersonEmail: person.email };
          const jwt = sign(claims, `${process.env.SECRET_KEY}`, {
            expiresIn: "1h",
          });
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("auth", jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 3600,
              path: "/",
            })
          );
          res.json({ message: "Welcome back to the app!" });
        } else {
          res.json({ message: "Oops! Something went wrong!" });
        }
      });
    }
  } else {
    res.status(405).json({ message: "Only support POST" });
  }
}

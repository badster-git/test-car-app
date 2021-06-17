import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "/tmp/mydb.sqlite",
    driver: sqlite3.Database,
  });
}

export default async function getAllVehicles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(500).json({ message: "sorry we only accept GET requests" });
  }
  const db = await openDb();
  const vehicles = await db.all("SELECT * FROM Vehicles");
  res.json(vehicles);
}

import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "/tmp/mydb.sqlite",
    driver: sqlite3.Database,
  });
}

export default async function getAllVehiclesByPersonId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDb();
  const allVehicles = await db.all("SELECT * FROM Vehicles WHERE ownerId = ?", [
    req.query.id,
  ]);
  res.json(allVehicles);
}

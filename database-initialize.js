const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

async function openDb() {
  return sqlite.open({
    filename: "/tmp/mydb.sqlite",
    driver: sqlite3.Database,
  });
}

async function setup() {
  const db = await openDb();
  await db.migrate({ migrationsPath: "./migrations", force: "last" });

  const people = await db.all("SELECT * FROM Person");
  console.log("All People", JSON.stringify(people, null, 2));

  const vehicles = await db.all("SELECT * FROM Vehicles");
  console.log("All Vehicles", JSON.stringify(vehicles, null, 2));
}

setup();

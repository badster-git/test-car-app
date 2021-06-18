-- Up
CREATE TABLE Person (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	email TEXT,
	password TEXT
);

CREATE TABLE Vehicles (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	brand TEXT,
	model TEXT,
	ownerId INTEGER REFERENCES Person(id)
);

-- Down
DROP TABLE Person;
DROP TABLE Vehicles;
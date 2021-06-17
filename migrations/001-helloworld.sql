-- Up
CREATE TABLE Person (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	email TEXT
);

CREATE TABLE Vehicles (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	brand TEXT,
	model TEXT,
	ownerId INTEGER REFERENCES Person(id)
);

INSERT INTO Person (name, email) values ('john', 'john@odf.ac');
INSERT INTO Person (name, email) values ('bob', 'bob@odf.ac');

INSERT INTO Vehicles (brand, model, ownerId) values ('lambo', 'aventador', 1);
INSERT INTO Vehicles (brand, model, ownerId) values ('lambo', 'gallardo', 1);
INSERT INTO Vehicles (brand, model, ownerId) values ('bmw', 'i8', 2);

-- Down
DROP TABLE Person;
DROP TABLE Vehicles;
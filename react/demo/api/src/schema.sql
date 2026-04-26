CREATE TABLE IF NOT EXISTS pets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  description TEXT NOT NULL,
  age INTEGER NOT NULL,
  fee REAL NOT NULL,
  available INTEGER NOT NULL DEFAULT 1,
  goodWithKids INTEGER NOT NULL DEFAULT 1,
  image TEXT
);

INSERT OR IGNORE INTO pets (id, name, breed, description, age, fee, available, goodWithKids, image) VALUES
  (1, 'Stepan', 'Domestic Cat', 'Loves sunny spots, sleeping, and ignoring you.', 2, 180, 1, 1, 'cat.png'),
  (2, 'Bailey', 'Golden Retriever', 'Enthusiastic, loyal, and obsessed with tennis balls.', 3, 250, 1, 1, 'dog.png'),
  (3, 'Oolong', 'Holland Lop', 'Fluffy, fast, and surprisingly opinionated.', 1, 100, 1, 0, 'rabbit.png'),
  (4, 'Ribbit', 'Tree Frog', 'Chill, green, and jumps when least expected.', 1, 180, 0, 1, 'frog.png');

CREATE TABLE IF NOT EXISTS adoption_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  adopter_name TEXT NOT NULL,
  pet_name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

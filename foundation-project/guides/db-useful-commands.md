# SQL Useful Commands

## Create a table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT
);
```

## Add items

```sql
INSERT INTO users (name, email) VALUES ('Cat', 'cat@hackyourfuture.dk'); # id: 1
INSERT INTO users (name, email) VALUES ('Dog', 'dog@hackyourfuture.dk'); # id: 2
```

## Read from db

```sql
SELECT * FROM users WHERE id = 1;
```

## Update a row

```sql
UPDATE users SET email = 'newcat@hackyourfuture.dk' WHERE id = 1;
```

## Delete a row

```sql
DELETE FROM users WHERE id = 1;
```


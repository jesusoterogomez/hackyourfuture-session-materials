# Server

This is the Express.js backend for the Memory Game.

## Setup

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The server will run at http://localhost:3000


## Project Structure

```
demo/
├── app/                # Your frontend code goes here
│   ├── ... place your own files in this directory :)
└── server/             # Backend
    ├── package.json    # Node/npm dependencies and scripts
    ├── index.js        # Express server
    └── database.db     # SQLite database
```

## API Endpoints

- `GET /users` - Returns all users from the database
- `POST /users` - Creates a new user (body: `{ "name": "..." }`)

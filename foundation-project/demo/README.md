# Memory Game Demo

A minimal memory game with a Node.js backend and SQLite database.

## Project Structure

```
demo/
├── package.json        # Dependencies and scripts
├── app/                # Frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
└── server/             # Backend
    ├── index.js        # Express server
    └── database.db     # SQLite database
```

## How to Run

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Then open http://localhost:3000 in your browser.

## How It Works

- The Express server serves the frontend files from `app/`
- The frontend fetches data from the backend API
- Both run on the same origin (`localhost:3000`), so the browser does not block requests to the backend server. Read about this security feature (CORS) here: https://supertokens.com/blog/cors-errors

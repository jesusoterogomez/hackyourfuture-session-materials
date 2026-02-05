# Memory Game Demo

A minimal memory game with a Node.js backend and SQLite database.

## Project Structure

```
demo/
├── app/                # Frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
└── server/             # Backend
    ├── package.json    # Node/npm dependencies and scripts
    ├── index.js        # Express server
    └── database.db     # SQLite database
```

## How to Run

Run the express server with node and npm. This runs the backend and frontend.

```bash
# Go to the server directory
cd server

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

## Quick Start (for class)

Copy the demo to your machine and use your own frontend files.

```bash
# Copy the demo server to a new folder on your project
npx degit jesusoterogomez/hackyourfuture-session-materials/foundation-project/demo/server server

cd server

# Install dependencies
npm install

# Start the server
npm start
```

Then replace the `app/` folder with your own frontend files (or rename your frontend folder to `app/`).

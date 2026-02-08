# DIY Express Server Setup

How to set up an Express server from scratch.

## 1. Create the server folder in your project

```bash
mkdir server
cd server
```

## 2. Initialize npm

```bash
npm init
```

## 3. Install dependencies

```bash
npm install express knex sqlite3
```

## 4. Enable ES modules

Add `"type": "module"` to your `package.json`. This will allow you to use `import` statements

```json
{
  "type": "module"
}
```

## 5. Create a .js file for the server

This file will need to import and initialize express (web server) and knex (database query tool)

See the example: [demo/server/index.js](../demo/server/index.js)

## 6. Run it

```bash
node the-name-of-your-file.js
```

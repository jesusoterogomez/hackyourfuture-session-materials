# Vite + React Setup Guide

How to create and run your first React app.

## 1. Check that Node.js is installed

Vite runs through Node.js, so you need Node before you can start a React project. You should already have it installed :)

```bash
node --version
npm --version
```

## 2. Create a new Vite project

Run this command in the folder where you want your project to live:

```bash
npm create vite@latest
```

When Vite asks questions:

1. Choose a project name
2. Select `React`
3. Select `JavaScript`

## 3. Go into the project and install dependencies

```bash
cd your-project-name
npm install
```

## 4. Start the development server

```bash
npm run dev
```

Vite will print a local URL, usually something like:

```text
http://localhost:5173
```

Open that URL in your browser.

## 5. Where your React code lives

In a Vite React project, these files matter first:

- `src/main.jsx` connects React to the page
- `src/App.jsx` is the main component
- `src/index.css` or `src/App.css` can hold your styles

## 6. Why Vite is needed

Browsers do not understand JSX directly.

Vite helps by:

- starting a local development server
- turning JSX into browser-ready JavaScript
- updating the browser quickly when you save

## First edit example

Replace the starter `App.jsx` with something simple:

```javascript
function App() {
  return <h1>Hello React</h1>;
}

export default App;
```

## Common mistakes

- ❌ Forgetting to run `npm install`
- ❌ Running `npm run dev` outside the project folder
- ❌ Closing the terminal that is running Vite (this closes the server and you can't connect anymore)
- ❌ Expecting the browser to understand `.jsx` without tooling

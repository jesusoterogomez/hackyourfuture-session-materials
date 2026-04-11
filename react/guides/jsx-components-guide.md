# JSX and Components Guide

How to write UI in React using JSX and reusable components.

## What JSX is

JSX lets you write HTML-like syntax inside JavaScript.

```javascript
function WelcomeBanner() {
  return <h1>Welcome to the React session</h1>;
}
```

A React component is a function that returns JSX.

## JavaScript inside JSX

Use curly braces to put JavaScript expressions into your UI.

```javascript
function WeatherBanner() {
  const city = "Amsterdam";
  const isRaining = true;

  return (
    <div>
      <h2>Today in {city}</h2>
      {isRaining ? <p>Bring an umbrella ☔</p> : <p>Enjoy the sun ☀️</p>}
    </div>
  );
}
```

## JSX rules to remember

### 1. Return one root element

This will not work:

```javascript
return (
  <h1>Title</h1>
  <p>Body</p>
);
```

Wrap it in one parent:

```javascript
return (
  <>
    <h1>Title</h1>
    <p>Body</p>
  </>
);
```

`<></>` is called a Fragment. It does not add an extra element to the DOM.

### 2. Some HTML attributes have different names

In JSX, a few common attributes change:

```javascript
<div className="banner">Hello</div>
<label htmlFor="email">Email</label>
<input onChange={handleChange} />
```

Use:

- `className` instead of `class`
- `htmlFor` instead of `for`
- `onClick` / `onChange` instead of `onclick` / `onchange`

## Components

A component is a reusable piece of UI.

```javascript
function Recipe() {
  return (
    <article>
      <h2>Pasta Carbonara</h2>
      <p>A classic Italian dish with eggs and cheese.</p>
    </article>
  );
}
```

You use a component like this:

```javascript
<Recipe />
```

## Components inside components

Small components can be combined into bigger ones.

```javascript
function Logo() {
  return <span>🐾 Paws</span>;
}

function Menu() {
  return (
    <nav>
      <a href="#">Home</a>
      <a href="#">Pets</a>
    </nav>
  );
}

function Header() {
  return (
    <header>
      <Logo />
      <Menu />
    </header>
  );
}
```

`Logo` and `Menu` are their own components. `Header` uses them like regular HTML tags.

This helps because:

- you write UI once and reuse it
- each component can do one job
- updates are easier to make later

## Common mistakes

❌ Forgetting curly braces around JavaScript expressions
❌ Returning two sibling elements without a wrapper
❌ Using `class` instead of `className`
❌ Writing HTML-style `onclick` instead of React `onClick`

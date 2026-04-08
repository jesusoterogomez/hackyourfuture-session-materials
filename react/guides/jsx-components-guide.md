# JSX and Components Guide

How to write UI in React using JSX and reusable components.

## What JSX is

JSX lets you write HTML-like syntax inside JavaScript.

```javascript
function Greeting() {
  return <h1>Hello class</h1>;
}
```

A React component is a function that returns JSX.

## JavaScript inside JSX

Use curly braces to put JavaScript expressions into your UI.

```javascript
function Greeting() {
  const name = "HackYourFuture";
  const isSunday = true;

  return (
    <div>
      <h1>Hello {name}!</h1>
      {isSunday ? <p>Happy Sunday!</p> : null}
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
<button className="btn">Save</button>
<label htmlFor="email">Email</label>
<button onClick={handleClick}>Click me</button>
```

Use:

- `className` instead of `class`
- `htmlFor` instead of `for`
- `onClick` instead of `onclick`

## Components

A component is a reusable piece of UI.

```javascript
function Card() {
  return (
    <article>
      <h2>Title</h2>
      <p>Content</p>
    </article>
  );
}
```

You use a component like this:

```javascript
<Card />
```

## Components inside components

Small components can be combined into bigger ones.

```javascript
function Card() {
  return <article>One card</article>;
}

function Cards() {
  return (
    <section>
      <Card />
      <Card />
      <Card />
    </section>
  );
}
```

This helps because:

- you write UI once and reuse it
- each component can do one job
- updates are easier to make later

## Common mistakes

❌ Forgetting curly braces around JavaScript expressions
❌ Returning two sibling elements without a wrapper
❌ Using `class` instead of `className`
❌ Writing HTML-style `onclick` instead of React `onClick`

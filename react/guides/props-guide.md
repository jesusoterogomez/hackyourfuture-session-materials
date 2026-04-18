# Props Guide

How to pass data into React components using props and the `children` prop.

## What props are

Props are inputs you pass into a component from its parent, like arguments to a function. The parent decides what values to send; the component receives and renders them.

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// parent chooses the value
<Welcome name="Aisha" />
```

Data flows **one way**: from parent to child. Inside the component, props are read-only. If a value needs to change, the parent updates what it passes.

## Destructuring props

Instead of writing `props.title` everywhere, you can pull out the fields you need directly in the function parameter.

```javascript
function Card({ title, imageUrl }) {
  return (
    <article>
      <img src={imageUrl} />
      <h2>{title}</h2>
    </article>
  );
}

<Card title="Hello" imageUrl="/cat.png" />
```

It's the same props, just easier to read. You'll see both styles in codebases: `(props)` and `({ title, imageUrl })`.

## What you can pass as props

Almost any JavaScript value works:

- **Plain data:** strings, numbers, booleans, objects, arrays
- **Functions** the child can call (e.g. `onClick={handleClick}`)
- **Other components:** as a named prop or via `children`

## The children prop

`children` is a special prop React sets automatically. Whatever JSX you place between a component's opening and closing tags becomes `children` inside it.

```javascript
function Layout({ children }) {
  return (
    <>
      <header>…</header>
      <main>{children}</main>
      <footer>…</footer>
    </>
  );
}

<Layout>
  <h1>Dashboard</h1>
</Layout>
```

This is useful for composing UI: one component provides the structure, and the parent decides what fills it. Build the wrapper once and reuse it anywhere.

## Common mistakes

- ❌ Trying to modify a prop inside the component (`props.name = "..."` will not work)
- ❌ Forgetting curly braces when passing non-string values (`count="5"` passes the string `"5"`, not the number `5`)
- ❌ Forgetting to render `{children}` inside the wrapper component

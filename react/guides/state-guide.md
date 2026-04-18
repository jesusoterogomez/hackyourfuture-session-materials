# State Guide

How to add state to a component with `useState` and update it correctly.

## Props vs state

| | Props | State |
|---|---|---|
| Where it comes from | Passed in from the parent | Lives inside this component |
| Who can change it | Only the parent | Only this component, via the setter |
| Triggers a re-render | When the parent re-renders | Yes, every time you call the setter |

## The useState hook

`useState` is a function React provides for tracking values that change over time. You pass it an **initial value** and it gives you back two things:

- The **current value**
- A **setter function** to update it

```javascript
import { useState } from 'react';

const [count, setCount] = useState(0);
//     ↑ current value   ↑ initial value
//            ↑ setter function
```

Calling the setter triggers a re-render with the new value.

## Updating state

```javascript
// set a value directly
setCount(count + 1);

// use the previous value (safer when updates happen quickly)
setCount((prev) => prev + 1);
```

Prefer the function form when the new value depends on the old one.

## Updating objects in state

Never modify state directly. React compares the old and new value to decide whether to re-render. If you mutate the existing object, the reference stays the same and React won't notice the change.

```javascript
// wrong
user.name = 'Lee'; // React won't re-render

// correct: create a new object with spread
setUser((prev) => ({ ...prev, name: 'Lee' }));
```

Read more: https://react.dev/learn/updating-objects-in-state

## Updating arrays in state

The same rule applies to arrays. Use methods that return a new array instead of mutating the existing one.

```javascript
// wrong
items.push(newItem); // React won't re-render

// correct: spread into a new array
setItems((prev) => [...prev, newItem]);

// removing an item
setItems((prev) => prev.filter((item) => item.id !== id));

// updating an item
setItems((prev) =>
  prev.map((item) => (item.id === id ? { ...item, done: true } : item))
);
```

Read more: https://react.dev/learn/updating-arrays-in-state

## Rules of hooks

- Call `useState` at the **top level** of your component
- Not inside loops, conditions, or nested functions
- React relies on the order hooks are called to keep state consistent

## Common mistakes

- ❌ Mutating state directly instead of calling the setter
- ❌ Passing a mutated object or array to the setter (same reference, React skips the re-render)
- ❌ Calling `useState` inside an `if` or loop
- ❌ Reading state immediately after calling the setter (the update is applied on the next render)

# Demo notes — Week 3 (Events, Forms, useEffect, Data fetching)

The app already has `Pet` with `onClick`/`onChange` wired up and `AdoptionForm` with controlled inputs. Use that as the starting point — students can see working examples before you extend them.

---

## 1. Events — point at what's already there, then dig in

**The goal:** Show that React event handlers are just props. No new concept needed — they've already been using them.

**What to do:** Open `Pet.jsx` and `AdoptionForm.jsx` side by side. Point out:

- `onClick` on the "See more" button in `Pet.jsx`
- `onChange` on every `<input>` in `AdoptionForm.jsx`

Then show the event object:

```jsx
// In Pet.jsx — open the event object to show what's inside
<button onClick={(event) => {
  console.log(event);           // SyntheticEvent
  console.log(event.target);    // the button element
  setShowMore(!showMore);
}}>
  {showMore ? 'See less' : 'See more'}
</button>
```

After showing it, clean it back up. The point is: `event` is always there if you need it. For `onChange` on inputs, you'll need `event.target.value`.

---

## 2. Forms — add validation to AdoptionForm

**Current state:** `AdoptionForm` already has controlled inputs and `handleSubmit`. It just logs and resets — no validation.

**The problem to pose:** What if someone clicks Submit with empty fields? Show it — nothing useful happens.

**What to do:** Add an `errors` state object and validate inside `handleSubmit` before accepting the submission.

```jsx
const [errors, setErrors] = useState({});

const handleSubmit = (event) => {
  event.preventDefault();

  const newErrors = {};
  if (!formState.name.trim()) newErrors.name = 'Your name is required.';
  if (!formState.petName.trim()) newErrors.petName = 'Please enter a pet name.';

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setErrors({});
  console.log(formState);
  setFormState(defaultState);
};
```

Then render the errors next to each input:

```jsx
<label>What's your name?</label>
<input
  placeholder="type your name"
  value={formState.name}
  onChange={(event) => updateField('name', event.target.value)}
/>
{errors.name && <p className="field-error">{errors.name}</p>}
```

**Point to make:** Three layers of validation exist — HTML (`required`), JS (what we just did), and server-side. JS validation is for immediate, friendly feedback. The server always has the final word.

---

## 3. useEffect — introduce with a simple example first

**Before jumping to fetch**, spend a couple of minutes on the concept using a clock so students see the dependency array and cleanup in isolation.

```jsx
// Paste this temporarily at the top of App.jsx or in a scratch component
import { useState, useEffect } from 'react';

const [time, setTime] = useState(new Date().toLocaleTimeString());

useEffect(() => {
  const id = setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return () => clearInterval(id);   // cleanup
}, []);                              // [] = run once on mount
```

Render `<p>{time}</p>` somewhere visible. Show the tick. Then remove the cleanup, open DevTools, navigate away — show the error. Put the cleanup back.

**Key points to hit:**
- Runs *after* the render, not during
- `[]` = mount only; `[x]` = every time `x` changes; no array = every render
- Return a function → React calls it before the next run and on unmount

---

## 4. useEffect + fetch — load pets from the API

**Current state:** `pets` is a hardcoded array inside `App.jsx`. The demo API is live at `https://paws-api.jesusotero.workers.dev/pets`.

**The problem to pose:** In a real app the data lives on a server. Let's fetch it.

**What to do in `App.jsx`:**

Remove the hardcoded `pets` array and replace with state + `useEffect`:

```jsx
import { useState, useEffect } from 'react';

const [pets, setPets] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('https://paws-api.jesusotero.workers.dev/pets')
    .then((res) => res.json())
    .then((data) => {
      setPets(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, []);
```

Add loading and error rendering above the `<Section>`:

```jsx
if (loading) return <p className="status-message">Loading pets…</p>;
if (error)   return <p className="status-message">Something went wrong: {error}</p>;
```

The `.map()` in `<Section>` stays exactly the same — only the data source changed.

**What to show:**
1. Open Network tab in DevTools — show the request going out, the JSON coming back.
2. Throttle to "Slow 3G" — the loading message appears. Unthrottle.
3. Point out: the rest of the component didn't change at all. That's the power of keeping data in state.

---

## Gotchas / things that trip up students

- **`useEffect` with no dependency array** runs on every render — easy to create infinite loops if the effect also updates state. Always think about what `[]` should contain.
- **Mutating state directly** still applies with arrays from the API — if you ever need to update the list, spread into a new array.
- **CORS**: the demo API sets `Access-Control-Allow-Origin: *` so students can call it from any localhost port. If they build their own API they'll need to do the same.
- **`event.preventDefault()`**: easy to forget on `onSubmit`. Without it the page reloads and React state is lost — looks like a bug.

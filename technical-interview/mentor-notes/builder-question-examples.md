# Builder-Style Question Examples

Take-home or async tasks. The candidate works alone with a deadline. What's being evaluated is code quality, judgment, and whether they understand *why* something was wrong — not just that they fixed it.

---

## 1. Debug a broken search feature

**Prompt:** "Here's a small app with a search bar that isn't filtering results correctly. Fix it. Leave a comment explaining what was wrong. Send your branch by Friday."

**The broken code**
```javascript
function search(items, term) {
  return items.filter(item => item.name === term);
}
```

<details>
<summary>Expected solution</summary>

- Identify that `===` is too strict and switch to `.includes()`
- Add case normalization with `.toLowerCase()`
- Leave a short comment explaining what was wrong
- Return a clean, working fix without introducing new complexity

A candidate who finds the bug, fixes it minimally, and explains it clearly is performing well. They don't need to add a `key` parameter or handle null values unprompted.

```javascript
function search(items, term) {
  return items.filter(item =>
    item.name.toLowerCase().includes(term.toLowerCase())
  );
}

// Was using strict equality (===) — only matched exact strings.
// Changed to .includes() with .toLowerCase() on both sides
// so partial matches and different casing work as expected.
```

**PR description** should briefly explain what was wrong and what was changed — not just "fixed the bug."

</details>

<details>
<summary>Experienced engineer solution</summary>

- Normalize once by extracting `term.toLowerCase()` outside the filter callback (avoid recomputing on every iteration)
- Add `.trim()` to handle accidental whitespace
- Guard against an empty `term` with an early return
- Make logical, well-described commits — not one "fix everything" commit
- Write a proper PR description explaining the bug, the fix, and any assumptions made

```javascript
function search(items, term) {
  if (!term) return items;
  const normalized = term.toLowerCase().trim();
  return items.filter(item =>
    item.name.toLowerCase().includes(normalized)
  );
}
```

</details>

---

## 2. Add a feature to an existing codebase

**Prompt:** "The app shows a list of items. Add a way to sort them alphabetically. Keep it simple. Send your branch by Friday."

<details>
<summary>Expected solution</summary>

- Add a sort button or trigger
- Sort the displayed list by name
- Not break existing functionality
- Keep the new code consistent with the existing style

A candidate who adds a working sort without mutating the original data is doing well. They are not expected to use `localeCompare` unprompted or handle complex sort cases.

```javascript
const sorted = [...items].sort((a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
});
```

**PR description** should note what was added and any assumptions ("sorted alphabetically by name, ascending").

</details>

<details>
<summary>Experienced engineer solution</summary>

- Use `localeCompare` which handles accented characters and locale-specific ordering
- Spread the array first to avoid mutating the original (`[...items]`)
- Consider whether sort should be togglable (ascending/descending)
- Make logical commits — e.g. one for the sort logic, one for the UI trigger
- PR description states the assumption ("sorting by name ascending") and flags any edge cases considered

```javascript
const sorted = [...items].sort((a, b) =>
  a.name.localeCompare(b.name)
);
```

</details>

---

## 3. Fix failing tests

**Prompt:** "Here's a small app with three failing tests. Get them passing without changing the test file. Send your branch by Friday."

<details>
<summary>Expected solution</summary>

- Read the test descriptions before touching any code
- Fix the implementation to match what the tests expect
- Not modify the test file
- Leave the code at least as clean as they found it

A candidate who reads the tests as a spec and fixes the implementation accordingly is performing well. They don't need to add extra tests or refactor beyond what's needed.

**PR description** should say which tests were failing and what was wrong — not just "fixed failing tests."

</details>

<details>
<summary>Experienced engineer solution</summary>

- Read all three tests before writing a single line of code
- Guard against edge cases revealed by the tests (empty inputs, unexpected types)
- Make one commit per logical fix rather than a single "get tests passing" commit
- PR description explains what was broken and why, and notes any fragile assumptions found along the way
- Leave a comment if the fix involves a non-obvious workaround

</details>

---

## Notes for the demo

- Builder tasks reward candidates who treat the task like real work — not a performance.
- A short explanation of decisions (in a comment or PR description) matters as much as the fix itself. It shows judgment, not just execution.
- The most common mistake: over-engineering. A simple, readable fix beats an elaborate one.
- Encourage students to leave the code *better* than they found it — even small things like fixing an inconsistent variable name signal care.

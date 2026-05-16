# Professor-Style Question Examples

Problems suitable for the live demo. Each one has a "write the loop yourself" constraint that strips away built-in abstractions and reveals how the candidate thinks.

---

## 1. Filter an array by search term

**Prompt:** "Write a function that takes an array and a search term, returns matching items. Don't use `.filter()` — implement the loop yourself."

**What a junior is expected to do**
- Create an empty results array and push matches into it
- Write a `for` loop (any form is fine)
- Use `.includes()` to check for a match
- Return the results array
- Think out loud while writing, even briefly

A junior who does all of this and narrates their steps is performing well. They don't need to handle edge cases unprompted.

<details>
<summary>Simple solution</summary>

```javascript
function search(items, term) {
  const results = [];
  for (const item of items) {
    if (item.includes(term)) {
      results.push(item);
    }
  }
  return results;
}
```

</details>

<details>
<summary>Experienced engineer solution</summary>

An experienced engineer would:
- Ask upfront: "What property are we matching on? Should this be case-insensitive?"
- Add a `key` parameter so the function isn't tied to `.name`
- Guard against empty `term` with an early return
- Normalize both sides with `.toLowerCase().trim()`
- Handle null/undefined field values defensively

```javascript
function search(items, term, key = "name") {
  if (!term) return items;
  const normalized = term.toLowerCase().trim();
  const results = [];
  for (const item of items) {
    const value = String(item[key] ?? "").toLowerCase();
    if (value.includes(normalized)) {
      results.push(item);
    }
  }
  return results;
}
```

</details>

**Good narration moment:** after the junior solution works, ask "what if the search term is uppercase and the names aren't?" — add `.toLowerCase()` and show how a working solution evolves naturally.

---

## 2. Deduplicate an array

**Prompt:** "Write a function that removes duplicates from an array. Don't use `Set` directly — implement the logic yourself."

**What a junior is expected to do**
- Create an empty results array
- Loop through items and check if each one is already in results
- Use `.includes()` to check for duplicates
- Return the deduplicated array
- Narrate the approach before writing

A junior who gets this working for a simple array of strings or numbers is doing well. They are not expected to anticipate the object reference issue unprompted.

<details>
<summary>Simple solution</summary>

```javascript
function deduplicate(items) {
  const results = [];
  for (const item of items) {
    if (!results.includes(item)) {
      results.push(item);
    }
  }
  return results;
}
```

</details>

<details>
<summary>Experienced engineer solution</summary>

An experienced engineer would:
- Ask upfront: "Are these primitives or objects? If objects, what field identifies uniqueness?"
- Use a `Set` for O(1) lookup and explain why `.includes()` is O(n)
- Accept a `key` parameter for deduplicating objects by a specific field
- State the assumption about preserving first occurrence out loud

```javascript
function deduplicate(items, key) {
  if (!key) return [...new Set(items)];
  const seen = new Set();
  const results = [];
  for (const item of items) {
    const value = item[key];
    if (!seen.has(value)) {
      seen.add(value);
      results.push(item);
    }
  }
  return results;
}
```

</details>

**The trap worth showing:** works for primitives, silently breaks for objects. `results.includes(item)` compares by reference. Run it on `[{id:1}, {id:1}]` live — both items come back. This moment lands well with an audience and opens the door to the senior solution naturally.

**`Map` vs `Set` teaching moment:** use `Set` when you only need to track presence. Reach for `Map` when you need to associate data with the key — e.g. counting duplicates or tracking first-occurrence index. Most juniors have never used either in production; worth naming.

---

## Notes for the demo

- Deduplication is the strongest of these for a live session — it has a visible failure mode, a natural senior upgrade, and a real tradeoff to discuss.
- The goal isn't to show a perfect solution. It's to model what thinking out loud looks like, including the moment you notice your first solution doesn't cover all cases.
- A junior who *asks about* edge cases is already signalling the right instincts — they don't need to arrive with the full senior solution.

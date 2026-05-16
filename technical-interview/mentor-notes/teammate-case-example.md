# Teammate-Style Case Example

A pair programming or collaborative session. The interviewer works *with* the candidate on a real(istic) problem. What's being evaluated is communication, curiosity, and how the candidate thinks alongside another person — not whether they solve it perfectly.

---

## The scenario: a search bar that isn't working

**Setup:** "I've got a search bar that's supposed to filter a list of items as the user types, but it's not working correctly. Let's look at it together."

**The broken code**
```javascript
function App() {
  const [query, setQuery] = useState("");
  const items = ["Apple", "Banana", "Apricot", "Blueberry"];

  const filtered = items.filter(item => item === query);

  return (
    <>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filtered.map(item => <li key={item}>{item}</li>)}
      </ul>
    </>
  );
}
```

**What's wrong:** strict equality (`===`) means results only appear on an exact full match. No partial matches, no case tolerance.

---

**What a junior is expected to do**
- Ask at least one clarifying question before touching the code
- Narrate what they see in the existing code before changing anything
- Identify the filter condition as the likely problem
- Propose a fix using `.includes()` and explain why
- Check that it works after the change

A junior who does all of this — even if they need a small nudge — is performing well. They are not expected to handle edge cases, add debouncing, or refactor the component structure.

<details>
<summary>Junior fix</summary>

```javascript
const filtered = items.filter(item =>
  item.toLowerCase().includes(query.toLowerCase())
);
```

</details>

<details>
<summary>Experienced engineer fix</summary>

An experienced engineer would:
- Ask upfront: "Should this be case-insensitive? What about partial matches at the start only, or anywhere in the string?"
- Normalize once: extract `query.toLowerCase()` into a variable rather than calling it inside the filter callback
- Notice whether the component re-renders on every keystroke and consider whether that's a concern at scale
- Mention debouncing as a consideration for larger lists or API-backed search
- Wrap up by summarising what was changed and why — not just fix and move on

```javascript
function App() {
  const [query, setQuery] = useState("");
  const items = ["Apple", "Banana", "Apricot", "Blueberry"];

  const normalized = query.toLowerCase().trim();
  const filtered = normalized
    ? items.filter(item => item.toLowerCase().includes(normalized))
    : items;

  return (
    <>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filtered.map(item => <li key={item}>{item}</li>)}
      </ul>
    </>
  );
}
```

</details>

---

## What the Teammate is actually evaluating

- Do they ask clarifying questions before assuming?
- Do they say what they're seeing, not just silently edit?
- Do they propose changes collaboratively ("Want me to try…?") rather than just doing it?
- Do they take feedback without getting defensive?
- Is it comfortable to work with them?

---

## Notes for the demo

- Model the questions explicitly. Say out loud: "I'm going to ask a question first before I touch anything" — then ask it. Juniors often skip this because they feel it signals uncertainty. It actually signals professionalism.
- The fix itself is simple. The conversation around it is what the Teammate is watching.
- If a volunteer tries this live, give them structured feedback: did they narrate? did they ask? did they explain their change?

# Demo notes — Week 4 (Context, React Router, UI libraries)

The week 3 demo app (`react/demo/app`) already has a **header with nav links**, **interest count**, **pet cards**, and **AdoptionForm**. Week 4 is a good time to make the shell feel like a real multi-page app and to show **Context** where props would be awkward — without throwing away what students already understand.

---

## 1. Context — start from a pain they can see

**The goal:** Connect Context to “something many components need” and to avoiding prop drilling — not to replace every `useState` in the app.

**What to point at first:** In `App.jsx`, the **“♥ Interested in N pets”** counter and `petsMarkedAsInterested` live next to the pet list. Ask: *If we moved the count badge into a deeply nested component, what would we have to pass down?* That frames Context as **optional infrastructure**, not a new state system.

**Live options (pick one depth level for your group):**

1. **Minimal (5–10 min):** Add a `ThemeContext` (`'light' | 'dark'`) that toggles a class on `<body>` or a root `<div>` and flips a few CSS variables in `App.css`. Put the toggle in the header. One Provider in `main.jsx` or `App.jsx`, one `useContext` in the toggle — easy to follow.

2. **“Paws-shaped” example:** Introduce a `FavouritesContext` that holds `petsMarkedAsInterested` and `updateInterest`. Move the state out of `App` into a small `FavouritesProvider`, then let `Pet` consume the setter directly **or** keep props on `Pet` but read the count in the header from context — both show the pattern. *Note:* For teaching, the theme example is often clearer because the value is obviously global; favourites overlap with “lifting state up” from week 2–3, so explain why Context is justified (many consumers / depth).

**Talking points:**

- **`createContext(default)`** — default is for “no Provider above” (tests, mistakes); production tree should wrap a Provider.
- **`<FooContext.Provider value={…}>`** — the GitBook snippet that uses `<UserSettingsContext value={…}>` is a common typo; the Provider is the component with the `value` prop.
- **Shape of `value`** — match what you pass to what you destructure in `useContext`; split contexts if unrelated data changes at different rates.

---

## 2. React Router — replace `#` links with real routes

**Current state:** `App.jsx` uses `<a href="#">` in the nav. That’s an ideal before/after: “nothing happens / page doesn’t behave like a multipage site” vs client-side routing.

**Dependency:** Align with current docs — React Router v7 uses the **`react-router`** package and imports such as:

```jsx
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
```

**Structural recipe (recommended for the demo):**

1. **`main.jsx`:** Wrap the tree in `<BrowserRouter>`. Optionally keep `<Routes>` here with one route per top-level page, *or* use a single route that renders `<App />` where `<App />` contains nested routes — both are teachable; the former is simpler for beginners.

2. **Split views:** Extract page-level components that match your story, for example:
   - **Home** — hero + short intro (and maybe a teaser link to Pets).
   - **Pets** — current `<Section>` with `fetch`, grid, interest logic.
   - **About / Contact** — short static content (mirrors the **portfolio** exercise: `/`, `/about`, `/contact`).

3. **Shared chrome:** Lift the **header** (logo, nav, favourites count) into a **`Layout`** component that wraps an **`<Outlet />`** from `react-router` so every page keeps the same frame. Navbar links become **`<NavLink to="…">`** so you can show **active styling** (`className` or `style` callbacks) — that lands the “why not plain `<a href>`?” point.

**What to show in DevTools:**

- Changing the URL updates the UI **without** a full document reload (Network: first load only).
- **`NavLink`** updates when the location changes — contrast with `<a href="/about">` causing a full refresh if removed from Router (optional one-off demo).

---

## 3. Component / UI libraries — keep the demo vanilla, demo MUI briefly

**The goal:** Students should understand **benefits vs lock-in** without spending the whole session in MUI APIs.

**Suggestion:** Keep the HYF demo ** mostly unstyled / existing CSS**. For **Material UI**, do a **separate scratch folder** or a **10-minute sidebar**: add `ThemeProvider` + `createTheme`, drop one `Button` or `Switch` next to a native button, and mention that MUI’s theme is **Provider-based** — same mental model as this week’s Context lesson.

**If you integrate MUI into the main demo:** Do it only if time allows; otherwise assign MUI theme work as **homework** where the session plan calls for it.

---

## 4. Mapping demos to the four exercises

| Exercise              | Demo tie-in |
|-----------------------|------------|
| React.dev challenge   | After live Context recipe, students work solo on the official challenge. |
| Theme context         | Same as §1 — your live `ThemeContext` is the starter; homework extends it or adds MUI’s theme. |
| Localization          | Covered in homework / exercises (e.g. session plan); no locale demo assumed here. |
| Portfolio routing     | Mirror the **Layout + `Outlet` + three routes** pattern you showed with Home / About / Contact / Pets. |

---

## 5. Gotchas / things that trip up students

- **Provider typo:** `createContext` returns an object with `.Provider` — you don’t render the context object itself as JSX.
- **`value` identity:** Inline `value={{ x: 1 }}` creates a new object every render and can cause unnecessary re-renders of all consumers; for production you’d memoize (`useMemo`) or split context. Mention lightly so they’re not surprised later.
- **Router location:** Putting `BrowserRouter` **inside** a component that unmounts will reset routing state — keep it at the root.
- **`NavLink` `end` prop:** For the home route `/`, sometimes you need **`end`** so `/about` doesn’t also mark Home as active — show when links look “all active”.
- **`react-router` vs `react-router-dom`:** v7 recommends `react-router`; `react-router-dom` still works as a re-export for older tutorials — expect mixed Stack Overflow answers.

---

## 6. Optional cleanup (not required for week 4)

- **`AdoptionForm`:** `setIsLoading(false)` is missing on the success path — requests stay “submitting” until noticed; easy quick win if you touch the file anyway.
- **`Pet.jsx`:** `updateInterest(details.id, !isInterested)` when `isInterested` is `undefined` works (`!undefined` → true), but being explicit (`Boolean(isInterested)`) can reduce confusion during review.

# Fetch API Guide

How to call your backend API from frontend JavaScript.

## GET Request

Use GET to **read** data from the server.

```javascript
async function fetchData() {
  const response = await fetch("/users");
  const data = await response.json();
  console.log(data);
}
```

## POST Request

Use POST to **create** data on the server.

```javascript
async function saveData() {
  const response = await fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test",
    }),
  });

  const data = await response.json();
  console.log(data);
}
```

## Key Points

- `fetch()` returns a Promise, so use `await`
- `response.json()` also returns a Promise, so use `await` again
- POST requests need:
  - `method: "POST"`
  - `headers: { "Content-Type": "application/json" }` - tells the server you're sending JSON
  - `body: JSON.stringify(...)` - converts your JavaScript object to a JSON string

## Common Mistakes

❌ Forgetting `Content-Type` header (server won't parse the body)
❌ Forgetting `JSON.stringify` (sends `[object Object]`)

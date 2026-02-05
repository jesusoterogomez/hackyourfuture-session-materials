# Week 2 – Backend & APIs (Class Outline)

## Goal of the session

- Understand how the frontend talks to a backend
- Learn how to call an API endpoint
- Make a first backend endpoint that reads/writes from a database

---

## 1. Quick recap (frontend, backend, APIs)

- What runs in the browser vs on the server
- What an API is and why it exists
- How data flows between frontend and backend

(Using slides from the Web Architecture class)

---

## 2. Check-in on Week 1

- Quick status check on Week 1 milestones
- Being behind is ok, this is just to adjust pacing

---

## 3. Week 2 milestone overview

- Moving data out of the frontend
- Fetching data from a backend
- Introducing persistence (database)

We’ll focus on _concepts_, not busywork.

---

## 4. Demo: moving cards to the backend

- Take the card list out of the frontend
- Create a backend endpoint that returns the cards
- Frontend fetches cards from the API instead of hardcoding them

This checks the box of “calling an endpoint”.

---

## 5. New endpoint with a database call

- Introduce a small SQLite database
- Create an endpoint that writes data to the DB (game results)
- Create an endpoint that reads data back (results list / leaderboard)

No manual seeding required.

---

## 6. Hands-on time

- Students connect their frontend to the backend
- Help with:
  - fetching data
  - game logic
  - backend questions
- Faster students can extend functionality

---

## 7. Wrap-up

- What we learned today
- How this fits into the full-stack picture
- What to continue working on after class

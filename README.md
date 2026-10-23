# Express.js REST API Midterm App

This project is a small Express.js application that demonstrates routing, middleware, static file hosting, MVC-style organization, and CRUD operations.

## Installation

1. Clone the project.
2. In the project root, run:
   ```bash
   npm install
   ```

## Run the Server

Start the app with:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The server will run on port 3000 by default, or on the value from the PORT environment variable if one is available.

## Homepage

The homepage is served from the root URL `/` and includes the text:

```text
Welcome to the Midterm App
```

It also serves a CSS file and an image from the `public` folder.

## API Endpoints

Base path: `/api/items`

- `GET /api/items` — returns all items with a success flag, item count, and array of items.
- `GET /api/items/:id` — returns one item by ID; if not found, returns a 404 JSON response.
- `POST /api/items` — creates a new item with an auto-generated numeric ID.
- `PATCH /api/items/:id` — updates an existing item using only the fields provided in the request body.
- `DELETE /api/items/:id` — deletes an item by ID; if not found, returns a 404 JSON response.

## Middleware

- Request logging is recorded in `logs/requests.txt`.
- Unexpected application errors are logged in `logs/error.txt`.
- Unknown routes return a JSON 404 response with a clear message.

## Notes

- The app loads items from `data/items.json` when it starts.
- CRUD changes are stored in memory for the current server session.
- Restarting the server resets the data to the original JSON contents.


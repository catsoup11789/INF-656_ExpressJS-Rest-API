# Witching & Wonder

This project is a small Express.js application for a Halloween-inspired storefront called Witching & Wonder. It serves a themed landing page, a browse page for shopping items, and a REST API for the item catalog.

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

The server runs on port 3000 by default, or on the `PORT` environment variable if one is set.

## Pages

- `/` — landing page for Witching & Wonder
- `/browse` — browse page that displays Witching & Wonder items

## API Endpoints

Base path: `/api/items`

- `GET /api/items` — returns all items with filtering and sorting support
  - query params:
    - `category` — filter by category
    - `name` — search by item name
    - `minPrice` — minimum price
    - `maxPrice` — maximum price
    - `sort` — sort by `id`, `name`, `category`, or `price`
    - `order` — `asc` or `desc`
- `GET /api/items/:id` — returns one item by ID
- `POST /api/items` — creates a new item
- `PATCH /api/items/:id` — updates an existing item
- `DELETE /api/items/:id` — deletes an item by ID

## Example Requests

```bash
GET /api/items?category=Rituals
GET /api/items?sort=price&order=desc
GET /api/items?name=moon&category=Jewelry
```

## Middleware

- Request logging is written to `logs/requests.txt`.
- App errors are logged to `logs/error.txt`.
- Unknown routes return a JSON 404 response.

## Notes

- Item data is loaded from `data/items.json` when the server starts.
- CRUD changes are kept in memory for the current server session only.
- Restarting the server resets the data to the JSON file contents.

# Witching & Wonder

This project is a Halloween-inspired storefront API for Witching & Wonder. It serves a themed landing page and browse page, while the REST API stores and retrieves catalog items from MongoDB instead of a JSON file.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- dotenv

## Installation

1. Clone the project.
2. In the project root, install dependencies:

```bash
npm install
```

3. Create a local `.env` file in the project root using `.env.example` as a template:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017
DB_NAME=witchingWonder
```

4. Start MongoDB locally or connect to MongoDB Atlas.

## Seed the Database

This project includes a seed script that populates the `items` collection with the original catalog data from the midterm JSON file.

```bash
npm run seed
```

The `items` collection should contain item documents with:
- `name`
- `category`
- `price`
- MongoDB-generated `_id`

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

- `GET /api/items` — returns all items
  - query params:
    - `category` — filter by category
    - `name` — search by item name
    - `minPrice` — minimum price
    - `maxPrice` — maximum price
    - `sort` — sort by `name`, `category`, or `price`
    - `order` — `asc` or `desc`
- `GET /api/items/:id` — returns one item by MongoDB `_id`
- `POST /api/items` — creates a new item
- `PATCH /api/items/:id` — updates an existing item
- `DELETE /api/items/:id` — deletes an item by MongoDB `_id`

## MongoDB Behavior

- The app connects to MongoDB when the server starts.
- The database name is stored in `DB_NAME` from `.env`.
- The collection used for items is named `items`.
- MongoDB automatically generates each document's `_id`.
- Invalid MongoDB IDs return a `400` error response.
- Missing items return a `404` response.

## Example Requests

```bash
GET /api/items
GET /api/items?category=Rituals
GET /api/items?sort=price&order=desc
GET /api/items?name=moon&category=Jewelry
POST /api/items
PATCH /api/items/507f1f77bcf86cd799439011
DELETE /api/items/507f1f77bcf86cd799439011
```

Example JSON body for creating or updating an item:

```json
{
  "name": "Moonstone Charm",
  "category": "Jewelry",
  "price": 28.0
}
```

## Middleware

- Request logging is written to `logs/requests.txt`.
- App errors are logged to `logs/error.txt`.
- Unknown routes return a JSON 404 response.
- Global error handling sends structured JSON error responses.

## Project Structure

```text
app.js
server.js
config/
  db.js
controllers/
  itemController.js
middleware/
  errorHandler.js
  requestLogger.js
routes/
  itemRoutes.js
public/
seedItems.js
```

## Notes

- Item data is now stored in MongoDB rather than `data/items.json`.
- The API keeps the same CRUD operations and route layout from the midterm project.
- The application should not store real database credentials in JavaScript files.
- The `.env` file is local-only and should not be committed to source control.

# Task API

A simple in-memory CRUD API for managing a to-do list, built with Node.js and Express. Supports full Create, Read, Update, and Delete operations on tasks, with interactive API docs via Swagger UI.

## Install & Run

```bash
npm install && node main.js
```

The server starts on `http://localhost:3000`.

## Endpoints

| Method | Path         | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/`          | API info                |
| GET    | `/health`    | Health check            |
| GET    | `/tasks`     | List all tasks          |
| GET    | `/tasks/:id` | Get a single task by id |
| POST   | `/tasks`     | Create a new task       |
| PUT    | `/tasks/:id` | Update a task by id     |
| DELETE | `/tasks/:id` | Delete a task by id     |

## Example Request

```bash
curl -i http://localhost:3000/tasks
```

## Swagger UI

Interactive API docs are available at `http://localhost:3000/docs` once the server is running. Every endpoint can be tested directly from the page via "Try it out."



## Status Codes

| Code | Meaning                    |
| ---- | -------------------------- |
| 200  | Successful read/update     |
| 201  | Task created               |
| 204  | Task deleted               |
| 400  | Invalid or missing `title` |
| 404  | Task not found             |

## Notes

- Data is stored in memory only — restarting the server resets tasks back to the 3 seed examples. No database is used at this stage (that's next week).
- `title` is required on both create (`POST`) and update (`PUT`); a missing or empty title returns `400`.

## Working Screenshot

![Swagger UI screenshot](swagger-ui-screenshot.png)

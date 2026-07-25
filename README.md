# Task CRUD API

A task management REST API built across three assignments:

- **Version 1** — in-memory storage (Express)
- **Version 2** — SQLite file storage
- **Version 3 (this)** — containerized PostgreSQL, with the whole stack (app + database) 
  started using a single `docker compose up`

The API itself never changed across all three — only the storage underneath.

## Run it

```bash
git clone https://github.com/udyzodd/task-crud-api.git
cd task-crud-api
cp .env.example .env
docker compose up
```

The API will be available at `http://localhost:3000`.

## Environment variables

See `.env.example` for the required keys. Copy it to `.env` before running:

```
DATABASE_URL=postgres://postgres:dev@db:5432/tasks
```

`.env` is git-ignored and never committed — only `.env.example` (with placeholder values) is tracked.

## Endpoints

| Method | Path | Description | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | /tasks | List all tasks | 200 | —   |
| GET | /tasks/:id | Get a single task | 200 | 404 |
| POST | /tasks | Create a task | 201 | 400 |
| PUT | /tasks/:id | Update a task | 200 | 400, 404 |
| DELETE | /tasks/:id | Delete a task | 204 | 404 |

## Example

```bash
curl -i http://localhost:3000/tasks
```

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[{"id":1,"title":"Buy milk","done":false},{"id":2,"title":"Walk the dog","done":true},{"id":3,"title":"Finish assignment","done":false}]
```

## Persistence

Task data survives a full stack restart, since it lives in a named Docker volume 
(`taskdata`) rather than inside the containers themselves:

```bash
docker compose down
docker compose up
```

Tested: created tasks, tore the whole stack down, brought it back up — same rows, same data.

## Notes / troubleshooting

- **Postgres 18 data directory format**: the official `postgres` image changed its 
  expected data-directory layout in v18. Running the plain `docker run` command with 
  `-v taskdata:/var/lib/postgresql/data` caused a startup crash (`Exited (1)`) whenever 
  the volume had any pre-existing filesystem artifacts (e.g. a `lost+found` folder created 
  by the filesystem itself, which Postgres's init script mistook for leftover database data).
  **Fix**: set `PGDATA=/var/lib/postgresql/data/pgdata` on the `db` service, so Postgres 
  stores its files one level deeper inside the mount, away from any filesystem-level clutter.
- **Startup race condition**: `depends_on` alone only waits for the `db` container to 
  *start*, not for Postgres to actually be ready to accept connections — Postgres takes a 
  few seconds to initialize on a fresh volume. The `api` service crashed with `ECONNREFUSED` 
  on the first `docker compose up` attempt as a result.
  **Fix**: added a `healthcheck` (`pg_isready`) to the `db` service, and changed `api`'s 
  `depends_on` to `condition: service_healthy`, so the app only starts once Postgres is 
  confirmed ready.

## Database screenshot
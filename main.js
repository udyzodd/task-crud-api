
const db = require('./db');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const openapiSpec = require('./openapi.json');

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

let tasks = [
    { id: 1, title: "Buy milk", done: false },
    { id: 2, title: "Walk the dog", done: true },
    { id: 3, title: "Finish assignment", done: false }
];
// main
app.get('/', (req, res) => {
    res.status(200).json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});
// health
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
// tasks
app.get('/tasks', (req, res) => {
    const tasks = db.prepare('select * from tasks;').all();
    res.status(200).json(tasks);
});
// task by id
app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = db.prepare('select * from tasks where id = ?').get(id);

    if (!task) {
        return res.status(404).json({ error: `Task ${id} not found` });
    }
    res.status(200).json(task);
});

// post task
app.post('/tasks', (req, res) => {
    const task = req.body;

    if (!task.title || typeof task.title !== 'string' || task.title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }
    const insert = db.prepare('insert into tasks (title, done) values (?, ?)');
    const result  = insert.run(task.title, 0);
    const newTask = db.prepare('select * from tasks where id = ?').get(result.lastInsertRowid);
    res.status(201).json(newTask);
});

// put(update) task
app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = req.body;

    if (!task.title || typeof task.title !== 'string' || task.title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }
    const doneValue = task.done ? 1 : 0;
    const update = db.prepare('update tasks set title = ?, done = ? where id = ?');
    const result = update.run(task.title, doneValue, id);

    if(result.changes === 0) { // no rows affected = task not found
        return res.status(404).json({ error: `Task ${id} not found` });
    }
    const updatedTasks = db.prepare('select * from tasks where id = ? ').get(id);
    res.status(200).json(updatedTasks);
});

// delete task
app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    const deleteStmt = db.prepare('delete from tasks where id = ?');
    const result = deleteStmt.run(id);  

    if(result.changes === 0) {
        return res.status(404).json({error: `Task ${id} not found`});
    }
    res.status(204).send();
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

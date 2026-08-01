
const { pool, init } = require('./db');

init().then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
const supabase = require('./supabaseClient');

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const openapiSpec = require('./openapi.json');

app.use(express.json()); // for req.body
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
app.get('/tasks', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM tasks');
    res.status(200).json(rows);
});
// task by id
app.get('/tasks/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: `Task ${id} not found` });
    }
    res.status(200).json(rows[0]);
});

// post task
app.post('/tasks', async (req, res) => {
    const task = req.body;

    if (!task.title || typeof task.title !== 'string' || task.title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }
    const { rows } = await pool.query(`INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *`, [task.title, false]);
    res.status(201).json(rows[0]);
});

//signup
app.post('/auth/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' })
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return res.status(400).json({ error: error.message })
    }

    res.status(201).json(data)
})

//login
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    // email = "test@example.com"
    // password = "password123"
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' })
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return res.status(400).json({ error: error.message })
    }

    res.status(200).json({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
    });
})

// put(update) task
app.put('/tasks/:id', async (req, res) => {
    const id = Number(req.params.id);
    const task = req.body;

    if (!task.title || typeof task.title !== 'string' || task.title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }
    const doneValue = task.done ? 1 : 0;
    const { rows } = await pool.query(`UPDATE tasks SET title = $1, done = $2 WHERE id = $3 RETURNING *`, [task.title, doneValue, id]);
    if (rows.length === 0) {
        return res.status(404).json({ error: `Tasks ${id} not found` });
    }
    res.status(200).json(rows[0]);
});

// delete task
app.delete('/tasks/:id', async (req, res) => {
    const id = Number(req.params.id);

    const { rows } = await pool.query(`DELETE FROM tasks WHERE id = $1 RETURNING *`, [id]);
    if (rows.length === 0) {
        return res.status(404).json({ error: `Task ${id} not found` });
    }
    res.status(204).send();
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});


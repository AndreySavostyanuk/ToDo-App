const config = require('../config');
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

console.log(config)

const getTodoList = (request, response) => {
    pool.query('SELECT * FROM todo ORDER BY id ASC', (error, results) => {
        if (error) {
            throw  error;
        }
        response.status(200).json(results.rows)
    });
};

const getActive = (request, response) => {
    pool.query('SELECT * FROM todo ORDER BY id ASC', (error, results) => {
        if (error) {
            throw  error;
        }
        response.status(200).json(results.rows)
    });
};

const getTodoItemById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM todo WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
    });
};

const createTodoItem = (request, response) => {
    const {text, active} = request.body;

    pool.query('INSERT INTO todo (text, active) VALUES ($1, $2)', [text, active], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send('User added with ID: ${result.insertId}')
    });
};

const updateTodoItem = (request, response) => {
    const id = parseInt(request.params.id);
    const {active} = request.body;

    pool.query('UPDATE todo SET active = $1 WHERE id = $2',
        [active, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
};

const updateText = (request, response) => {
    const id = parseInt(request.params.id);
    const {text} = request.body;

    pool.query('UPDATE todo SET text = $1 WHERE id = $2',
        [text, id],
        (error, results) => {
            if (error) {
                throw error;
            }
        }
    )
};

const updateActive = (request, response) => {
    const id = parseInt(request.params.id);
    const {active} = request.body;

    pool.query('UPDATE todo SET active = $1',
        [active],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
};

const deleteTodoItem = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM todo WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    });
};

const deleteAllActive = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM todo WHERE active = true', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    });
};

module.exports = {
    updateText,
    getTodoList,
    getActive,
    getTodoItemById,
    createTodoItem,
    updateTodoItem,
    deleteTodoItem,
    deleteAllActive,
    updateActive,
};

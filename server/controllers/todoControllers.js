
const config = require('../config')
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'todo_user',
    host: 'localhost',
    database: 'todo',
    password: 'qwerty',
    port: 5432,
});

console.log(config)

const getUsers = (request, response) => {
    pool.query('SELECT * FROM todo ORDER BY id ASC', (error, results) => {
        if (error) {
            throw  error ;
        };
        response.status(200).json(results.rows)
    });
};

const getActive = (request, response) => {
    pool.query('SELECT * FROM todo ORDER BY id ASC', (error, results) => {
        if (error) {
            throw  error ;
        };
        response.status(200).json(results.rows)
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM todo WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error ;
        };
        response.status(200).json(results.rows)
    });
};

const  createUser = (request, response) => {
    const { text, active } = request.body;

    pool.query('INSERT INTO todo (text, active) VALUES ($1, $2)', [text, active], (error, results) => {
        if (error) {
            throw error ;
        };
        response.status(201).send('User added with ID: ${result.insertId}')
    });
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { active } = request.body;

    pool.query('UPDATE todo SET active = $1 WHERE id = $2',
        [ active, id],
        (error, results) => {
            if (error) {
                throw error ;
            };
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
};

const updateText = (request, response) => {
    const id = parseInt(request.params.id);
    const { text } = request.body;

    pool.query('UPDATE todo SET text = $1 WHERE id = $2',
        [ text, id],
        (error, results) => {
            if (error) {
                throw error ;
            };
        }
    )
};

const updateActive = (request, response) => {
    const id = parseInt(request.params.id);
    const { active } = request.body;

    pool.query('UPDATE todo SET active = $1' ,
        [ active ],
        (error, results) => {
            if (error) {
                throw error ;
            };
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM todo WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error ;
        };
        response.status(200).send(`User deleted with ID: ${id}`)
    });
};

const deleteAllActive = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM todo WHERE active = true', (error, results) =>{
        if (error) {
            throw error ;
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    });
};

module.exports = {
    updateText,
    getUsers,
    getActive,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    deleteAllActive,
    updateActive,
};



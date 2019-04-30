const express = require('express');
const bodyParser = require('body-parser');
const db = require('./controllers/todoControllers');
const cors = require('cors')

const routes = express();
const port = 3000;

routes.use(cors());

routes.use(bodyParser.json());
routes.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

routes.get('/',(request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

routes.get('/users', db.getUsers);
routes.get('/users/active', db.getActive);
routes.get('/users/:id', db.getUserById);
routes.post('/users', db.createUser);
routes.put('/users/:id', db.updateUser);
routes.put('/users/text/:id', db.updateText);
routes.delete('/users/:id', db.deleteUser);
routes.delete('/users', db.deleteAllActive);
routes.put('/users', db.updateActive);


routes.listen(port, () => {
    console.log(`App running on port ${port}.`);
});


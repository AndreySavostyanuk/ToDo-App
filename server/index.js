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

routes.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'});
});

routes.get('/todoList', db.getTodoList);
routes.get('/todoList/active', db.getActive);
routes.get('/todoList/:id', db.getTodoItemById);
routes.post('/todoList', db.createTodoItem);
routes.put('/todoList/:id', db.updateTodoItem);
routes.put('/todoList/text/:id', db.updateText);
routes.delete('/todoList/:id', db.deleteTodoItem);
routes.delete('/todoList', db.deleteAllActive);
routes.put('/todoList', db.updateActive);


routes.listen(port, () => {
    console.log(`App running on port ${port}.`);
});


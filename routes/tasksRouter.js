const { Router } = require('express');
const { getTasks, addTask, deleteTask, updateTask, toggleTaskStatus } = require('../controllers/tasksController');

const tasksRouter = Router();

tasksRouter.get('/:id/tasks', getTasks); 
tasksRouter.post('/:id/add', addTask); 

tasksRouter.put('/toggleStatus', toggleTaskStatus);
tasksRouter.put('/update', updateTask);


tasksRouter.delete('/delete', deleteTask);  

module.exports = { tasksRouter };

const { Router } = require('express');

const { addUser, loginUser } = require('../controllers/usersController');

const usersRouter = Router();

usersRouter.post('/add-user', addUser);
usersRouter.post('/login', loginUser);

module.exports = { usersRouter };
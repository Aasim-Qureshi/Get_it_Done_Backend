const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require("cors");

require('dotenv').config();

const { usersRouter } = require('./routes/usersRouter');
const { projectsRouter } = require('./routes/projectsRouter');
const authenticateUser = require('./middleware/authenticateUser');
const { tasksRouter } = require('./routes/tasksRouter');

const app = express();

app.use(cookieparser());
app.use(express.json());

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use('/users', usersRouter);
app.use('/projects', authenticateUser, projectsRouter);
app.use('/tasks', authenticateUser, tasksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("App is running on: ", PORT);
});
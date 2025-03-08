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

const corsOptions = {
    origin: ['https://get-it-done-frontend-aasim-qureshis-projects.vercel.app/', 'https://get-it-done-frontend.vercel.app/'],  // Your frontend URL on Vercel
    credentials: true  // Allow cookies to be sent with the request
};

app.use(cors(corsOptions));

app.use('/users', usersRouter);
app.use('/projects', authenticateUser, projectsRouter);
app.use('/tasks', authenticateUser, tasksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("App is running on: ", PORT);
});
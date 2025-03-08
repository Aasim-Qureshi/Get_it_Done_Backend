const { Router } = require('express');

const { 
    getAllProjects, 
    getProject, 
    addProject, 
    deleteProject, 
    updateProject 
} = require('../controllers/projectsController');

const projectsRouter = Router();

projectsRouter.get("/all", getAllProjects);
projectsRouter.get("/project", getProject);

projectsRouter.post("/add-project", addProject);
projectsRouter.put("/update", updateProject);

projectsRouter.delete("/delete", deleteProject);

module.exports = {projectsRouter};
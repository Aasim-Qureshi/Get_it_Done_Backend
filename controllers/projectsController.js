const pool = require('./db');

const getAllProjects = async (req, res) => {
    console.log("something happened")
    try {
        const userId = req.userId;
        console.log("This is the userId: ", userId)
        const result = await pool.query(
            'SELECT * FROM projects WHERE user_id = $1', [userId]);

        res.json({ projects: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

const getProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const result = await pool.query(
            "SELECT * FROM projects WHERE project_id = $1", [projectId]
        );

        res.json({ project: result.rows });
    } catch (err) {
        console.log("There is an error, ", err);
        res.status(500).json({ error: "Server error" });
    }
};

const addProject = async (req, res) => {
    const { name, description, deadline } = req.body;
    const userId = req.userId;

    try {
        const newProject = await pool.query(
            'INSERT INTO projects (user_id, name, description, deadline) VALUES ($1, $2, $3, $4)',
            [userId, name, description, deadline]);

        res.status(201).json({ message: "User added successfully", user: newProject.rows[0] });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
};

const deleteProject = async (req, res) => {
    try{
        const { id } = req.body;

        const deletedProject = await pool.query(
            "DELETE FROM projects WHERE id = $1", [id]
        );

        if(deletedProject.rowCount === 0){
            return res.status(404).json({message: "Project not found"});
        }

        res.json({ message: "Project deleted successfully", deletedProject: deletedProject.rows[0] });

    }catch(err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
};

const updateProject = async (req, res) => {
    try {
        const { id, name, description, deadline } = req.body; // Use `name` instead of `title`

        console.log("Request Body:", req.body); // Log the request payload for debugging

        // Validate that at least one field is provided for update
        if (name === undefined && description === undefined && deadline === undefined) {
            return res.status(400).json({ message: "No fields provided for update" });
        }

        // Build the query dynamically based on the fields provided
        let fieldsToUpdate = [];
        let values = [];
        let counter = 1;

        if (name !== undefined) {
            fieldsToUpdate.push(`name = $${counter}`); // Use `name` instead of `title`
            values.push(name);
            counter++;
        }
        if (description !== undefined) {
            fieldsToUpdate.push(`description = $${counter}`);
            values.push(description);
            counter++;
        }
        if (deadline !== undefined) {
            fieldsToUpdate.push(`deadline = $${counter}`);
            values.push(deadline);
            counter++;
        }

        // Add id as the last parameter for the WHERE clause
        values.push(id);

        // Construct the query
        const query = `
            UPDATE projects 
            SET ${fieldsToUpdate.join(", ")}
            WHERE id = $${counter}
            RETURNING *`;

        console.log("Generated Query:", query); 
        console.log("Query Values:", values); 

        // Execute the query
        const updatedProject = await pool.query(query, values);

        if (updatedProject.rowCount === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        const updatedProjectData = updatedProject.rows[0];

        res.json({ message: "Project updated successfully", updatedProject: updatedProjectData });

    } catch (err) {
        console.error("Error in updateProject:", err); // Log the full error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
};




module.exports = {
    getAllProjects,
    getProject,
    addProject,
    deleteProject,
    updateProject
};
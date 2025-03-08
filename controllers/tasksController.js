const pool = require('./db');

const addTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, deadline } = req.body;

        const result = await pool.query(
            'INSERT INTO tasks (project_id, title, description, deadline) VALUES ($1, $2, $3, $4)',
            [id, title, description, deadline]
        );

        res.status(201).json({ message: "Task added successfully", task: result.rows[0] });

    } catch (err) {
        console.log("There is an error, ", err);
        res.status(500).json({ error: "Error adding task" });
    }
};

const getTasks = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT * FROM tasks WHERE project_id = $1', [id]
        );

        res.json({ projects: result.rows })

    } catch (err) {
        console.log("Error fetching project id: ", err);
        res.status(500).json({ error: "There was an error" })
    }
};

const deleteTask = async (req, res) => {
    try{
        const {id} = req.body;
        console.log(id)

        const deletedTask = await pool.query(
            "DELETE FROM tasks WHERE id = $1", [id]
        );

        if(deletedTask.rowCount === 0){
            return res.status(404).json({message: "Project not found"});
        }

        res.json({ message: "Project deleted successfully", deletedTask: deletedTask.rows[0] });

    }catch(err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
};

const toggleTaskStatus = async (req, res) => {
    try {
        const {id, status} = req.body;
        await pool.query('UPDATE tasks SET status = $1 WHERE id = $2', [status, id]);
        res.status(200).json({message: "Update Successful"});

    }catch(err){
        console.log("There was an error, ", err);
        res.status(500).json({message: "Error"});
    }
}

const updateTask = async (req, res) => {
    try {
        const { id, title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        await pool.query("UPDATE tasks SET title = $1 WHERE id = $2", [title, id]);
        res.status(200).json({ message: "Title Updated Successfully" });

    } catch (err) {
        console.error("Error updating title:", err);
        res.status(500).json({ message: "Error updating title" });
    }
};


module.exports = {
    addTask,
    getTasks,
    deleteTask,
    updateTask,
    toggleTaskStatus
}
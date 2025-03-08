const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pool = require('./db');

const addUser = async (req, res, next) => {
    const { email, username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *', [email, username, hashedPassword]);
            console.log(newUser);
            res.status(201).json({message: "User added successfully", user: newUser.rows[0]});

    }catch(e){
        console.error(e);
        res.status(500).json({ error: "Database error" });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Trial: ", email, password)
    try {
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );

        if(user.rows.length === 0){
            return res.status(400).json({error: "Invalid email or password"});
        }

        const userData = user.rows[0];
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if(!isPasswordValid){
            return res.status(400).json({message: "Incorrect email or password"});
        }

        const token = jwt.sign(
            {userId: userData.id},
            process.env.JWT_SECRET,
            {expiresIn: '12h'}
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 12 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login Successful" });

    }catch(err){
        console.log("This is the error: ", err);
        res.status(500).json({error: "Database error"});
    }
}

module.exports = {
    addUser,
    loginUser
}
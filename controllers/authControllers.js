const authModel = require('../models/authModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// REGISTER ADMIN
async function register(req, res) {
    try {
        const { username, email, password } = req.body;

// Check if an admin already exists
const existingUser = await authModel.findFirstUser();

if (existingUser) {
    return res.status(403).send("An administrator already exists");
}

        if (!username || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        if (password.length < 8) {
            return res.status(400).send("Password must contain at least 8 characters");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user
        const user = await authModel.registerUser({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).send(user);

    } catch (error) {
        if (error.code === '23505' || error.cause?.code === '23505') {
            return res.status(409).send("Username or email already exists");
        }

        res.status(500).send(error.message);
    }
}


// LOGIN ADMIN
async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        // Find user by email
        const user = await authModel.findUserByEmail(email);

        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send("Invalid email or password");
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).send({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    register,
    login
};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../config/db");
const { getUserByEmail } = require("../models/userModel");

dotenv.config();

exports.login = async (req, res) => {
  const { primary_email_address, password } = req.body;

    if (!primary_email_address || !password) {
        return res.status(400).json({ message: 'Primary email address and password are required' });
    }

    try {
        console.log("Checking database for:", primary_email_address);
        
        const [rows] = await db.execute(
            'SELECT * FROM staff_members WHERE primary_email_address = ?',
            [primary_email_address]
        );

        console.log("Database result:", rows);

        if (!rows || rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = rows[0];

        if (user.password !== password) { // Use hashing in real implementation
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, message: 'Login successful' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

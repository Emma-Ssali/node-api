const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Ensure this is correct
const db = require("./config/db");
require("dotenv").config();

const app = express();

db.execute("SELECT * FROM staff_members LIMIT 1")
    .then(([rows]) => console.log("Database Connection Success:", rows))
    .catch((err) => console.error("Database Connection Error:", err));

app.use(bodyParser.json()); // Ensure request body is parsed
app.use("/api", authRoutes); // Prefix all auth routes with /api

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow sending cookies
}));

app.use(cookieParser());

const SECRET_KEY = "Samridhi"; 

// Array of users with username, password, and role
const users = [
    { username: "admin", password: "123456", role: "Admin" },
    { username: "emp", password: "emp123", role: "User" },
    { username: "am", password: "bc", role: "User" },
];

app.get("/", (req, res) => {
    res.send("vbn");
});

// Login Route
app.post("/login", (req, res) => {
    const { username, password, role } = req.body;

    // Find user by username and password
    const user = users.find((u) => u.username === username && u.password === password && u.role === role);

    if (user) {
        // Generate JWT Token with 10s expiration
        const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: "10s" });

        res.cookie("jwtToken", token, {
            httpOnly: true, // Prevent client-side JS from accessing it
            secure: false, // Set `true` if using HTTPS
            sameSite: "Lax", // Lax is good for most cases
            maxAge: 10 * 1000, // 10 seconds
        });

        return res.json({ message: "Login successful", token });
    } else {
        return res.status(401).json({ error: "Invalid credentials" });
    }
});





// Start Server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/registrationDB";
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// API Endpoints
app.post("/register", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Export the app for Vercel's Serverless Functions
module.exports = app;

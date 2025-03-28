const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Save a note for a user
router.post("/save", async (req, res) => {
    try {
        const { userId, text } = req.body;

        if (!userId || !text) {
            return res.status(400).json({ message: "User ID and note text are required." });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        // Add the new note to the user's notes array
        user.notes.push({ text });
        await user.save();

        res.status(200).json({ message: "Note saved successfully!", notes: user.notes });
    } catch (error) {
        console.error("Error saving note:", error);
        res.status(500).json({ message: "Server error. Try again later." });
    }
});

// Get all notes for a user
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        res.status(200).json(user.notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Server error. Try again later." });
    }
});

module.exports = router;

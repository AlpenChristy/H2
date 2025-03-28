const express = require("express");
const router = express.Router();
const Counselor = require("../models/counselor");

// Get all counselors
router.get("/", async (req, res) => {
    try {
        const counselors = await Counselor.find();
        res.json(counselors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

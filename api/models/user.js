const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    notes: [
        {
            text: { type: String, required: true },  // The note content
            createdAt: { type: Date, default: Date.now },  // Timestamp
        },
    ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

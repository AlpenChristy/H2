const mongoose = require("mongoose");

const CounselorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    imageUrl: { type: String, required: true },
    credentials: { type: String, required: true },
    specializations: [{ type: String, required: true }],
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    bio: { type: String, required: true },
});

const Counselor = mongoose.model("Counselor", CounselorSchema);

module.exports = Counselor;

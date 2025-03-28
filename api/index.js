const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Connect to MongoDB
mongoose.connect(
    "mongodb+srv://alpenchristy:alpen@cluster0.weaco.mongodb.net/"
).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});

// Import Models
const User = require("./models/user");
const Message = require("./models/message");
const CounselorRoutes = require("./routes/counselorRoutes");
const NotesRoutes = require("./routes/notesRoutes");



app.use("/api/counselors", CounselorRoutes);
app.use("/api/notes", NotesRoutes); 




// Function to create JWT token
const createToken = (userId) => {
    return jwt.sign({ userId }, "Q$r2k6W8n!jCW%Zk", { expiresIn: "7d" });
};

// **User Registration (With Password Hashing)**
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email: email.toLowerCase(), password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "✅ User registered successfully" });
    } catch (err) {
        console.error("❌ Error registering user:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// **User Login (With Password Verification)**
app.post("/login", async (req, res) => {
    console.log("🔹 Login API hit");

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        // Generate JWT token
        const token = createToken(user._id);
        res.status(200).json({ token, userId: user._id, name: user.name });
    } catch (error) {
        console.error("❌ Error in login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// **Fetch User Details (After Login)**
app.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

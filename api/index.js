const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy


const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");

mongoose.connect(
    "mongodb+srv://alpenchristy:alpen@cluster0.weaco.mongodb.net/"
).then(() => {
    console.log("connected to MongoDB");
}).catch((err) => {
    console.log("error connecting to the MongoDB ", err);
})


app.listen(port, () => {
    console.log("Server running on port", port);
});


const User = require("./models/user");
const Message = require("./models/message");

// Endpoint for user registration
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    // create a new user object
    const newUser = new User({ name, email: email.toLowerCase(), password })

    // save the user to the database
    newUser.save().then(() => {
        res.status(200).json({ message: "User registered successfully" })
    }).catch((err) => {
        res.status(500).json({ message: "Error registering the user!" })
    })
})

//function to create a token
const createToken = (userId) => {
    const payload = {
        userId: userId,
    };

    const token = jwt.sign(payload, "Q$r2k6W8n!jCW%Zk", { expiresIn: "1h" });

    return token;
};


//endpoint for logging in 
app.post("/login", (req, res) => {

    console.log("login hit")
    const { email, password } = req.body;
  
    //check if the email and password are provided
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Email and the password are required" });
    }
  
    //check for that user in the database
    User.findOne({ email: email.toLowerCase() })
      .then((user) => {
        if (!user) {
          //user not found
          return res.status(404).json({ message: "User not found" });
        }
  
        //compare the provided passwords with the password in the database
        if (user.password !== password) {
          return res.status(404).json({ message: "Invalid Password!" });
        }
  
        const token = createToken(user._id);
        res.status(200).json({ token });
      })
      .catch((error) => {
        console.log("error in finding the user", error);
        res.status(500).json({ message: "Internal server Error!" });
      });
  });

const { exec } = require("child_process");
const path = require("path");

exports.chatWithBot = (req, res) => {
    const userInput = req.body.message;

    if (!userInput) {
        return res.status(400).json({ error: "Message is required" });
    }

    // Path to your Python script
    // const pythonScript = path.join(__dirname, "chatbot.py");
    const pythonScript = "D:\H2\main\api\scripts\chatbot.py"

    // Run the Python script and send user input
    const process = exec(`python3 ${pythonScript} "${userInput}"`, (error, stdout, stderr) => {
        if (error) {
            console.error("Error executing Python script:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (stderr) {
            console.error("Python stderr:", stderr);
        }

        // Send chatbot response to React Native frontend
        res.json({ response: stdout.trim() });
    });
};

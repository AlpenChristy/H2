import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import axios from "axios";

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);

    // Function to send message to chatbot API
    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessages = [...messages, { role: "user", text: userInput }];
        setMessages(newMessages);
        setUserInput("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/chat", { message: userInput });
            const botMessage = response.data.response;

            setMessages([...newMessages, { role: "bot", text: botMessage }]);
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages([...newMessages, { role: "bot", text: "Sorry, something went wrong. Please try again!" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.chatContainer}>
                {messages.map((msg, index) => (
                    <View key={index} style={msg.role === "user" ? styles.userMessage : styles.botMessage}>
                        <Text style={styles.messageText}>{msg.text}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={userInput}
                    onChangeText={setUserInput}
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={loading}>
                    <Text style={styles.sendButtonText}>{loading ? "..." : "Send"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
    chatContainer: { flex: 1, marginBottom: 10 },
    userMessage: {
        alignSelf: "flex-end", backgroundColor: "#007bff", padding: 10,
        marginVertical: 5, borderRadius: 10, maxWidth: "80%"
    },
    botMessage: {
        alignSelf: "flex-start", backgroundColor: "#ddd", padding: 10,
        marginVertical: 5, borderRadius: 10, maxWidth: "80%"
    },
    messageText: { color: "#fff", fontSize: 16 },
    inputContainer: {
        flexDirection: "row", alignItems: "center",
        backgroundColor: "#fff", padding: 10, borderRadius: 5,
        borderWidth: 1, borderColor: "#ccc"
    },
    input: { flex: 1, fontSize: 16, marginRight: 10 },
    sendButton: {
        backgroundColor: "#28a745", padding: 10, borderRadius: 5,
        alignItems: "center", justifyContent: "center"
    },
    sendButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default ChatScreen;

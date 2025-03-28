import React, { useState, useEffect } from "react";
import {
    View, Text, ScrollView, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const API_URL = "http://localhost:8000/api/notes"; // Change to your API URL

const NotesScreen = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [userId, setUserId] = useState(null);

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        getUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchNotes();
        }
    }, [userId]);

    const getUserId = async () => {
        try {
            let storedUserId = await AsyncStorage.getItem("userId");
            if (!storedUserId && route.params?.userId) {
                storedUserId = route.params.userId;
                await AsyncStorage.setItem("userId", storedUserId);
            }
            setUserId(storedUserId);
        } catch (error) {
            console.error("Error getting user ID:", error);
        }
    };

    const fetchNotes = async () => {
        try {
            if (!userId) return;
            const response = await axios.get(`${API_URL}/${userId}`);
            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const saveNote = async () => {
        if (!newNote.trim()) {
            Alert.alert("Error", "Note text cannot be empty.");
            return;
        }
        try {
            await axios.post(`${API_URL}/save`, { userId, text: newNote });
            setNewNote("");
            fetchNotes();
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            await axios.delete(`${API_URL}/${userId}/${noteId}`);
            fetchNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const groupNotesByDate = () => {
        const grouped = {};
        notes.forEach((note) => {
            const date = new Date(note.createdAt).toDateString();
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push(note);
        });
        return grouped;
    };

    const groupedNotes = groupNotesByDate();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                {/* 🔹 Back Button */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.title}>Notes</Text>

                {!userId ? (
                    <Text style={styles.loadingText}>Loading user ID...</Text>
                ) : (
                    Object.keys(groupedNotes).map((date) => (
                        <View key={date}>
                            <Text style={styles.dateText}>{date}</Text>
                            {groupedNotes[date].length > 0 ? (
                                groupedNotes[date].map((note) => (
                                    <View key={note._id} style={styles.noteCard}>
                                        <Text style={styles.noteText}>{note.text}</Text>
                                        <TouchableOpacity onPress={() => deleteNote(note._id)} style={styles.deleteButton}>
                                            <Text style={styles.deleteButtonText}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.noNotesText}>No notes found.</Text>
                            )}
                        </View>
                    ))
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    backButton: {
        position: "absolute",
        top: 20,
        left: 15,
        zIndex: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        marginTop: 50, // Adjust to avoid overlapping with back button
    },
    loadingText: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
        marginTop: 20,
    },
    dateText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
    },
    noteCard: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    noteText: {
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: "#213045",
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    noNotesText: {
        fontSize: 16,
        fontStyle: "italic",
        color: "gray",
    },
    input: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    addButton: {
        backgroundColor: "#6200ea",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default NotesScreen;

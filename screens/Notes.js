import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MoodTrackerScreen = () => {
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [notes, setNotes] = useState('');

  const moods = [
    require("../assets/home/Group 1.png"),
    require("../assets/home/Group 2.png"),
    require("../assets/home/Group 3.png"),
    require("../assets/home/Group 4.png"),
    require("../assets/home/Group 5.png"),
  ];

  const emotions = [
    'Enthusiastic', 'Happy', 'Proud', 'Full of love', 'Calm', 'Satisfied', 
    'Like', 'Amazed', 'Relieved', 'Give thanks', 'Relax', 'Inspired', 'Optimistic'
  ];

  const toggleEmotion = (emotion) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]
    );
  };

  const saveNote = async () => {
    try {
        const userId = await AsyncStorage.getItem("userId"); // Get logged-in user ID
        if (!userId) {
            alert("User not found. Please log in again.");
            return;
        }

        const response = await fetch("http://localhost:8000/api/notes/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, text: notes }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Note saved successfully!");
            setNotes("");  // Clear input after saving
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error saving note:", error);
        alert("Failed to save note.");
    }
};


  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

      {/* Mood Section */}
      <View style={styles.moodWrapper}>
        <Text style={styles.moodText}>How's your mood today?</Text>
        <View style={styles.moodContainer}>
          {moods.map((icon, index) => (
            <TouchableOpacity key={index} style={styles.moodButton} onPress={() => setSelectedMood(index)}>
              <Image source={icon} style={styles.moodIcon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Emotions Selection */}
      <Text style={styles.heading}>What emotions are you feeling?</Text>
      <View style={styles.emotionContainer}>
        {emotions.map((emotion) => (
          <TouchableOpacity
            key={emotion}
            style={[
              styles.emotionButton,
              selectedEmotions.includes(emotion) && styles.selectedEmotion
            ]}
            onPress={() => toggleEmotion(emotion)}
          >
            <Text style={styles.emotionText}>{emotion}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notes Section */}
      <Text style={styles.heading}>Can you tell me about your feelings today?</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Type here"
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Return</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MoodTrackerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    padding: 10,
  },
  moodWrapper: {
    backgroundColor: "#D6D3F3",
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 60,  // Added margin to move it lower

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  moodText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 15,
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  moodButton: {
    backgroundColor: "#52B7B6",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  moodIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  emotionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  emotionButton: {
    backgroundColor: '#D6D3F3',
    padding: 10,
    borderRadius: 20,
  },
  selectedEmotion: {
    backgroundColor: '#4CAF50',
  },
  emotionText: {
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    padding: 10,
    borderRadius: 8,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#E6F0FA',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  returnButton: {
    backgroundColor: '#213045',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#213045',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

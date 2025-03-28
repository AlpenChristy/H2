import React, { useEffect, useState } from "react";
import {
  View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator
} from "react-native";
import { Feather } from "@expo/vector-icons"; // Bell icon
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState("User");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId"); // Get user ID dynamically

        if (!userId) {
          console.error("No user ID found in storage");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:8000/user/${userId}`);
        const data = await response.json();

        if (data.name) {
          setUsername(data.name);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Profile Image with Border */}
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/favicon.png")} // Replace with actual profile image
            style={styles.profileImage}
          />
        </View>

        {/* Greeting */}
        {loading ? (
          <ActivityIndicator size="small" color="#8C6FF7" />
        ) : (
          <Text style={styles.greeting}>Hello {username}!</Text>
        )}

        {/* Notification Bell Icon */}
        <TouchableOpacity style={styles.bellIcon}>
          <Feather name="bell" size={24} color="#5C5F7B" />
        </TouchableOpacity>
      </View>

      {/* Mood Section */}
      <View style={styles.moodWrapper}>
        <Text style={styles.moodText}>How's your mood today?</Text>
        <View style={styles.moodContainer}>
          {[
            require("../assets/home/Group 1.png"),
            require("../assets/home/Group 2.png"),
            require("../assets/home/Group 3.png"),
            require("../assets/home/Group 4.png"),
            require("../assets/home/Group 5.png"),
          ].map((icon, index) => (
            <TouchableOpacity key={index} style={styles.moodButton} onPress={() => navigation.navigate('Notes')}>
              <Image source={icon} style={styles.moodIcon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>




      {/* Grid Section */}
      <View style={styles.gridContainer}>
        {[
          { name: "Counseling", icon: require("../assets/home/counseling.png") },
          { name: "Exercises", icon: require("../assets/home/exercises.png") },
          { name: "Therapy", icon: require("../assets/home/counseling-2.png") },
          { name: "Games", icon: require("../assets/home/games.png") },
          { name: "Tests", icon: require("../assets/home/tests.png") },
          { name: "Information", icon: require("../assets/home/information.png") },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.gridItem}>
            <Image source={item.icon} style={styles.gridIcon} />
            <Text style={styles.gridText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Meditation Card */}
      <TouchableOpacity style={styles.meditationCard}>
        {/* Left Side: Text */}
        <Text style={styles.meditationText}>10 minutes meditation for sleep</Text>

        {/* Right Side: Image & Button */}
        <View style={styles.meditationRight}>
          <Image
            source={require("../assets/home/meditation-icon.png")} // Replace with actual clock-like image
            style={styles.meditationImage}
          />
          <TouchableOpacity style={styles.meditationButton}>
            <Text style={styles.meditationButtonText}>▶ Spin</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>


      {/* Chat Bot Section */}
      <TouchableOpacity style={styles.chatCard}>
        <Text style={styles.chatText}>Chat with Aura! Tell us about your day.</Text>
        <View style={styles.chatButton}>
          <Text style={styles.chatButtonText}>Chat Now</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40, // Adjusted to take less upper space
    marginBottom: 20,
  },
  profileContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#8C6FF7", // Purple border
    padding: 2,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
    marginLeft: 10,
  },
  bellIcon: {
    padding: 8,
  },
  moodWrapper: {
    backgroundColor: "#D6D3F3",
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 20,

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1, // Soft opacity
    shadowRadius: 10,

    // Shadow for Android
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
    resizeMode: "contain", // Ensures the full image is shown
  },



  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gridItem: {
    width: "30%", // Ensures a good fit in three columns
    aspectRatio: 1, // Makes it a perfect square
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2CA79B", // Green background
    borderRadius: 25, // Slightly rounded corners for a smoother look
    borderColor: "#282828",
    marginBottom: 15, // Adds space between rows
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, // Softer shadow
    shadowRadius: 6,
    elevation: 4, // Shadow for Android
  },

  gridIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
    resizeMode: "contain",
  },
  gridText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff", // White text for contrast
    textAlign: "center",
  },

  meditationCard: {
    backgroundColor: "#FCE4EC", // Light pink
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  
  meditationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
  },
  
  meditationRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  meditationImage: {
    width: 50,  // Adjust based on your image size
    height: 50,
    marginRight: 10,
    resizeMode: "contain",
  },
  
  meditationButton: {
    backgroundColor: "#D36D6D", // Soft red for contrast
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  
  meditationButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  
  chatCard: {
    backgroundColor: "#C8E6C9",
    padding: 15,
    borderRadius: 10,
  },
  chatText: {
    fontSize: 14,
    marginBottom: 10,
  },
  chatButton: {
    backgroundColor: "#388E3C",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  chatButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;

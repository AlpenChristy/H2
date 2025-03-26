import React from "react";
import { 
  View, Text, Image, StyleSheet, TouchableOpacity, ScrollView 
} from "react-native";
import { Feather } from "@expo/vector-icons"; // Bell icon

const HomeScreen = () => {
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
        <Text style={styles.greeting}>Hello Batman!</Text>

        {/* Notification Bell Icon */}
        <TouchableOpacity style={styles.bellIcon}>
          <Feather name="bell" size={24} color="#5C5F7B" />
        </TouchableOpacity>
      </View>

      {/* Mood Section */}
      <Text style={styles.moodText}>How's your mood today?</Text>
      <View style={styles.moodContainer}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity key={index} style={styles.moodButton}>
            <Image 
              source={require("../assets/home/Group 1.png")} // Replace with actual mood icons
              style={styles.moodIcon} 
            />
          </TouchableOpacity>
        ))}
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
        <Text style={styles.meditationText}>10-minute meditation for sleep</Text>
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
  moodText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  moodButton: {
    backgroundColor: "#E3F2FD",
    padding: 10,
    borderRadius: 50,
  },
  moodIcon: {
    width: 40,
    height: 40,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gridItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
  },
  gridIcon: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  gridText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  meditationCard: {
    backgroundColor: "#FFEBEE",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  meditationText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
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

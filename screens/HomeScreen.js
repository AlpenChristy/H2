import React from "react";
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from "react-native";
import { FaRegBell } from "react-icons/fa6";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile and Greeting */}
      <View style={styles.header}>
        <Image source={require("../assets/favicon.png")} style={styles.profileImage} />
        <Text style={styles.greeting}>Hello Batman!</Text>
        <Image source={<FaRegBell />} style={styles.bellIcon} />
      </View>

      {/* Mood Section */}
      <Text style={styles.moodText}>How's your mood today?</Text>
      <View style={styles.moodContainer}>
        {[...Array(5)].map((_, index) => (
          <Pressable key={index} style={styles.moodButton}>
            <Image source={require("../assets/home/Group 1.png")} style={styles.moodIcon} />
          </Pressable>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.gridContainer}>
        {[
          { name: "Counseling", icon: require("../assets/home/counseling.png") },
          { name: "Exercises", icon: require("../assets/home/exercises.png") },
          { name: "Counseling", icon: require("../assets/home/counseling-2.png") },
          { name: "Games", icon: require("../assets/home/games.png") },
          { name: "Tests", icon: require("../assets/home/tests.png") },
          { name: "Information", icon: require("../assets/home/information.png") },
        ].map((item, index) => (
          <Pressable key={index} style={styles.gridItem} onPress={() => console.log(item.name)}>
            <Image source={item.icon} style={styles.gridIcon} />
            <Text style={styles.gridText}>{item.name}</Text>
          </Pressable>
        ))}
      </View>

      {/* Meditation Card */}
      <Pressable style={styles.meditationCard}>
        <Text style={styles.meditationText}>10 minutes meditation for sleep</Text>
        <Image source={require("../assets/play.png")} style={styles.playIcon} />
      </Pressable>

      {/* Chat Bot Section */}
      <Pressable style={styles.chatCard}>
        <Text style={styles.chatText}>Chat with Aura! Chat with our Bot, and tell us about your day.</Text>
        <View style={styles.chatButton}>
          <Text style={styles.chatButtonText}>Chat Now</Text>
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FD", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  profileImage: { width: 50, height: 50, borderRadius: 25 },
  greeting: { fontSize: 20, fontWeight: "bold", color: "#333" },
  bellIcon: { width: 25, height: 25 },
  moodText: { fontSize: 16, textAlign: "center", marginBottom: 10 },
  moodContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  moodButton: { backgroundColor: "#E3F2FD", padding: 10, borderRadius: 50 },
  moodIcon: { width: 40, height: 40 },
  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  gridItem: { width: "30%", alignItems: "center", marginBottom: 20 },
  gridIcon: { width: 60, height: 60, marginBottom: 5 },
  gridText: { fontSize: 14, color: "#555" },
  meditationCard: { backgroundColor: "#FFEBEE", padding: 15, borderRadius: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  meditationText: { fontSize: 16, color: "#333" },
  playIcon: { width: 30, height: 30 },
  chatCard: { backgroundColor: "#C8E6C9", padding: 15, borderRadius: 10 },
  chatText: { fontSize: 14, marginBottom: 10 },
  chatButton: { backgroundColor: "#388E3C", padding: 10, borderRadius: 5, alignSelf: "flex-start" },
  chatButtonText: { color: "#fff", fontWeight: "bold" },
});

export default HomeScreen;

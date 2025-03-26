import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons"; // Import icons

const SignUp = ({ navigation }) => {
  return (
    <LinearGradient colors={["#D3C5F5", "#A6A5D8"]} style={styles.container}>
      <Text style={styles.title}>Explore the app</Text>
      <Text style={styles.subtitle}>
        Now your finances are in one place and always under control
      </Text>

      {/* Google Button */}
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="google" size={20} color="black" style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Apple Button */}
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="apple" size={20} color="black" style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </TouchableOpacity>

      {/* Email Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup-2')}>
        <FontAwesome name="envelope" size={20} color="black" style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Email</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text style={styles.linkText} onPress={() => navigation.navigate("Login")}>
          Log in
        </Text>
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    elevation: 3, // For shadow on Android
    shadowColor: "#000", // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  icon: {
    position: "absolute",
    left: 20,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#6B7280",
  },
  linkText: {
    color: "#2563EB",
    fontWeight: "bold",
  },
});

export default SignUp;

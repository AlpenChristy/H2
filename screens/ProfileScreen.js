import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: "Loading...", // Placeholder until data is fetched
    handle: "@username",
    imageUrl: "https://api.a0.dev/assets/image?text=profile&seed=33",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          console.log("❌ No user ID found");
          return;
        }

        console.log("✅ Fetching user data for ID:", userId);

        const response = await fetch(`http://192.168.29.77:8000/user/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUser({
            name: data.name,
            handle: `@${data.name.toLowerCase()}`, // Auto-generate handle
            imageUrl: data.imageUrl || user.imageUrl, // Keep default if no image
          });
        } else {
          console.log("❌ Error fetching user:", data.message);
        }
      } catch (error) {
        console.error("❌ Fetch Error:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken"); // Remove auth token
      await AsyncStorage.removeItem("userId");    // Remove user ID

      console.log("✅ User logged out");

      // Navigate back to the Login screen
      navigation.replace("Login1");
    } catch (error) {
      console.error("❌ Logout Error:", error);
    }
  };


  const menuItems = [
    { icon: "bookmark-outline", title: "Saved Notes", subtitle: "View your saved journals", route: "SavedNotes" },
    { icon: "document-text-outline", title: "Reports", subtitle: "Session history", route: "Reports" },
    { icon: "notifications-outline", title: "Notifications", subtitle: "Manage alerts", route: "Notifications" },
    { icon: "color-palette-outline", title: "Appearance", subtitle: "Customize app", route: "Appearance" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.handle}>{user.handle}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={() => navigation.navigate(item.route)}>
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={24} color="#4A90E2" />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", padding: 20, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  profileImageContainer: { position: "relative", marginBottom: 16 },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  editImageButton: {
    position: "absolute", right: 0, bottom: 0, backgroundColor: "#4A90E2",
    width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center",
    borderWidth: 3, borderColor: "#FFF",
  },
  name: { fontSize: 24, fontWeight: "bold", color: "#333" },
  handle: { fontSize: 16, color: "#666", marginTop: 4 },
  menuSection: { padding: 16 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  menuIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#F5F8FF", justifyContent: "center", alignItems: "center", marginRight: 16 },
  menuContent: { flex: 1 },
  menuTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
  menuSubtitle: { fontSize: 14, color: "#666", marginTop: 2 },
  logoutButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#FFF", padding: 16, margin: 16, borderRadius: 12, borderWidth: 2, borderColor: "#FF3B30" },
  logoutText: { fontSize: 16, fontWeight: "600", color: "#FF3B30", marginLeft: 8 },
});

export default UserProfileScreen;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen"; // Ensure HomeScreen is inside tabs
import SearchScreen from "../screens/SearchScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor = focused ? "#7D5DF7" : "#B5AEE0";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Chat") {
            iconName = "chatbubble-ellipses";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Icon name={iconName} size={26} color={iconColor} />;
        },
        tabBarStyle: {
          backgroundColor: "#E7ECF8",
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          position: "absolute",
          height: 60,
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

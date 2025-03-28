import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import WelcomeScreen from "./screens/signup/WelcomeScreen";
import SignUp from "./screens/signup/SignUp";
import SignUp2Screen from "./screens/signup/Signup-2";
import Login1 from "./screens/login/Login-1";
import BottomTabs from "./components/BottomTabNavigator"; // Import BottomTabs
import CounselorProfileScreen from "./screens/CounselorProfileScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Slide effect
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Signup-2" component={SignUp2Screen} />
        <Stack.Screen name="Login1" component={Login1} />

        {/* Main App Screens - Bottom Tabs */}
        <Stack.Screen name="Main" component={BottomTabs} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="CounselorProfile" component={CounselorProfileScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

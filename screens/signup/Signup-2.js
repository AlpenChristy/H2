import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons'; // Import an arrow icon from Expo icons

const SignUp2Screen = () => {
  const navigation = useNavigation(); // Hook to access navigation

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const user = { name, email, password };

    axios.post("http://192.168.29.77:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert("Registration Successful", "You have been registered successfully");
        setName("");
        setEmail("");
        setPassword("");
        navigation.replace("Login1");
      })
      .catch((error) => {
        Alert.alert("Registration Error", "An error occurred while registering");
        console.log("Registration Failed", error);
      });
  };

  return (
    <View style={styles.SignUp2Container}>
      {/* Back Arrow Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.SignUp2Title}>Create account</Text>

      <TextInput
        style={styles.SignUp2Input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        keyboardType="default"
      />

      <TextInput
        style={styles.SignUp2Input}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.SignUp2Input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleRegister} style={styles.SignUp2Button}>
        <Text style={styles.SignUp2ButtonText}>Create account</Text>
      </TouchableOpacity>

      <Text style={styles.SignUp2FooterText}>
        By creating an account, you agree to our{' '}
        <Text style={styles.SignUp2Link}>Terms and Conditions</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  SignUp2Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1D5DB',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust based on your header height
    left: 20,
  },
  SignUp2Title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  SignUp2Input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  SignUp2Button: {
    backgroundColor: '#3F5733',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  SignUp2ButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  SignUp2FooterText: {
    marginTop: 15,
    fontSize: 12,
    color: '#333',
  },
  SignUp2Link: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default SignUp2Screen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from "axios";

const SignUp2Screen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    const user = {
      name:name,
      email:email,
      password:password,
    }

    axios.post("http://192.168.29.77:8000/register",user).then((response) => {
      console.log(response);
      Alert.alert(
        "Registration Successful",
        "you have been registered Successfully"
      );
      setName("");
      setEmail("");
      setPassword("");
    }).catch((error) => {
      Alert.alert(
        "Registration Error",
        "An error occurred while registering"
      )
      console.log("registration Failed", error)
    })
  }

  return (
    <View style={styles.SignUp2Container}>
      <Text style={styles.SignUp2Title}>Create account</Text>


      <TextInput
        style={styles.SignUp2Input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        keyboardType="email-address"
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

      {/* <TextInput
        style={styles.SignUp2Input}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      /> */}

      <TouchableOpacity onPress={handleRegister} style={styles.SignUp2Button}>
        <Text style={styles.SignUp2ButtonText}>Create account</Text>
      </TouchableOpacity>

      <Text style={styles.SignUp2FooterText}>
        By creating an account or signing you agree to our{' '}
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

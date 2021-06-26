import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";
import { LogBox } from "react-native";

const LoginScreen = ({ navigation }) => {
  LogBox && LogBox.ignoreLogs(["Setting a timer"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 20, color: "#2C6BED" }}>
        Login to Yola
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          onSubmitEditing={signIn}
        />
      </View>

      <Button title="Login" containerStyle={styles.button} onPress={signIn} />
      <Button
        title="Register"
        containerStyle={styles.button}
        type="outline"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
      <View style={{ height: 10 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
    marginTop: 10,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

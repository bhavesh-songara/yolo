import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image, Text } from "react-native-elements";
import { ScrollView } from "react-native";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding " style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 20 }}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          type="text"
        />
        <Input
          placeholder="Email"
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
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          value={imageUrl}
          onChangeText={(text) => {
            setImageUrl(text);
          }}
          type="text"
          onSubmitEditing={register}
        />
      </View>
      <Button
        title="Register"
        containerStyle={styles.button}
        onPress={register}
        raised
      />
      <View style={{ height: 10 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
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

import { NavigationContainer } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create a Channel",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a Channel name"
        value={input}
        onChangeText={(text) => {
          setInput(text);
        }}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
        onSubmitEditing={createChat}
      />
      <Button
        title="Create new Channel"
        onPress={createChat}
        disabled={!input}
      />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});

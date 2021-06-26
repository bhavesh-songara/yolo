import React, { useLayoutEffect, useState } from "react";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { Keyboard } from "react-native";
import { auth, db } from "../firebase";
import firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar
              rounded
              source={{
                uri:
                  messageArray[0]?.data.photoURL ||
                  "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
              }}
            />
            <Text
              style={{
                color: "white",
                marginLeft: 10,
                fontWeight: "700",
              }}
            >
              {route.params.chatName}
            </Text>
          </View>
        );
      },
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: 10,
            }}
            onPress={navigation.goBack}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        );
      },
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 80,
              marginRight: 20,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                marginLeft: 10,
              }}
            >
              <FontAwesome name="video-camera" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginLeft: 10,
              }}
            >
              <Ionicons name="call" size={20} color="white" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation, messageArray]);

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats")
      .doc(route.params.id)
      .collection("message")
      .add({
        timestamp:
          firebase.firestore && firebase.firestore.FieldValue.serverTimestamp(),
        message: message,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });

    setMessage("");
  };

  useLayoutEffect(() => {
    const unsubcribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessageArray(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubcribe;
  }, [route]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <StatusBar style="light" />
      {/* <KeyboardAvoidingView
        behavior="height"
        style={styles.container}
        keyboardVerticalOffset={90}
      > */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messageArray.map(({ id, data }) =>
              data.email == auth.currentUser.email ? (
                <View key={id} style={styles.reciver}>
                  <Avatar
                    position="absolute"
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      right: -5,
                    }}
                    bottom={-15}
                    right={-5}
                    rounded
                    size={30}
                    source={{
                      uri: data.photoURL,
                    }}
                  />
                  <Text style={styles.recieverText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.sender}>
                  <Avatar
                    position="absolute"
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      left: -5,
                    }}
                    bottom={-15}
                    left={-5}
                    rounded
                    size={30}
                    source={{
                      uri: data.photoURL,
                    }}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text style={styles.senderName}>{data.displayName}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder="Type Message"
              style={styles.textInput}
              value={message}
              onChangeText={(text) => {
                setMessage(text);
              }}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
              <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 48,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  reciver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
});

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { loggingOut } from "../services";
import Button from "../components/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import TextInput from "../components/TextInput";

export default function Profile({ navigation }) {
  const windowHeight = Dimensions.get("window").height;
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  let currentUserUID = firebase.auth().currentUser.uid;

  const getUser = async () => {
    console.log("masuk");
    await firebase
      .firestore()
      .collection("users")
      .doc(currentUserUID)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const handleUpdate = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(currentUserUID)
      .update({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
      })
      .then(() => {
        console.log("User Updated!");
        Alert.alert(
          "Profile Updated!",
          "Your profile has been updated successfully."
        );
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handlePress = () => {
    loggingOut();
    navigation.replace("Home");
  };

  return (
    <View style={{ ...styles.container, minHeight: windowHeight }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5
            style={{ margin: 12 }}
            name="chevron-left"
            color="#424242"
            size={24}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Profile</Text>
        <View style={{ width: 45 }}></View>
      </View>
      <View style={{ ...styles.action, marginTop: 20 }}>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={userData ? userData.name : ""}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
        />
      </View>

      <View style={styles.action}>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={userData ? userData.email : ""}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
        />
      </View>
      <View style={{ ...styles.action, marginTop: 20 }}>
        <TextInput
          label="Phone"
          returnKeyType="next"
          value={userData ? userData.phone : ""}
          onChangeText={(text) => setUserData({ ...userData, phone: text })}
        />
      </View>
      <View style={{ ...styles.action, marginTop: 20 }}>
        <TextInput
          label="Address"
          returnKeyType="next"
          value={userData ? userData.address : ""}
          onChangeText={(text) => setUserData({ ...userData, address: text })}
        />
      </View>
      <Button mode="contained" onPress={handleUpdate} style={{ marginTop: 24 }}>
        Update
      </Button>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    padding: 5,
    backgroundColor: "#ff9999",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    padding: 16,
    backgroundColor: "#F2F2F2",
  },
  topBar: {
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 24,
    color: "#424242",
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontStyle: "italic",
    marginTop: "2%",
    marginBottom: "10%",
    fontWeight: "bold",
    color: "black",
  },
  titleText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E6194",
  },
  action: {
    paddingHorizontal: "8%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#333333",
  },
});

import firebase from "firebase/app";
import "firebase/storage";
import { Alert } from "react-native";
import { useState } from "react";

export async function registration(email, password, name) {
  try {
    firebase.storage().ref().p;
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      name: name,
    });
    return "OK";
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return "OK";
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function updateFruit(key, data) {
  console.log("masuk update fruits");
  try {
    await firebase.database().ref("Fruits/").child(key).update({
      name: data.name,
      price: data.price,
      weight: data.weight,
      stock: data.stock,
      desc: data.desc,
    });
    return Alert.alert("Data berhasil diupdate.");
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function addFruit(key, data) {
  console.log("masuk add fruits");
  try {
    await firebase
      .database()
      .ref("Fruits/")
      .child(key)
      .set(data)
      .then()
      .catch();
    return Alert.alert("Data berhasil ditambah.");
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function deleteFruit(key) {
  console.log("masuk delete fruits");
  try {
    await firebase
      .database()
      .ref("Fruits/" + key)
      .remove();
    return Alert.alert("Data berhasil dihapus.");
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function uploadImage(key, name, uploadUri) {
  //aconst [arrImg, setArrImg] = useState([]);
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uploadUri, true);
    xhr.send(null);
  });
  console.log(`valuenya : ${key} ${name} ${uploadUri}`);
  try {
    const ref = firebase.storage().ref().child(`${key}/${name}`);
    await ref.put(blob, { contentType: "image/png" });
    blob.close();
    return "OK";
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function getImage(key) {
  console.log("masuk get image");
  const imageRefs = await firebase
    .storage()
    .ref()
    .child(key + "/")
    .listAll();

  const urls = await Promise.all(
    imageRefs.items.map((ref) => ref.getDownloadURL())
  );
  return urls;
}

export async function deleteImage() {}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

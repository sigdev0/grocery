import React from "react";
import * as firebase from "firebase";
import apiKeys from "../../../config/key";
// const fruits = [
//   {
//     id: 1,
//     price: 40,
//     type: "VEGGIE",
//     weight: "1000g",
//     name: "Banana",
//     //image: require("../../../assets/images/banana.png"),
//     color: "#ffffb1",
//   },
//   {
//     id: 2,
//     name: "Apple",
//     type: "FRUIT",
//     image: require("../../../assets/images/apple.png"),
//     price: 150,
//     weight: "500g",
//     color: "#ffb1b1",
//   },
// ];
//firebase.initializeApp(apiKeys.firebaseConfig);
var fruits = [];

const getFruits = async () => {
  const li = [];
  let id = 0;
  const get = await firebase
    .database()
    .ref("Fruits/")
    .once("value", function (snapshot) {
      snapshot.forEach((c) => {
        li.push({
          id: id++,
          key: c.key,
          name: c.val().name,
          price: c.val().price,
          weight: c.val().weight,
          stock: c.val().stock,
          desc: c.val().desc,
          type: c.val().type,
          image: c.val().img,
        });
      });
      fruits = li;
    });
  Promise.all(get);
};

export const getGroceryItems = async (searchText = "", type) => {
  await getFruits();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = fruits
          .filter((d) =>
            d.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .filter((f) => f.type === type);
        resolve({
          data: data,
          total: data.length,
        });
      } catch (err) {
        reject(err);
      }
    }, 250);
  });
};

export const getGroceryItem = (id = "") => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve({
          data: fruits.find((f) => f.id == id),
        });
      } catch (err) {
        reject(err);
      }
    }, 1);
  });
};

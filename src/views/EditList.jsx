import React, { useEffect, useState } from "react";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView, StyleSheet, Dimensions, View, Text } from "react-native";
import { EditCard, EmptyState } from "../components";
import { theme } from "../core/theme";
import * as firebase from "firebase";

function EditList({
  navigation,
  route: {
    params: { refresh },
  },
}) {
  const windowHeight = Dimensions.get("window").height;

  const [fruits, setFruits] = React.useState([]);
  const getFruits = () => {
    console.log("refresh");
    firebase
      .database()
      .ref("Fruits/")
      .once("value", function (snapshot) {
        var li = [];
        snapshot.forEach((c) => {
          li.push({
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
        setFruits(li);
      });
  };
  React.useEffect(() => {
    getFruits();
  }, [refresh]);

  // React.useEffect(() => {
  //   console.log("masuk: " + JSON.stringify(fruits));
  // }, [fruits]);

  return (
    <View style={{ ...styles.container, minHeight: windowHeight }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.push("Home")}>
          <FontAwesome5
            style={{ margin: 12 }}
            name="chevron-left"
            color="#424242"
            size={24}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Edit</Text>
        <TouchableOpacity
          onPress={() => navigation.push("EditDetail", { item: "" })}
        >
          <MaterialIcons name="playlist-add" size={30} color="#424242" />
        </TouchableOpacity>
      </View>

      {!fruits.length ? (
        <EmptyState />
      ) : (
        <ScrollView>
          <View
            style={{
              margin: 8,
              paddingBottom: 96,
            }}
          >
            {fruits.map((fruit) => (
              <EditCard
                data={fruit}
                navigation={navigation}
                key={fruit.key}
                //onUpdate={(e) => handleCart(e)}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

// EditList.sharedElements = (route) => {
//   const {
//     item: { cart },
//   } = route.params;
//   return [
//     ...Object.keys(cart)
//       .filter((key) => !!cart[key])
//       .map((c) => `item.${c}.photo`),
//   ];
// };

const styles = StyleSheet.create({
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
});

export default EditList;

import React from "react";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { theme } from "../core/theme";
import * as firebase from "firebase";
import { convertToRupiah } from "../helpers/rupiahConverter";

export default function ItemCard({ data, onUpdate, navigation }) {
  const { cart } = useSelector((state) => state.groceryState);
  const [userIn, setUserIn] = React.useState(false);
  const cartCount = () => {
    return cart[id] || "0";
  };

  const handleOnPress = (type) => {
    if (!onUpdate) return;

    onUpdate({ type, item: data });
  };
  const { id, key, name, price, weight, image, stock } = data;
  console.log(image[0]);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserIn(true);
      } else {
        setUserIn(false);
      }
    });
  }, []);

  var carousel = [];
  const reformat = () => {
    if (data.image.length != 0)
      data.image.map((url) => {
        carousel.push({ uri: url });
      });
    //console.log(carousel);
  };
  reformat();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{}}
        onPress={() => {
          navigation.push("Detail", { item: data, imgCarousel: carousel });
        }}
      >
        <Image
          style={styles.photo}
          resizeMode="cover"
          source={{ uri: image[0] }}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <View>
          <Text style={styles.price}> {convertToRupiah(price)}</Text>

          <Text style={styles.title}>{name}</Text>
          <Text style={styles.weight}>{weight}</Text>
          <Text style={styles.title}>Stok : {stock}</Text>
          {userIn ? (
            <View style={{ ...styles.actions, marginVertical: 5 }}>
              <TouchableOpacity
                style={{ ...styles.countIcon, marginTop: 4 }}
                onPress={() => handleOnPress("MINUS")}
              >
                <FontAwesome5 name="minus" size={12} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={{ padding: 4 }}>
                <Text style={styles.count}>{cartCount()}</Text>
              </View>
              <TouchableOpacity
                style={styles.countIcon}
                onPress={() => handleOnPress("PLUS")}
                disabled={cartCount() >= stock}
              >
                <FontAwesome5 name="plus" size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{ ...styles.beli, marginVertical: 5 }}
              onPress={() => {
                navigation.push("SignIn");
              }}
            >
              <Text style={{ color: "white" }}>Beli</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    // alignSelf: "stretch",
    // alignItems: "flex-start",
    backgroundColor: "#fff",
    // justifyContent: "flex-start",
  },
  content: {
    minWidth: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actions: {
    width: "91%",
    padding: 5,
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    justifyContent: "space-between",
  },
  beli: {
    width: "130%",
    padding: 5,
    borderRadius: 6,
    textAlign: "center",
    flexDirection: "row",
    backgroundColor: theme.colors.orange,
    justifyContent: "center",
  },
  count: {
    fontSize: 16,
    minWidth: 16,
    paddingRight: 4,
    color: "#424242",
    fontFamily: "Montserrat-SemiBold",
  },
  photo: {
    height: 200,
    //width: 100,
    marginBottom: 16,
    maxWidth: "100%",
  },
  priceWrapper: {
    marginTop: -4,
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 21,
    color: theme.colors.primary,
    fontFamily: "Montserrat-SemiBold",
    marginLeft: -7,
  },
  title: {
    fontSize: 12,
    color: "#424242",
    fontFamily: "Montserrat-SemiBold",
  },
  weight: {
    fontSize: 10,
    color: "#424242",
    fontFamily: "Montserrat-Regular",
  },
  countIcon: {
    backgroundColor: theme.colors.orange,
    borderRadius: 4,
    paddingLeft: 6,
    paddingRight: 6,
    padding: 4,
    flexDirection: "row",
  },
});

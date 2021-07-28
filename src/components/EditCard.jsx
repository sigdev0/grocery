import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Image, View, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { theme } from "../core/theme";
import { deleteFruit } from "../services";

export default function EditCard({ navigation, data }) {
  const { key, name, price, weight, stock, type, image } = data;

  var carousel = [];
  const reformat = () => {
    if (data.image.length != 0)
      data.image.map((url) => {
        carousel.push({ uri: url });
      });
    //console.log(carousel);
  };
  React.useEffect(() => {
    reformat();
  }, []);

  const handleUpdate = (type) => {
    if (!onUpdate) return;

    onUpdate({ type, item: data });
  };
  console.log(key + " " + JSON.stringify(data));

  const delFruit = () => {
    key && deleteFruit(key);
  };

  return (
    <View style={styles.cartCard}>
      <TouchableOpacity
        onPress={() =>
          navigation.push("EditDetail", { item: data, imgCarousel: carousel })
        }
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Image
            style={styles.photo}
            resizeMode="contain"
            //source={require("../../assets/images/apple.png")}
            source={{ uri: image[0] }}
          />

          <View style={{ alignItems: "flex-start", padding: 10 }}>
            <Text style={styles.name}>{key}</Text>
            <View style={styles.priceBox}>
              <Text style={styles.price}>{"IDR " + price}</Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.price}>{"Sisa " + String(stock)}</Text>
            </View>
            {/* <Text style={styles.weight}>{weight}</Text> */}
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.delete}>
        <TouchableOpacity onPress={() => delFruit()}>
          <FontAwesome5 name="trash-alt" size={20} color="#424242" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  photoContainer: {
    padding: 8,
    borderRadius: 24,
    //alignSelf: "flex-start",
    backgroundColor: "#eee",
  },
  photo: {
    height: 100,
    width: 100,
  },
  name: {
    fontSize: 16,
    paddingBottom: 4,
    fontFamily: "Montserrat-SemiBold",
  },
  count: {
    fontSize: 12,
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily: "Montserrat-SemiBold",
  },
  weight: {
    //paddingLeft: 16,
    color: "#7a7a7a",
    fontFamily: "Montserrat-Regular",
  },
  priceBox: {
    borderRadius: 12,

    backgroundColor: "#eee",
  },
  price: {
    fontFamily: "Montserrat-SemiBold",
  },
  cartCard: {
    flex: 1,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
    borderRadius: 16,
    minWidth: "100%",
    //alignItems: "center",
    //flexDirection: "row",
    backgroundColor: "#fff",
    //justifyContent: "space-evenly",
  },
  countIconBox: {
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  countIcon: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingLeft: 5,
    paddingRight: 5,
    padding: 3,
  },
  delete: {
    top: 15,
    right: 12,
    width: 18,
    height: 18,
    color: "red",
    borderRadius: 20,
    alignItems: "center",
    position: "absolute",
    //backgroundColor: "red",
    justifyContent: "center",
  },
});

import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { CarouselCards } from "../components";
import { theme } from "../core/theme";
import { convertToRupiah } from "../helpers/rupiahConverter";

function ItemDetail({
  navigation,
  route: {
    params: { item, imgCarousel },
  },
}) {
  const { id, key, name, price, image, weight, desc } = item;
  const carousel = imgCarousel;
  console.log(carousel);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome5
          style={{ margin: 12 }}
          name="chevron-left"
          color="#424242"
          size={24}
        />
      </TouchableOpacity>
      <View
        style={{
          maxWidth: "100%",
          height: 300,
        }}
      >
        <CarouselCards data={carousel} item={item} />
      </View>
      {/* <SharedElement id={`item.${key}.photo`}>
        <Image
          style={styles.box}
          source={{ uri: image[0] }}
          resizeMode="contain"
        />
      </SharedElement> */}
      <View style={{ padding: 8 }}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>{convertToRupiah(price)}</Text>
        </View>

        <Text style={styles.weight}>{weight}</Text>
        <Text style={styles.about}>About this product</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </View>
  );
}

// ItemDetail.sharedElements = (route) => {
//   const {
//     data: { carousel },
//   } = route.params;
//   return [carousel.map((uri) => `item.${uri}.photo`)];
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "flex-start",
    backgroundColor: "#F2F2F2",
    justifyContent: "flex-start",
  },
  text: {
    padding: 25,
    fontSize: 34,
  },
  about: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    marginTop: 32,
  },
  desc: {
    fontFamily: "Montserrat-Regular",
    marginTop: 8,
    fontSize: 14,
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 40,
  },
  priceWrapper: {
    flexDirection: "row",
    paddingLeft: 2,
    paddingTop: 4,
  },
  price: {
    fontSize: 22,
    color: theme.colors.primary,
    fontFamily: "Montserrat-SemiBold",
  },
  weight: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    paddingTop: 4,
  },
  box: {
    height: 100,
    width: 100,
    marginTop: 24,
    marginBottom: 48,
    //maxWidth: "100%",
  },
});

export default ItemDetail;

import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default function CarouselCardItem({ item, index }) {
  return (
    <View>
      <View style={styles.container} key={index}>
        <SharedElement id={`item.${item.uri}.photo`}>
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
            resizeMode="contain"
          />
        </SharedElement>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 0,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 250,
  },
  delete: {
    top: 15,
    right: 18,
    width: 24,
    height: 24,
    color: "red",
    borderRadius: 20,
    alignItems: "center",
    position: "absolute",
    //backgroundColor: "red",
    justifyContent: "center",
  },
});

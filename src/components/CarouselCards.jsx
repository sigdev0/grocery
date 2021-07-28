import React from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";
import { deleteImage } from "../services";

export default function CarouselCards(props) {
  const [idx, setIdx] = React.useState(0);

  const isCarousel = React.useRef(null);

  const deleteItem = () => {
    //setCarouselItems(carouselItems.filter((item) => item.id != id));
    //props.data.map((item) => console.log(item));
    props.setCarousel(props.data.filter((item, index) => index != idx));
  };

  const delAlert = () =>
    Alert.alert(
      "Alert",
      "Delete this photo?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteItem() },
      ],
      { cancelable: false }
    );

  console.log("carousel data : " + props.data);
  return (
    <View style={{ justifyContent: "center" }}>
      <View style={{ marginLeft: -50 }}>
        <Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={isCarousel}
          data={props.data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => {
            setIdx(index);
            console.log(index);
          }}
          useScrollView={true}
        />
        {props.item == "" && (
          <TouchableOpacity style={styles.delete} onPress={() => delAlert()}>
            <Feather name="x-circle" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <Pagination
        dotsLength={props.data.length}
        activeDotIndex={idx}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  delete: {
    top: 5,
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

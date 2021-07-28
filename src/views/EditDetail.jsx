import React, { useState, useEffect } from "react";
import { FontAwesome5, EvilIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, ImagePickers, CarouselCards, EmptyState } from "../components";
import { updateFruit, addFruit, uploadImage, getImage } from "../services";
import DropDownPicker from "react-native-dropdown-picker";
import { theme } from "../core/theme";
import { resizer } from "../helpers/resizer";

function EditDetail({
  navigation,
  route: {
    params: { item, imgCarousel },
  },
}) {
  //Dropdown
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(item.type);
  const [items, setItems] = useState([
    { label: "Buah", value: "FRUIT" },
    { label: "Sayur", value: "VEGGIE" },
  ]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [weight, setWeight] = useState(item.weight);
  const [stock, setStock] = useState(item.stock);
  const [desc, setDesc] = useState(item.desc);
  //const [image, setImage] = useState(item.image);
  const [key, setKey] = useState();
  const data = {
    name: name,
    price: parseInt(price),
    weight: weight,
    stock: parseInt(stock),
    desc: desc,
    type: type,
    img: "",
  };

  const [carousel, setCarousel] = useState([]);
  const [arrImg, setArrImg] = useState([]);
  //const arrImg = [];
  console.log("array image: " + JSON.stringify(carousel));

  const update = () => {
    if (data.name) {
      updateFruit(item.key, data);
    }
  };

  const add = async () => {
    setLoading(true);
    const upload = await carousel.map(async (img, index) => {
      var resizeUri = await resizer(img).then((uri) => {
        return uri;
      });
      var keyImg = `image-${index}`;
      await uploadImage(key, name + "-" + index, resizeUri.uri).then((status) =>
        console.log(`${keyImg}:${status}`)
      );
    });

    await Promise.all(upload);
    await getImage(key).then((urls) => (data.img = urls));
    setLoading(false);
    addFruit(
      String(data.name).replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
      data
    );
    navigation.goBack({ refresh: "backward" });
  };

  useEffect(() => {
    if (item == "") {
      setName(""),
        setPrice(""),
        setWeight(""),
        setStock(),
        setDesc(""),
        setType("FRUIT");
    } else {
      setCarousel(imgCarousel);
    }
  }, [item]);

  // useEffect(() => {
  //   console.log("arr img : " + typeof arrImg);
  //   console.log(`finish upload : ${key}`);
  //   console.log(data);
  // }, [data]);

  useEffect(() => {
    setKey(
      String(name)
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
        .replace(/ /g, "")
    );
  }, [name]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.push("EditList", { refresh: "backward" })}
      >
        <FontAwesome5
          style={{ margin: 12 }}
          name="chevron-left"
          color="#424242"
          size={24}
        />
      </TouchableOpacity>
      {loading ? (
        <EmptyState>
          <ActivityIndicator size="large" color="#424242" />
        </EmptyState>
      ) : (
        <ScrollView style={{ width: "100%", height: "10%" }}>
          {carousel.length != 0 ? (
            <View
              style={{
                maxWidth: "100%",
                height: 300,
              }}
            >
              <CarouselCards
                data={carousel}
                setCarousel={setCarousel}
                item={item}
              />
              <View style={{ alignItems: "center" }}>
                <ImagePickers carousel={carousel} setCarousel={setCarousel} />
              </View>
            </View>
          ) : (
            <View
              style={{
                maxWidth: "100%",
                height: 100,
                marginLeft: 100,
                marginTop: 50,
              }}
            >
              <ImagePickers carousel={carousel} setCarousel={setCarousel} />
            </View>
          )}

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS == "ios" ? "padding" : "padding"}
            >
              <View style={{ padding: 8, marginTop: 50 }}>
                <TextInput
                  style={styles.title}
                  value={name}
                  onChangeText={setName}
                  placeholder={"..."}
                />
                <View style={styles.priceWrapper}>
                  <Text style={styles.price}>Harga : </Text>
                  <TextInput
                    style={styles.price}
                    value={String(price)}
                    onChangeText={setPrice}
                    placeholder={"..."}
                  />
                </View>
                <View style={styles.priceWrapper}>
                  <Text style={styles.price}>Satuan : </Text>
                  <TextInput
                    style={styles.price}
                    value={String(weight)}
                    onChangeText={setWeight}
                    placeholder={"..."}
                  />
                </View>
                <View style={styles.priceWrapper}>
                  <Text style={styles.price}>Stok : </Text>
                  <TextInput
                    style={styles.price}
                    value={String(stock)}
                    onChangeText={setStock}
                    placeholder={"..."}
                  />
                </View>
                <DropDownPicker
                  open={open}
                  value={type}
                  items={items}
                  setOpen={setOpen}
                  setValue={setType}
                  setItems={setItems}
                  style={{ width: 200, marginVertical: 10 }}
                />

                <Text style={styles.about}>About this product</Text>
                <TextInput
                  style={styles.desc}
                  value={desc}
                  onChangeText={setDesc}
                  multiline
                  textAlign="left"
                  textAlignVertical="top"
                  numberOfLines={2}
                  placeholder={"..."}
                />
              </View>
              {item == "" ? (
                <Button
                  mode="contained"
                  onPress={() => add()}
                  style={{ marginTop: 24 }}
                >
                  Add
                </Button>
              ) : (
                <Button
                  mode="contained"
                  onPress={() => update()}
                  style={{ marginTop: 24 }}
                >
                  Update
                </Button>
              )}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </ScrollView>
      )}
    </View>
  );
}

// EditDetail.sharedElements = (route) => {
//   const { item } = route.params;
//   return [`item.${item.key}.photo`];
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
    paddingBottom: 8,
    fontSize: 12,
    //backgroundColor: "grey",
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
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
  },
  weight: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    paddingTop: 4,
  },
  box: {
    height: 160,
    marginTop: 24,
    marginBottom: 48,
    maxWidth: "100%",
    //backgroundColor: "green",
  },
  cameraIcon: {
    //backgroundColor: "yellow",
    maxWidth: "100%",
  },
  imageWrapper: {
    maxWidth: "100%",
    height: 160,
    marginTop: 50,
    marginLeft: 100,
  },
  carousel: {
    height: 50,
    width: 50,
    margin: 5,
    // marginTop: 24,
    // marginBottom: 48,
    //maxWidth: "100%",
    //backgroundColor: "green",
  },
});

export default EditDetail;

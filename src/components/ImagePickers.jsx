import * as ImagePicker from "expo-image-picker";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function ImagePickers(props) {
  //const [carousel, setCarousel] = React.useState([]);

  const openGallery = async () => {
    const permissionResult = await ImagePicker.getCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      console.log(result.uri);
      return result;
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      console.log(result.uri);
      return result;
    }
  };

  return (
    <View
      style={{ flexDirection: "row", zIndex: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() =>
          openGallery().then((data) => {
            data && props.setCarousel([...props.carousel, data]);
          })
        }
      >
        <EvilIcons
          style={{ margin: 12 }}
          name="image"
          color="#424242"
          size={50}
        />
      </TouchableOpacity>
      <Text>.</Text>
      <TouchableOpacity
        onPress={() =>
          openCamera().then((data) => {
            data && props.setCarousel([...props.carousel, data]);
          })
        }
      >
        <EvilIcons
          style={{ margin: 12 }}
          name="camera"
          color="#424242"
          size={50}
        />
      </TouchableOpacity>
    </View>
  );
}

import * as ImageManipulator from "expo-image-manipulator";

export async function resizer(image) {
  console.log("masuk ga nih? ");
  const manipResult = await ImageManipulator.manipulateAsync(
    image.localUri || image.uri,
    [{ resize: { width: 700 } }],
    { compress: 0.4, format: ImageManipulator.SaveFormat.PNG }
  );
  Promise.all(manipResult);
  console.log("cek ditempat: " + manipResult);
  return manipResult;
}

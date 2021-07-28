import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        underlineColor="transparent"
        multiline={true}
        theme={{
          colors: { text: "black", primary: theme.colors.primary },
        }}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
    // backgroundColor: "blue",
    // borderRadius: 50,
  },
  input: {
    //backgroundColor: theme.colors.surface,
    //backgroundColor: "red",
    // borderRadius: 16,
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});

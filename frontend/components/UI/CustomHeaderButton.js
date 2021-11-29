import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomHeaderButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.actionToDo}
      style={{ ...styles.button, ...props.style }}
    >
      <Ionicons color={props.colorName} name={props.nameButton} size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 5,
    width: 50,
    height: 50,
    borderColor: "grey",
    borderWidth: 0.3,
    borderRadius: 25,
  },
});

export default CustomHeaderButton;

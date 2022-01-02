import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const CartButton = (props) => {
  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      style={styles.addToCart}
      onPress={props.actionToDo}
    >
      <View style={{ ...styles.btnContainer, ...props.style }}>
        <Text style={{ marginLeft: 10, fontWeight: "bold", color: "white" }}>
          {props.btnText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addToCart: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  btnContainer: {
    backgroundColor: Colors.activeFont,
    width: 300,
    height: 50,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartButton;

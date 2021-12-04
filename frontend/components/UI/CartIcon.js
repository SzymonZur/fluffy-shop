import React from "react";
import { StyleSheet, View } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";
import Colors from "../../constants/Colors";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <Badge style={styles.badge}>
          <View style={{ position: "absolute" }}>
            <Text style={styles.text}>{props.cartItems.length}</Text>
          </View>
        </Badge>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: Colors.activeFont,
    width: 20,
    height: 20,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -5,
    right: -10,
  },
  text: {
    fontSize: 12,
    width: 100,
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps, null)(CartIcon);

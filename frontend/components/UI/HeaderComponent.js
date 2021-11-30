import React from "react";
import { View, StyleSheet, Platform } from "react-native";

const HeaderComponenet = (props) => {
  return (
    <View style={{ ...styles.headerContainer, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    marginTop: Platform.OS === "android" ? 25 : 0,
    paddingRight: 15,
  },
});

export default HeaderComponenet;

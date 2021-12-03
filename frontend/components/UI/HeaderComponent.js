import React from "react";
import { View, Text, StyleSheet, Platform, SafeAreaView } from "react-native";

const HeaderComponenet = (props) => {
  return (
    <SafeAreaView>
    <View style={{ ...styles.headerContainer, ...props.style }}>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{props.sectionTitle}</Text>
      </View>
      {props.children}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    marginTop: Platform.OS === "android" ? 30 : 0,
    paddingRight: 15,
  },
  headerTitle: {
    justifyContent: 'center',
    paddingLeft: 20
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default HeaderComponenet;

import { Button } from "native-base";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import CustomHeaderButton from "../components/UI/CustomHeaderButton";

const ProductOverviewScreen = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  console.log(item);
  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={styles.productImage}
        />
        <CustomHeaderButton
          nameButton="chevron-back-outline"
          actionToDo={() => {
            props.navigation.goBack();
          }}
          colorName="white"
          style={{
            position: "absolute",
            left: 15,
            top: Platform.OS === "android" ? 30 : 40,
            backgroundColor: "black",
          }}
        />
      </View>
      <View style={styles.productOverview}>
        <View style={styles.productHeader}>
          <View>
            <Text style={{ fontSize: 24 }}>{item.name}</Text>
            <Text style={{ fontSize: 12, color: "rgba(125, 125, 125, 0.9)" }}>
              (Price incl. 23% VAT)
            </Text>
          </View>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            ${item.price.toFixed(2)}
          </Text>
        </View>
      </View>
      <View>
        <Button />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    height: "50%",
    justifyContent: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    backgroundColor: "rgba(184, 184, 184, 0)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productImage: {
    width: "100%",
    height: "80%",
  },
  productOverview: {
    flex: 1,
    top: -25,
    backgroundColor: "white",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 25,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ProductOverviewScreen;

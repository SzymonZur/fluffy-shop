import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import HeaderComponenet from "../components/UI/HeaderComponent";
import Colors from "../constants/Colors";

import { connect } from "react-redux";
import CustomHeaderButton from "../components/UI/CustomHeaderButton";

const CartScreen = (props) => {
  console.log(props.cartItems)
  return (
    <View style={styles.screen}>
      <HeaderComponenet sectionTitle="Cart"></HeaderComponenet>
      <View style={styles.cartContainer}>
        {props.cartItems.map((x) => {
          return (
            <View style={styles.cartItem}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: x.product.image }}
                  resizeMode="cover"
                  style={styles.cartImage}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  {x.product.name}
                </Text>
                <Text style={styles.priceFont}>
                  Price: ${x.product.price.toFixed(2)}
                </Text>
                <Text style={styles.inactiveFontSize}>Size: {x.product.size}</Text>
                <Text style={styles.inactiveFontSize}>Color: Black</Text>
                <View style={styles.quantityContainer}>
                  <CustomHeaderButton
                    style={styles.headerButton}
                    sizeIcon={18}
                    nameButton="add"
                    colorName="black"
                  />
                  <Text>2</Text>
                  <CustomHeaderButton
                    style={styles.headerButton}
                    sizeIcon={18}
                    nameButton="remove"
                    colorName="black"
                  />
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <CustomHeaderButton
                  style={{
                    ...styles.headerButton,
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                  }}
                  sizeIcon={18}
                  nameButton="trash-outline"
                  colorName="tomato"
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const mapsStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  cartContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    padding: 20,
  },
  cartItem: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    backgroundColor: Colors.inactiveBg,
    marginVertical: 5,
  },
  imageContainer: {
    justifyContent: "center",
    marginRight: 20,
  },
  cartImage: {
    width: 100,
    height: "100%",
  },
  headerButton: {
    width: 30,
    height: 30,
    borderWidth: 0,
    marginHorizontal: 0,
    backgroundColor: Colors.inactiveBg,
  },
  inactiveFontSize: {
    color: Colors.inactiveFont,
    fontSize: 12,
  },
  priceFont: {
    fontSize: 14,
    color: Colors.inactiveFont,
    marginTop: 2,
    marginBottom: 7,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? 5 : 10,
  },
});

export default connect(mapsStateToProps, null)(CartScreen);

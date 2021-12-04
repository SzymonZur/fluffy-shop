import { Button } from "native-base";
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import SizeComponent from "../components/UI/SizeComponent";

import { connect } from "react-redux";
import * as actions from "../redux/actions/cartActions";

import Colors from "../constants/Colors";

const ProductOverviewScreen = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [active, setActive] = useState(0);

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
      <ScrollView>
        <View style={styles.productOverview}>
          <View style={styles.productHeader}>
            <View>
              <Text style={{ fontSize: 24 }}>
                {item.brand} {item.name}
              </Text>
              <Text style={{ fontSize: 12, color: Colors.inactiveFont }}>
                (Price incl. 23% VAT)
              </Text>
            </View>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              ${item.price.toFixed(2)}
            </Text>
          </View>
          <View style={styles.productSizing}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.inactiveFont,
                fontWeight: "bold",
              }}
            >
              Choose size
            </Text>
            <SizeComponent
              size={item.size}
              setActive={setActive}
              active={active}
            />
          </View>
          <View>
            <View style={styles.detailsComponent}>
              <Text style={{ ...styles.fontActive, marginBottom: 5 }}>
                Details
              </Text>
            </View>
            <View>
              <Text style={{ ...styles.detailsText, ...styles.inactiveFont }}>
                {item.description}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addToCart}
            onPress={() => {
              props.addItemToCart({
                id: item._id.$oid,
                name: item.name,
                price: item.price,
                size: item.size[active],
                image: item.image,
              });
            }}
          >
            <View style={styles.btnContainer}>
              <Ionicons name="cart-outline" size={24} color="white" />
              <Text
                style={{ marginLeft: 10, fontWeight: "bold", color: "white" }}
              >
                Add To Cart
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => {
      dispatch(actions.addToCart({ quantity: 1, product }));
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
  },
  headerContainer: {
    height: "50%",
    justifyContent: "center",
    backgroundColor: "rgba(184, 184, 184, 0)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 30,
  },
  productOverview: {
    height: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 25,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productSizing: {
    marginVertical: 30,
    flexDirection: "column",
  },

  detailsComponent: {
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.activeFont,
    width: 80,
    alignItems: "center",
  },
  fontActive: {
    color: Colors.activeFont,
    fontWeight: "bold",
  },
  inactiveFont: {
    color: Colors.inactiveFont,
    fontWeight: "bold",
  },
  detailsText: {
    textAlign: "justify",
    lineHeight: 20,
  },
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

export default connect(null, mapDispatchToProps)(ProductOverviewScreen);

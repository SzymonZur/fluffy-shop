import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import HeaderComponenet from "../components/UI/HeaderComponent";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import { connect } from "react-redux";
import * as actions from "../redux/actions/cartActions";

import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import CartButton from "../components/UI/CartButton";

const CartScreen = (props) => {
  let total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price * cart.quantity);
  });
  return (
    <View style={styles.screen}>
      <HeaderComponenet sectionTitle="Cart"></HeaderComponenet>

      <ScrollView style={styles.cartContainer}>
        {total !== 0 ? (
          props.cartItems.map((x) => {
            return (
              <View style={styles.cartItem} key={x.product.id}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: x.product.image }}
                    resizeMode="cover"
                    style={styles.cartImage}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {x.product.name.length > 12
                      ? x.product.name.substring(0, 12 - 3) + "..."
                      : x.product.name}
                  </Text>
                  <Text style={styles.priceFont}>
                    Price: ${x.product.price.toFixed(2)}
                  </Text>
                  <Text style={styles.inactiveFontSize}>
                    Size: {x.product.size}
                  </Text>
                  <Text style={styles.inactiveFontSize}>Color: Black</Text>
                  <View style={styles.quantityContainer}>
                    <CustomHeaderButton
                      actionToDo={() => props.removeQuantity(x)}
                      style={styles.headerButton}
                      sizeIcon={18}
                      nameButton="remove"
                      colorName="black"
                    />
                    <Text>{x.quantity}</Text>
                    <CustomHeaderButton
                      actionToDo={() => props.addQuantity(x)}
                      style={styles.headerButton}
                      sizeIcon={18}
                      nameButton="add"
                      colorName="black"
                    />
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <CustomHeaderButton
                    actionToDo={() => props.removeFromCart(x)}
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
          })
        ) : (
          <View style={styles.emptyCart}>
            <Text style={{ fontSize: 20, color: Colors.inactiveFont }}>
              Cart is empty
            </Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.cashView}>
          <Text style={styles.cashViewFont}>Total</Text>
          <Text style={styles.totalFont}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.cashView}>
          <Text style={styles.cashViewFont}>Delivery fee</Text>
          <Text style={styles.totalFont}>$50</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.inactiveBg,
            marginVertical: 5,
          }}
        ></View>
        <View style={styles.cashView}>
          <Text style={styles.cashViewFont}>Sub Total</Text>
          <Text style={styles.totalFont}>${(total + 50).toFixed(2)}</Text>
        </View>
        <CartButton
          isDisabled={total !== 0 ? false : true}
          actionToDo={() => {
            props.navigation.navigate("Checkout");
          }}
          style={total !== 0 ? "" : { opacity: 0.2 }}
          btnText="Checkout"
        />
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

const mapsDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
    addQuantity: (item) => dispatch(actions.addQuantity(item)),
    removeQuantity: (item) => dispatch(actions.removeQuantity(item)),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  cartContainer: {
    padding: 20,
  },
  emptyCart: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
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
  bottomContainer: {
    height: 200,
    backgroundColor: Colors.activeBg,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 25,
  },
  cashView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  cashViewFont: {
    fontSize: 14,
    color: Colors.inactiveFont,
  },
  totalFont: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default connect(mapsStateToProps, mapsDispatchToProps)(CartScreen);

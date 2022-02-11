import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";
import CartButton from "../../components/UI/CartButton";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/cartActions";

var { width, height } = Dimensions.get("window");
import Colors from "../../constants/Colors";
import ConfirmText from "../../components/UI/ConfirmText";

import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const ConfirmScreen = (props) => {
  const confirm = props.route.params;

  const confirmOrder = () => {
    const order = confirm.order.order;

    axios
      .post(`${baseURL}orders`, order)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Completed",
            text2: "Thank You for shopping",
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("CartItems");
          }, 500);
        }
      })
      .catch((err) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please, try again!",
        });
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>
        {props.route.params ? (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>Shipping To:</Text>
            <View style={{ alignItems: "center", padding: 8 }}>
              <ConfirmText
                title="Steet:"
                data={confirm.order.order.shippingAddress1}
              />
              <ConfirmText
                title="Apartment Number:"
                data={confirm.order.order.shippingAddress2}
              />
              <ConfirmText title="City:" data={confirm.order.order.city} />
              <ConfirmText
                title="Zip Code:"
                data={confirm.order.order.zip}
              />
            </View>
            <Text style={styles.title}>Items:</Text>
            {confirm.order.order.orderItems.map((x) => {
              return (
                <ListItem style={styles.listItem} key={x.product.id+x.product.size} avatar>
                  <Left>
                    <Thumbnail source={{ uri: x.product.image }} />
                  </Left>
                  <Body style={styles.body}>
                    <Left>
                      <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                        {x.product.name}
                      </Text>
                      <Text
                        style={{ fontSize: 14, color: Colors.inactiveFont }}
                      >
                        Size: {x.product.size}
                      </Text>
                      <Text
                        style={{ fontSize: 14, color: Colors.inactiveFont }}
                      >
                        Quantity: {x.quantity}
                      </Text>
                    </Left>
                    <Right>
                      <Text style={{ fontSize: 14 }}>
                        ${(x.product.price * x.quantity).toFixed(2)}
                      </Text>
                    </Right>
                  </Body>
                </ListItem>
              );
            })}
          </View>
        ) : null}
        <CartButton
          isDisabled={confirm ? false : true}
          style={confirm ? "" : { opacity: 0.2 }}
          actionToDo={confirmOrder}
          btnText="Place Order"
        />
        {confirm ? null : (
          <View style={{ alignItems: "center", marginTop: 5, width: "80%" }}>
            <Text style={{ color: "red", fontSize: 14, textAlign: "center" }}>
              You need to add your shipping address and payment method
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 10,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    paddingTop: 5,
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: width / 1.2,
    margin: 2,
  },
  body: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default connect(null, mapDispatchToProps)(ConfirmScreen);

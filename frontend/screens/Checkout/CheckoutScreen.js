import React, { useEffect, useState, useContext } from "react";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import CartButton from "../../components/UI/CartButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";

import AuthGlobal from "../../context/store/AuthGlobal";

const CheckoutScreen = (props) => {
  const context = useContext(AuthGlobal);

  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zipcode, setZipcode] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.userId);
    } else {
      props.navigation.navigate("Cart");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please Login to Checkout",
        text2: "Tap on login screen",
      });
    }

    return () => {
      setOrderItems();
    };
  }, []);

  let total = 20;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price * cart.quantity);
  });

  const checkout = () => {
    let order = {
      city,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: "ordered",
      totalPrice: total.toFixed(2),
      user,
      zip: zipcode,
    };

    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }}
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Street"}
          name={"ShippingAddress1"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Apartment Number"}
          name={"ShippingAddress2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"Zip Code"}
          name={"zipcode"}
          value={zipcode}
          keyboardType={"numeric"}
          onChangeText={(text) => setZipcode(text)}
        />
        <CartButton
          actionToDo={() => checkout()}
          isDisabled={
            address && address2 && city && zipcode && phone ? false : true
          }
          style={
            address && address2 && city && zipcode && phone
              ? ""
              : { opacity: 0.2 }
          }
          btnText="Confirm"
        />
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(CheckoutScreen);

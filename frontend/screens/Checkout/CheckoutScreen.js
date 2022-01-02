import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { Item, Picker } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import CartButton from "../../components/UI/CartButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect, Connect } from "react-redux";

const CheckoutScreen = (props) => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zipcode, setZipcode] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    return () => {
      setOrderItems();
    };
  }, []);

  const checkout = () => {
    let order = {
      city,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      zipcode,
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
          placeholder={"Shipping Address 1"}
          name={"ShippingAddress1"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Shipping Address 2"}
          name={"ShippingAddress2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
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

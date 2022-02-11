import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import CustomError from "../../components/UI/CustomError";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import CartButton from "../../components/UI/CartButton";
import Colors from "../../constants/Colors";

const RegisterScreen = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handlerSubmit = () => {
    if (email === "" || password === "" || phone === "" || password == "") {
      setError("Please fill in your credentials");
    }

    let user = {
      name: name,
      email: email,
      passwordHash: password,
      password2: password2,
      phone: phone,
    };

    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          setTimeout(() => {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Registration succeeded",
              text2: "Please Login into your account",
            });
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (

    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
      style={{ flex: 1, backgroundColor: "white" }}
    >
          <LinearGradient
    // Background Linear Gradient
    colors={['white', Colors.activeFont]}
    locations={[0.2, 0.01]}
    style={{flex: 1, alignItems: 'center'}}
  >
      <View style={{ flex: 1, marginTop: 110 }}>

        <FormContainer title="Register">
          <Input
            placeholder="Email"
            name="email"
            id="email"
            onChangeText={(text) => setEmail(text.toLowerCase())}
          />
          <Input
            placeholder="Name"
            name="name"
            id="name"
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Phone"
            name="phone"
            id="phone"
            keyboardType="numeric"
            onChangeText={(number) => setPhone(number)}
          />
          <Input
            placeholder="Password"
            name="password"
            id="password"
            secureTextEntry={true}
            onChangeText={(passwd) => setPassword(passwd)}
          />
          <Input
            placeholder="Password2"
            name="password2"
            id="password2"
            secureTextEntry={true}
            onChangeText={(passwd) => setPassword2(passwd)}
          />
          {error ? <CustomError message={error} /> : null}
          <CartButton btnText="Register" actionToDo={() => handlerSubmit()} />
          <CartButton
            btnText="Back to login"
            actionToDo={() => props.navigation.navigate("Login")}
            style={{
              backgroundColor: "white",
              borderColor: Colors.activeFont,
              borderWidth: 1,
            }}
            colorText={{ color: Colors.activeFont }}
          />
        </FormContainer>
      </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
});

export default RegisterScreen;

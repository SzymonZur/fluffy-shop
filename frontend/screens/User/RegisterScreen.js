import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";
import CustomError from "../../components/UI/CustomError";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

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
    >
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
        <View style={styles.buttonGroup}>
          {error ? <CustomError message={error} /> : null}
          <Button title="Register" onPress={() => handlerSubmit()} />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            title="Back To login"
            onPress={() => props.navigation.navigate("Login")}
          />
        </View>
      </FormContainer>
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

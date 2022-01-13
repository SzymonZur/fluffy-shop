import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../.././components/Form/Input";
import CustomError from "../../components/UI/CustomError";
import CartButton from "../../components/UI/CartButton";
import Colors from "../../constants/Colors";

// Context
import AuthGlobal from "../../context/store/AuthGlobal";
import { loginUser } from "../../context/actions/Auth.actions";

const LoginScreen = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("Auth");
    }
  }, [context.stateUser.isAuthenticated]);

  const handlerSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 320, height: 140, marginTop: 120 }}
      />
      <FormContainer style={{marginTop: 15}}>
        <Input
          placeholder="Enter Email"
          name="email"
          id="email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder="Enter Password"
          name="password"
          id="password"
          onChangeText={(passwd) => setPassword(passwd)}
          secureTextEntry={true}
          value={password}
        />
          {error ? <CustomError message={error} /> : null}
          <CartButton btnText="Login" actionToDo={() => handlerSubmit()} style={{marginTop: 30}}/>
          <CartButton
            btnText="Register"
            actionToDo={() => props.navigation.navigate("Register")}
            style={{
              backgroundColor: "white",
              borderColor: Colors.activeFont,
              borderWidth: 1,
            }}
            colorText={{ color: Colors.activeFont }}
          />
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
});

export default LoginScreen;

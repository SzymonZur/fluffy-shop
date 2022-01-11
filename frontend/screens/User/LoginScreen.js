import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../.././components/Form/Input";
import CustomError from "../../components/UI/CustomError";

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
      loginUser(user, context.dispatch)
    }
  };

  return (
    <FormContainer title="Login">
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
      <View style={styles.buttonGroup}>
        {error ? <CustomError message={error} /> : null}
        <Button title="Login" onPress={() => handlerSubmit()} />
      </View>
      <View style={styles.buttonGroup}>
        <Button
          title="Register"
          onPress={() => props.navigation.navigate("Register")}
        />
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
});

export default LoginScreen;

import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartButton from "../../components/UI/CartButton";
import HeaderComponent from "../../components/UI/HeaderComponent";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../context/store/AuthGlobal";
import { logoutUser } from "../../context/actions/Auth.actions";
import FormContainer from "../../components/Form/FormContainer";
import Input from "../../components/Form/Input";

const UserProfileScreen = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [ordersModalVisible, setOrdersModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }

      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => setUserProfile(user.data));
        })
        .catch((error) => console.log(error));

      axios
        .get(`${baseURL}orders`)
        .then((x) => {
          const data = x.data;
          const userOrders = data.filter(
            (order) => order.user._id === context.stateUser.user.sub
          );
          setOrders(userOrders);
        })
        .catch((error) => console.log(error));

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated])
  );

  const changePasswordHandler = () => {
    const email = userProfile.email;
    axios
      .put(`${baseURL}users/changePassword`, {
        email,
        oldPassword,
        newPassword,
        newPassword2,
      })
      .then((x) => {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Password changed",
          text2: "You can log in with new password",
        });
        setPasswordModalVisible(false);
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please, try again",
        });
        setPasswordModalVisible(false);
      });
  };
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["white", Colors.activeFont]}
      locations={[0.75, 1.0]}
      style={styles.container}
    >
      <Modal
        animationType="slide"
        transparent={false}
        visible={profileModalVisible}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["white", Colors.activeFont]}
          locations={[0.75, 1.0]}
          style={styles.container}
        >
          <HeaderComponent sectionTitle="Your profile"></HeaderComponent>
          <View>
            <View style={{ ...styles.userHeaderSub, marginTop: 30 }}>
              <Text style={{ fontSize: 20, color: Colors.activeFont }}>
                Name: {userProfile ? userProfile.name : ""}
              </Text>
            </View>
            <View style={{ ...styles.userHeaderSub, marginTop: 20 }}>
              <Text style={{ fontSize: 20, color: Colors.activeFont }}>
                E-mail: {userProfile ? userProfile.email : ""}
              </Text>
            </View>
            <View style={{ ...styles.userHeaderSub, marginTop: 20 }}>
              <Text style={{ fontSize: 20, color: Colors.activeFont }}>
                Phone: {userProfile ? userProfile.phone : ""}
              </Text>
            </View>
            <TouchableOpacity
              style={{ ...styles.userHeader, marginTop: 40 }}
              onPress={() => setProfileModalVisible(false)}
            >
              <Text style={{ fontSize: 30, color: "white" }}>Back</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={passwordModalVisible}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["white", Colors.activeFont]}
          locations={[0.75, 1.0]}
          style={styles.container}
        >
          <HeaderComponent sectionTitle="Change password"></HeaderComponent>
          <View>
            <FormContainer style={{ marginTop: 0 }}>
              <Input
                placeholder="Enter your current password"
                name="oldPassword"
                id="oldPassword"
                secureTextEntry={true}
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
              />
              <Input
                placeholder="Enter your new password"
                name="newPassword"
                id="newPassword"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
              />
              <Input
                placeholder="Confirm your new password"
                name="newPassword2"
                id="newPassword2"
                secureTextEntry={true}
                value={newPassword2}
                onChangeText={(text) => setNewPassword2(text)}
              />
            </FormContainer>
            <TouchableOpacity
              style={{ ...styles.userHeader, marginTop: 40 }}
              onPress={changePasswordHandler}
            >
              <Text style={{ fontSize: 30, color: "white" }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={ordersModalVisible}
      >
        <HeaderComponent sectionTitle="Your orders"></HeaderComponent>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            {orders ? (
              orders.map((x) => {
                return (
                  <View
                    style={{
                      ...styles.itemContainer,
                      backgroundColor:
                        x.status === "ordered" ? "#C0E6FF" : "#c8f08f",
                      borderColor:
                        x.status === "ordered" ? "#C0E6FF" : "#c8f08f",
                    }}
                    key={x._id}
                  >
                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                      Order ID: {x._id}
                    </Text>
                    <Text>City: {x.city}</Text>
                    <Text>Street: {x.shippingAddress1}</Text>
                    <Text>Apartment number: {x.shippingAddress2}</Text>
                    <Text>Zip code: {x.zip}</Text>
                    <Text>Phone: {x.phone}</Text>
                    <Text>Total price: {x.totalPrice.toFixed(2)}$</Text>
                    <Text>Status: {x.status.toUpperCase()}</Text>
                  </View>
                );
              })
            ) : (
              <View>
                <Text>You have no orders</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={{ ...styles.userHeader, marginTop: 40, marginBottom: 50 }}
            onPress={() => setOrdersModalVisible(false)}
          >
            <Text style={{ fontSize: 30, color: "white" }}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
      <View style={styles.subContainer}>
        <View style={styles.userHeader}>
          <Text style={{ fontSize: 30, color: "white" }}>
            Hello {userProfile ? userProfile.name : ""}!
          </Text>
        </View>
        <TouchableOpacity
          style={{ ...styles.userHeaderSub, marginTop: 50 }}
          onPress={() => setProfileModalVisible(true)}
        >
          <Text style={{ fontSize: 20, color: Colors.activeFont }}>
            Your profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userHeaderSub}
          onPress={() => setPasswordModalVisible(true)}
        >
          <Text style={{ fontSize: 20, color: Colors.activeFont }}>
            Change password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userHeaderSub}
          onPress={() => setOrdersModalVisible(true)}
        >
          <Text style={{ fontSize: 20, color: Colors.activeFont }}>Orders</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <CartButton
            btnText="Sign out"
            actionToDo={() => [
              AsyncStorage.removeItem("jwt"),
              logoutUser(context.dispatch),
            ]}
            style={{ marginTop: 30 }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    marginTop: 60,
  },
  userHeader: {
    backgroundColor: Colors.activeFont,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  userHeaderSub: {
    backgroundColor: Colors.activeBg,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    marginVertical: 10,
  },
  itemContainer: {
    width: "80%",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    padding: 5,
  },
});

export default UserProfileScreen;

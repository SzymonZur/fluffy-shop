import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import CartScreen from "../screens/CartScreen";
import FavoritesProductsScreen from "../screens/FavoritesProductsScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductOverviewScreen from "../screens/ProductOverviewScreen";
import CheckoutScreen from "../screens/Checkout/CheckoutScreen";
import PaymentScreen from "../screens/Checkout/PaymentScreen";
import ConfirmScreen from "../screens/Checkout/ConfirmScreen";
import LoginScreen from "../screens/User/LoginScreen";
import RegisterScreen from "../screens/User/RegisterScreen";
import UserProfileScreen from "../screens/User/UserProfileScreen";
import CartIcon from "../components/UI/CartIcon";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const UserNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User Profile"
        component={UserProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ProductsNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductOverviewScreen} />
    </Stack.Navigator>
  );
};

const CartNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === "CartItems" ? false : true,
        headerStyle: { backgroundColor: Colors.activeFont },
        headerTintColor: "white",
      })}
    >
      <Stack.Screen name="CartItems" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutNavigator} />
    </Stack.Navigator>
  );
};

const CheckoutNavigator = (props) => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: Colors.activeFont },
      }}
    >
      <TopTab.Screen name="Shipping" component={CheckoutScreen} />
      <TopTab.Screen name="Payment" component={PaymentScreen} />
      <TopTab.Screen name="Confirm" component={ConfirmScreen} />
    </TopTab.Navigator>
  );
};

const ShopNavigator = (props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomeTab") {
              iconName = focused ? "home" : "home-outline";
            }
            if (route.name === "Cart") {
              return (
                <View>
                  <Ionicons
                    name={focused ? "cart" : "cart-outline"}
                    size={size}
                    color={color}
                  />
                  <CartIcon />
                </View>
              );
            }
            if (route.name === "Favorites") {
              iconName = focused ? "heart" : "heart-outline";
            }
            if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "silver",
          tabBarStyle: {
            backgroundColor: "black",
          },
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen name="HomeTab" component={ProductsNavigator} />
        <Tab.Screen name="Cart" component={CartNavigator} />
        <Tab.Screen name="Favorites" component={FavoritesProductsScreen} />
        <Tab.Screen name="Profile" component={UserNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;

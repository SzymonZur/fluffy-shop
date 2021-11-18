import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import CartScreen from "../screens/CartScreen";
import FavoritesProductsScreen from "../screens/FavoritesProductsScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileUserScreen from "../screens/ProfileUserScreen";

const Tab = createBottomTabNavigator();

const ShopNavigator = (props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            }
            if (route.name === "Cart") {
              iconName = focused ? "cart" : "cart-outline";
            }
            if (route.name === "Favorites") {
              iconName = focused ? "heart" : "heart-outline";
            }
            if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Favorites" component={FavoritesProductsScreen} />
        <Tab.Screen name="Profile" component={ProfileUserScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;

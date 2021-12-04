import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import CartScreen from "../screens/CartScreen";
import FavoritesProductsScreen from "../screens/FavoritesProductsScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileUserScreen from "../screens/ProfileUserScreen";
import ProductOverviewScreen from "../screens/ProductOverviewScreen";
import CartIcon from "../components/UI/CartIcon";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Favorites" component={FavoritesProductsScreen} />
        <Tab.Screen name="Profile" component={ProfileUserScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;

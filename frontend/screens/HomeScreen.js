import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import ProductsList from "../components/Products/ProductsList";

const data = require("../assets/data/products.json");

const HomeScreen = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);

    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <CustomHeaderButton nameButton="search-outline" actionToDo={() => {}} />
        <CustomHeaderButton
          nameButton="options-outline"
          actionToDo={() => {}}
        />
      </View>
      <View style={styles.screen}>
        <FlatList
        numColumns={2}
          data={products}
          renderItem={({ item }) => <ProductsList key={item.id} item={item} />}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 50,
    paddingRight: 15,
  },
});

export default HomeScreen;

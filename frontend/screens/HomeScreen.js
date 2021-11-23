import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import ProductsList from "../components/Products/ProductsList";
import CategoryFilter from "../components/Products/CategoryFilter";

const data = require("../assets/data/products.json");
const categoriesData = require("../assets/data/categories.json");

const HomeScreen = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prodcutsCategory, setProductsCategory] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setCategories(categoriesData);
    setProductsCategory(data);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setCategories([]);
      setActive();
      setInitialState();
    };
  }, []);

  const changeCategory = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCategory(initialState), setActive(true)]
        : [
            setProductsCategory(
              products.filter((arg) => arg.category.$oid === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.screen}>
        <View style={styles.headerContainer}>
          <CustomHeaderButton
            nameButton="search-outline"
            actionToDo={() => {}}
          />
          <CustomHeaderButton
            nameButton="options-outline"
            actionToDo={() => {}}
          />
        </View>
        <View>
          <CategoryFilter
            categories={categories}
            categoriesFilter={changeCategory}
            productsCtg={prodcutsCategory}
            active={active}
            setActive={setActive}
          />
        </View>
        {prodcutsCategory.length > 0 ? (
          <View style={styles.listContainer}>
            {/* <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => <ProductsList key={item.id} item={item} />}
          keyExtractor={(item) => item.name}
        /> */}
            {prodcutsCategory.map((item) => {
              return <ProductsList key={item._id.$oid} item={item} />;
            })}
          </View>
        ) : (
          <View
            style={[
              styles.screen,
              { justifyContent: "center", alignItems: "center", height: 300},
            ]}
          >
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>No products found</Text>
          </View>
        )}
      </View>
    </ScrollView>
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
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default HomeScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";

import baseURL from '../assets/common/baseUrl';
import axios from 'axios';

import CustomHeaderButton from "../components/UI/CustomHeaderButton";
import ProductsList from "../components/Products/ProductsList";
import CategoryFilter from "../components/Products/CategoryFilter";
import HeaderComponenet from "../components/UI/HeaderComponent";
import Colors from "../constants/Colors";

const HomeScreen = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prodcutsCategory, setProductsCategory] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setActive(-1);

    axios
      .get(`${baseURL}products`)
      .then((res) => {
        setProducts(res.data);
        setProductsCategory(res.data);
        setInitialState(res.data);
      })
      .catch((err) => {
        console.log(err)
      })

    axios
      .get(`${baseURL}categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err)
      })

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
              products.filter((arg) => arg.category === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.screen}>
        <HeaderComponenet style={styles.headerContainer} sectionTitle='Home'>
          <View style={{flexDirection: 'row'}}>
          <CustomHeaderButton
            nameButton="search-outline"
            actionToDo={() => {}}
          />
          <CustomHeaderButton
            nameButton="options-outline"
            actionToDo={() => {}}
          />
          </View>
        </HeaderComponenet>
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
            {prodcutsCategory.map((item) => {
              return (
                <ProductsList
                  key={item._id}
                  item={item}
                  navigation={props.navigation}
                />
              );
            })}
          </View>
        ) : (
          <View
            style={[
              styles.screen,
              { justifyContent: "center", alignItems: "center", height: 300, marginTop: 100 },
            ]}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: Colors.inactiveFont }}>
              No products found
            </Text>
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
    justifyContent: "space-between",
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default HomeScreen;

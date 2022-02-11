import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import baseURL from "../assets/common/baseUrl";
import axios from "axios";

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
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setActive(-1);

      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsCategory(res.data);
          setInitialState(res.data);
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      return () => {
        setProducts([]);
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

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
    <>
    {loading == false ? (
          <ScrollView style={{ backgroundColor: "white" }}>
          <View style={styles.screen}>
            <HeaderComponenet style={styles.headerContainer} sectionTitle="Home">
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
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    height: 300,
                    marginTop: 100,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: Colors.inactiveFont,
                  }}
                >
                  No products found
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
    ) : (
      <View style={[styles.screen, { backgroundColor: '#f2f2f2', justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size='large' color={Colors.activeFont} />
      </View>
    )}
    </>
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

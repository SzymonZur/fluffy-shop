import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ProductsList from "../components/Products/ProductsList";
import HeaderComponenet from "../components/UI/HeaderComponent";
import Colors from "../constants/Colors";

import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import AuthGlobal from "../context/store/AuthGlobal";

const FavoritesProductsScreen = (props) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(AuthGlobal);

  useFocusEffect(
    useCallback(() => {
      axios
        .get(
          `${baseURL}FavoriteProducts/get/favlist/${context.stateUser.user.userId}`
        )
        .then((res) => {
          setFavoriteProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

      return () => {
        setFavoriteProducts([]);
      };
    }, [])
  );

  return (
    <>
      {loading == false ? (
        <ScrollView style={{ backgroundColor: "white" }}>
          <View style={styles.screen}>
            <HeaderComponenet
              style={styles.headerContainer}
              sectionTitle="Favorites"
            />
            {favoriteProducts.length > 0 ? (
              <View style={styles.listContainer}>
                {favoriteProducts.map((item) => {
                  return (
                    <ProductsList
                      key={item.product._id}
                      item={item.product}
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
                  No favorite products found
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <View
          style={[
            styles.screen,
            {
              backgroundColor: "#f2f2f2",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <ActivityIndicator size="large" color={Colors.activeFont} />
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

export default FavoritesProductsScreen;

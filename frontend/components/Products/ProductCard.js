import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;
  const [favStatus, setFavStatus] = useState(false);

  return (
    <View style={styles.cardContainer}>
      {/* <Image style={styles.image} resizeMode='contain' source={{uri: image ? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}} />
      <View style={styles.card} />
      <Text style={styles.titile}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <Button title="Add" color="green" />
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
      )} */}
      <View style={{ width: "100%", height: "100%" }}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: image
              ? image
              : "https://images.unsplash.com/photo-1465198901163-2d15b88fecea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          }}
        />
        <TouchableOpacity
          onPress={() => setFavStatus((status) => !status)}
          style={styles.iconFavorite}
        >
          <Ionicons
            name={favStatus ? "heart" : "heart-outline"}
            size={25}
            color="rgba(255, 128, 0, 1.0)"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text>
          {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
        </Text>
        <Text style={{ fontWeight: "bold" }}>${price.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width / 2 - 20,
    height: width / 1.7,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    paddingHorizontal: 3,
  },
  iconFavorite: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 20 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});

export default ProductCard;

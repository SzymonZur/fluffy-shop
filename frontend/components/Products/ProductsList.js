import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";
import ProductCard from "./ProductCard";

var { width } = Dimensions.get("window");

const ProductsList = (props) => {
const {item} = props;
  return (
      <View style={{ width: width / 2, backgroundColor: "white", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => props.navigation.navigate({name: 'Product', params: { item: item}})}>
          <ProductCard {...item}/>
        </TouchableOpacity>
      </View>
  );
};

export default ProductsList;

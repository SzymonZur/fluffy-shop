import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";

import Colors from "../../constants/Colors";

const SizeComponent = (props) => {
  return (
    <View style={styles.sizes}>
      {props.size.map((item) => (
        <TouchableOpacity
          key={props.size.indexOf(item)}
          onPress={() => {
            props.setActive(props.size.indexOf(item));
          }}
          style={{
            ...styles.borderSize,
            ...(props.active == props.size.indexOf(item)
              ? styles.bgActive
              : ""),
          }}
        >
          <Text
            style={
              props.active == props.size.indexOf(item)
                ? styles.fontActive
                : styles.fontInactive
            }
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  borderSize: {
    borderColor: "rgba(217, 217, 217, 1)",
    borderRadius: 15,
    borderWidth: 1,
    padding: 15,
    marginRight: 10,
  },
  sizes: {
    flexDirection: "row",
    marginTop: 15,
  },
  fontActive: {
    color: Colors.activeFont,
    fontWeight: "bold",
  },
  fontInactive: {
    color: Colors.inactiveFont,
    fontWeight: "bold",
  },
  bgActive: {
    backgroundColor: Colors.activeBg,
    borderColor: "white",
  },
});

export default SizeComponent;

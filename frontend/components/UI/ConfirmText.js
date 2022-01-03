import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import Colors from "../../constants/Colors";

const ConfirmText = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ color: Colors.inactiveFont, fontWeight: "bold" }}>
        {props.title}
      </Text>
      <Text style={{ color: Colors.inactiveFont }}> {props.data}</Text>
    </View>
  );
};

export default ConfirmText;

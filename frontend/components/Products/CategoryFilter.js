import React from "react";
import { TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { ListItem, Badge, Text } from "native-base";

import Colors from "../../constants/Colors";

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      // showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: "white" }}
    >
      <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoriesFilter("all"), props.setActive(-1);
          }}
        >
          <Badge
            style={
              [styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive]
            }
          >
            <Text style={props.active == -1 ? styles.activeFont : styles.inactiveFont}>All</Text>
          </Badge>
        </TouchableOpacity>
        {props.categories.map((item) => (
          <TouchableOpacity
            key={item._id.$oid}
            onPress={() => {
              props.categoriesFilter(item._id.$oid),
                props.setActive(props.categories.indexOf(item));
            }}
          >
            <Badge
              style={[
                styles.center,
                { margin: 5 },
                props.active == props.categories.indexOf(item)
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <Text style={props.active == props.categories.indexOf(item) ? styles.activeFont : styles.inactiveFont}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        ))}
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
  },
  active: {
    backgroundColor: Colors.activeBg,
  },
  inactive: {
    backgroundColor: Colors.inactiveBg,
  },
  activeFont:{
    color: Colors.activeFont,
    fontSize: 16
  },
  inactiveFont: {
    color: Colors.inactiveFont,
    fontSize: 16
  }
});

export default CategoryFilter;

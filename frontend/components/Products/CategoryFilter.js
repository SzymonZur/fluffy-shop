import React from "react";
import { TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { ListItem, Badge, Text } from "native-base";

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
    backgroundColor: "rgba(237, 173, 109, 0.2)",
  },
  inactive: {
    backgroundColor: "rgba(125, 125, 125, 0.1)",
  },
  activeFont:{
    color: "rgba(255, 128, 0, 1.0)",
    fontSize: 16
  },
  inactiveFont: {
    color: "rgba(125, 125, 125, 0.9)",
    fontSize: 16
  }
});

export default CategoryFilter;

import React from "react";
import { ScrollView, Text, Dimensions, StyleSheet } from "react-native";

var { width } = Dimensions.get('window');

const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle={{...styles.container, ...props.style}}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30
    }
})

export default FormContainer;
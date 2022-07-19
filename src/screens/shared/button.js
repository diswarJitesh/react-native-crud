import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default ({ title, pressHandler, color, backgroundColor }) => {
    return (
        <TouchableOpacity style={{ color, backgroundColor, ...styles.appButtonContainer }} onPress={pressHandler}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        height: 50,
        marginTop: 10
    },
    appButtonText: {
        paddingTop: 2,
        fontSize: 20,
        color: "#FFF",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});
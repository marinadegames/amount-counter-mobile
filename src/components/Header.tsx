import {StyleSheet, Text, View} from "react-native";

export const Header = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>Money counter</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 40,
    },
    text: {
        textAlign: 'left',
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 30
    }
})

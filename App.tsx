import { StyleSheet, View } from "react-native"
import { Provider } from "react-redux"

import { store } from "./src/bll/store"
import { Main } from "./src/components/Main"

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Main />
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})

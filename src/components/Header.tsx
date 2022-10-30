import { StyleSheet, Text, View } from "react-native"

import { addNewCounter, getStoreThunk } from "../bll/countersSlice"
import { useAppDispatch } from "../bll/store"
import { MyButton } from "./MyButton"

export const Header = () => {
    const dispatch = useAppDispatch()

    const addCounterHandler = () => {
        dispatch(addNewCounter())
    }

    const getStoreHandler = () => {
        dispatch(getStoreThunk())
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>Money counter</Text>
            <MyButton
                title={"+"}
                widthProps={40}
                heightProps={40}
                fontSizeProps={23}
                callback={addCounterHandler}
            />
            <MyButton title={"getStore"} callback={getStoreHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    text: {
        textAlign: "left",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 25,
    },
})

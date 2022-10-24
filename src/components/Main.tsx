import { StyleSheet, Text, TextInput, View } from "react-native"
import { MyButton } from "./MyButton"
import { useCallback, useState } from "react"
import { Header } from "./Header"

export const Main = () => {

    const [complete, setComplete] = useState<boolean>(false)
    const [count, setCount] = useState<number>(0)

    const decrement = useCallback(() => {
        setCount(count - 1)
    }, [count])

    const increment = useCallback(() => {
        setCount(count + 1)
    }, [count])

    const styles = StyleSheet.create({
        wrapper: {
            paddingTop: 40,
            paddingHorizontal: 20,
            width: "100%",
            borderStyle: "solid",
            borderWidth: 1,
            flex: 1,
            backgroundColor: "#fff",
        },
        counterWrapper: {
            padding: 10,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 10,
            minWidth: "100%",
            backgroundColor: complete ? "#90ee90" : "white",
        },
        textTarget: {
            fontSize: 22,
            fontWeight: "bold",
            textTransform: "uppercase",
        },
        counterBox: {
            marginTop: 10,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
        },
        number: {
            fontSize: 20,
            marginLeft: 20,
            marginRight: 20,
            fontWeight: "bold",
        },
        targetInputMoney: {
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
        },
        textTargetMoney: {
            marginRight: 10,
            fontSize: 18,
            fontWeight: "bold",
        },
        textTargetMoneyInput: {
            fontSize: 18,
        },
        leftWrapper: {
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
        },
    })

    return (
        <View style={styles.wrapper}>

            <Header />

            <View style={styles.counterWrapper}>
                <TextInput
                    style={styles.textTarget}
                    selectTextOnFocus={false}
                    onChangeText={() => {
                    }}
                    placeholder={"Enter your target"}
                />
                <View style={styles.counterBox}>
                    <MyButton title={"-"} callback={decrement} />
                    <Text style={styles.number}>{count} BYN</Text>
                    <MyButton title={"+"} callback={increment} />
                </View>

                {/*<View style={styles.targetInputMoney}>*/}
                {/*    <Text style={styles.textTargetMoney}>TARGET:</Text>*/}
                {/*    <TextInput*/}
                {/*        keyboardType="numeric"*/}
                {/*        style={styles.textTargetMoneyInput}*/}
                {/*        selectTextOnFocus={false}*/}
                {/*        maxLength={10000}*/}
                {/*        value={maxTarget ? String(maxTarget) : ""}*/}
                {/*        onChangeText={(e) => changeMaxTarget(e)}*/}
                {/*        placeholder={"Money target"}*/}
                {/*    />*/}
                {/*</View>*/}

                {/*<View style={styles.leftWrapper}>*/}
                {/*    <Text style={styles.textTargetMoney}>LEFT:</Text>*/}
                {/*    {complete*/}
                {/*        ? <Text style={styles.textTargetMoneyInput}>COMPLETED!</Text>*/}
                {/*        : <Text style={styles.textTargetMoneyInput}>{maxTarget - count && String(maxTarget - count)}</Text>*/}
                {/*    }*/}
                {/*</View>*/}

                {/*<View style={styles.leftWrapper}>*/}
                {/*    <Text style={styles.textTargetMoney}>LEFT, %:</Text>*/}
                {/*    {complete*/}
                {/*        ? <Text style={styles.textTargetMoneyInput}>COMPLETED!</Text>*/}
                {/*        : <Text style={styles.textTargetMoneyInput}>{maxTarget - count && String(maxTarget - count)}</Text>*/}
                {/*    }*/}
                {/*</View>*/}
            </View>
        </View>
    )
}

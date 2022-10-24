import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native"
import { MyButton } from "./MyButton"
import { useCallback, useEffect, useState } from "react"
import { Header } from "./Header"
import Storage from "react-native-storage"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const Main = () => {

    const storage = new Storage({
        size: 1000,
        storageBackend: AsyncStorage,
        defaultExpires: 1000 * 3600 * 24,
        enableCache: true,
        sync: {},
    })

    // state
    const [count, setCount] = useState<number>(0)
    const [titleTarget, setTitleTarget] = useState<string>("")
    const [targetNumber, setTargetNumber] = useState<number>(10)
    const [completed, setCompleted] = useState<boolean>(false)

    // callbacks
    const decrement = useCallback(() => {
        if (count >= 1) {
            setCount(count - 1)
            setCompleted(false)
        }
    }, [count])

    const increment = useCallback(() => {
        if (count < targetNumber) {
            setCount(count + 1)
        }
    }, [count])

    const changeTitleTarget = useCallback((value: string) => {
        setTitleTarget(value)
    }, [titleTarget])

    const countPercent = () => {
        return Math.round((count * 100) / targetNumber * 100) / 100
    }

    useEffect(() => {
        if (targetNumber - count <= 0) {
            setCompleted(true)
        } else {
            setCompleted(false)
        }
    }, [count, targetNumber])

    useEffect(() => {
        storage.save({
            key: "myLogin",
            data: {
                titleTarget: titleTarget,
                count: count,
                targetNumber: targetNumber,
            },
            expires: 1000 * 3600,
        })

        storage
            .load({
                key: "myLogin",
                autoSync: true,
                syncInBackground: true,
                syncParams: {
                    extraFetchOptions: {},
                    someFlag: true,
                },
            })
            .then(ret => {
                console.log(ret)
                setTargetNumber(ret.targetNumber)
                setCount(ret.count)
                setTitleTarget(ret.titleTarget)
            })
            .catch(err => {
                console.warn(err.message)
                switch (err.name) {
                    case "NotFoundError":
                        break
                    case "ExpiredError":
                        break
                }
            })

    })

    // styles
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
            borderColor: completed ? "#29ab5d" : "gray",
            borderRadius: 10,
            minWidth: "100%",
            backgroundColor: completed ? "#29ab5d" : "white",
        },
        textTarget: {
            color: completed ? "white" : "black",
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
            color: completed ? "white" : "black",
            fontSize: 20,
            marginLeft: 20,
            marginRight: 20,
            fontWeight: "bold",
        },
        targetInputMoney: {
            color: completed ? "white" : "black",
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
        },
        textTargetMoney: {
            color: completed ? "white" : "black",
            marginRight: 10,
            fontSize: 18,
            fontWeight: "bold",
        },
        textTargetMoneyInput: {
            color: completed ? "white" : "black",
            width: 180,
            fontSize: 18,
        },
        leftWrapper: {
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
        },
        loading: {
            marginTop: 10,
            borderWidth: 1,
            borderColor: "#29ab5d",
            borderStyle: "solid",
            borderRadius: 10,
            width: "100%",
            height: 10,
        },
        lineLoading: {
            backgroundColor: "#29ab5d",
            height: "100%",
            width: `${countPercent()}%`,
        },
    })

    // jsx
    return (
        <View style={styles.wrapper}>

            <Header />

            <View style={styles.counterWrapper}>
                <TextInput
                    editable={true}
                    onBlur={() => Keyboard.dismiss()}
                    style={styles.textTarget}
                    onChangeText={changeTitleTarget}
                    defaultValue={titleTarget}
                    placeholder={"Enter your target"}
                />
                <View style={styles.counterBox}>
                    <MyButton title={"-"} callback={decrement} completed={completed} />
                    <Text style={styles.number}>{count} BYN</Text>
                    <MyButton title={"+"} callback={increment} completed={completed} />
                </View>

                <View style={styles.targetInputMoney}>
                    <Text style={styles.textTargetMoney}>TARGET:</Text>
                    <TextInput style={styles.textTargetMoneyInput}
                               textContentType={"creditCardNumber"}
                               editable={true}
                               keyboardType={"number-pad"}
                               value={String(targetNumber)}
                               onChangeText={e => setTargetNumber(Number(e))} />
                </View>

                <View style={styles.leftWrapper}>
                    <Text style={styles.textTargetMoney}>LEFT:</Text>
                    {completed
                        ? <Text style={styles.textTargetMoneyInput}>COMPLETED!</Text>
                        : <Text style={styles.textTargetMoneyInput}>{targetNumber - count}</Text>
                    }
                </View>

                <View style={styles.leftWrapper}>
                    <Text style={styles.textTargetMoney}>LEFT, %:</Text>
                    <Text style={styles.textTargetMoneyInput}>{countPercent()}</Text>
                </View>

                <View style={styles.loading}>
                    <View style={styles.lineLoading} />
                </View>
            </View>
        </View>
    )
}

import { memo, useCallback } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

import {
    changeCompleteThunk,
    changeTargetNumberThunk,
    changeTargetTitleThunk,
    decrementThunk,
    deleteCounterThunk,
    incrementThunk,
} from "../bll/countersSlice"
import { useAppDispatch } from "../bll/store"
import { MyButton } from "./MyButton"

type PropsType = {
    id: string
    count: number
    targetNumber: number
    completed: boolean
    titleTarget: string
}

export const Counter = memo(({ id, count, completed, targetNumber, titleTarget }: PropsType) => {
    const dispatch = useAppDispatch()

    const countPercent = () => {
        const result = Math.round(((count * 100) / targetNumber) * 100) / 100
        if (isNaN(result)) {
            return 0
        } else return result
    }

    const decrementHandler = () => {
        if (count > 0) {
            dispatch(decrementThunk(id))
            const payload = {
                id: id,
                value: false,
            }
            dispatch(changeCompleteThunk(payload))
        }
    }

    const incrementHandler = () => {
        if (count < targetNumber) {
            dispatch(incrementThunk(id))
            if (count === targetNumber - 1) {
                const payload = {
                    id: id,
                    value: true,
                }
                dispatch(changeCompleteThunk(payload))
            }
        }
    }

    const editTargetTitleHandler = useCallback(
        (e: string) => {
            const payload = {
                id: id,
                value: e,
            }
            dispatch(changeTargetTitleThunk(payload))
        },
        [id]
    )

    const changeTargetNumberHandler = (e: number) => {
        if (e <= 0) {
            dispatch(changeTargetNumberThunk({ id, value: 0 }))
        }
        dispatch(changeTargetNumberThunk({ id, value: e }))
    }

    const deleteCounterHandler = () => {
        dispatch(deleteCounterThunk(id))
    }

    // styles
    const styles = StyleSheet.create({
        counterWrapper: {
            padding: 10,
            marginBottom: 20,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: completed ? "#29ab5d" : "gray",
            borderRadius: 10,
            minWidth: "100%",
            backgroundColor: completed ? "#29ab5d" : "white",
        },
        headerWrapper: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
        },
        textTarget: {
            color: completed ? "white" : "black",
            fontSize: 22,
            fontWeight: "bold",
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
        <View style={styles.counterWrapper}>
            <View style={styles.headerWrapper}>
                <TextInput
                    value={titleTarget}
                    enablesReturnKeyAutomatically={true}
                    style={styles.textTarget}
                    onChangeText={editTargetTitleHandler}
                    placeholder={"Enter your target"}
                />
                <MyButton
                    callback={deleteCounterHandler}
                    title={"X"}
                    widthProps={40}
                    heightProps={40}
                    fontSizeProps={20}
                    borderEnabled={false}
                />
            </View>

            <View style={styles.counterBox}>
                <MyButton title={"-"} callback={decrementHandler} completed={completed} />
                <Text style={styles.number}>{count} BYN</Text>
                <MyButton title={"+"} callback={incrementHandler} completed={completed} />
            </View>

            <View style={styles.targetInputMoney}>
                <Text style={styles.textTargetMoney}>TARGET:</Text>
                <TextInput
                    enablesReturnKeyAutomatically={true}
                    style={styles.textTargetMoneyInput}
                    textContentType={"creditCardNumber"}
                    onChangeText={(e) => changeTargetNumberHandler(Number(e))}
                    keyboardType={"number-pad"}
                    value={String(targetNumber)}
                />
            </View>

            <View style={styles.leftWrapper}>
                <Text style={styles.textTargetMoney}>LEFT:</Text>
                {completed ? (
                    <Text style={styles.textTargetMoneyInput}>COMPLETED!</Text>
                ) : (
                    <Text style={styles.textTargetMoneyInput}>
                        {targetNumber - count} ({countPercent()}%)
                    </Text>
                )}
            </View>

            <View style={styles.loading}>
                <View style={styles.lineLoading} />
            </View>
        </View>
    )
})

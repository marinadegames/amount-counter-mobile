import { useEffect } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native"

import type { CountersSliceType } from "../bll/allTypes"
import { fetchCountersThunk } from "../bll/countersSlice"
import { useAppDispatch, useAppSelector } from "../bll/store"
import { Counter } from "./Counter"
import { Header } from "./Header"

export const Main = () => {
    const counters = useAppSelector<CountersSliceType>((state) => state.counters)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCountersThunk())
    }, [])

    // jsx
    return (
        <View style={styles.wrapper}>
            <Header />
            <ScrollView style={styles.scrollWrapper} showsVerticalScrollIndicator={false}>
                {counters.map((counter) => (
                    <KeyboardAvoidingView key={counter.id} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <Counter
                            id={counter.id}
                            titleTarget={counter.titleTarget}
                            count={counter.count}
                            targetNumber={counter.targetNumber}
                            completed={counter.completed}
                        />
                    </KeyboardAvoidingView>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 35,
        paddingBottom: 5,
        paddingHorizontal: 20,
        flex: 1,
        width: "100%",
        borderStyle: "solid",
    },
    scrollWrapper: {
        paddingTop: 20,
    },
})

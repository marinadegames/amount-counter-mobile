import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native"

import { CountersSliceType } from "../bll/countersSlice"
import { useAppSelector } from "../bll/store"
import { Counter } from "./Counter"
import { Header } from "./Header"

export const Main = () => {
    const counters = useAppSelector<CountersSliceType>((state) => state.counters)

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

    // jsx
    return (
        <View style={styles.wrapper}>
            <Header />
            <ScrollView style={styles.scrollWrapper} showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    {counters.map((counter) => (
                        <Counter
                            id={counter.id}
                            key={counter.id}
                            titleTarget={counter.titleTarget}
                            count={counter.count}
                            targetNumber={counter.targetNumber}
                            completed={counter.completed}
                        />
                    ))}
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

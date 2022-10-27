import { StyleSheet, View } from "react-native"

import { CountersSliceType } from "../bll/countersSlice"
import { useAppSelector } from "../bll/store"
import { Counter } from "./Counter"
import { Header } from "./Header"

export const Main = () => {
    const counters = useAppSelector<CountersSliceType>((state) => state.counters)

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
    })

    // jsx
    return (
        <View style={styles.wrapper}>
            <Header />
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
        </View>
    )
}

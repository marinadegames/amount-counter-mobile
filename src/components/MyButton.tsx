import { Pressable, StyleSheet, Text } from "react-native"
import React, { useState } from "react"

type PropsType = {
    title: string
    color?: string
    style?: string
    callback?: () => void
    completed?: boolean
}

export const MyButton = React.memo(({ title, callback, completed }: PropsType) => {
    const [press, setPress] = useState<boolean>(false)

    const onPress = () => {
        callback && callback()
        setPress(true)
    }

    const offPress = () => {
        setPress(false)
    }

    const styles = StyleSheet.create({
        button: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderStyle: "solid",
            width: 60,
            height: 60,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: completed ? "white" : "black",
        },
        buttonPressed: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderStyle: "solid",
            borderRadius: 10,
            width: 60,
            height: 60,
            borderWidth: 2,
            borderColor: completed ? "white" : "black",
            backgroundColor: "black",
        },
        title: {
            fontSize: 30,
            fontWeight: "bold",
            color: completed ? "white" : "black",
        },
        titlePressed: {
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
        },
    })

    return (
        <Pressable
            style={press ? styles.buttonPressed : styles.button}
            disabled={completed}
            onTouchStart={onPress}
            onTouchEnd={offPress}>
            <Text style={press ? styles.titlePressed : styles.title}>{title}</Text>
        </Pressable>
    )
})

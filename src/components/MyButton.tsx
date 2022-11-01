import React, { memo, useState } from "react"
import { Pressable, StyleSheet, Text } from "react-native"

type PropsType = {
    title: string
    color?: string
    callback?: () => void
    completed?: boolean

    // CSS Properties
    widthProps?: number
    heightProps?: number
    fontSizeProps?: number
    borderEnabled?: boolean
}

export const MyButton = memo(({ title, callback, completed, widthProps, heightProps, fontSizeProps }: PropsType) => {
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
            width: widthProps ? widthProps : 60,
            height: heightProps ? heightProps : 60,
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
            width: widthProps ? widthProps : 60,
            height: heightProps ? heightProps : 60,
            borderWidth: 2,
            borderColor: completed ? "white" : "black",
            backgroundColor: "black",
        },
        title: {
            fontSize: fontSizeProps ? fontSizeProps : 30,
            fontWeight: "bold",
            color: completed ? "white" : "black",
        },
        titlePressed: {
            fontSize: fontSizeProps ? fontSizeProps : 30,
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

MyButton.displayName = "MyButton"
